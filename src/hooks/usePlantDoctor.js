// ============================================
//  usePlantDoctor — Custom React 19 Hook
//  Powered by Google Gemini API (FREE)
// ============================================

import { useState, useCallback } from "react";

// ✅ FREE API Key — Get from https://aistudio.google.com/
// Click "Get API Key" → "Create API Key" → Paste here
const API_KEY = "AIzaSyBARCsqCt7A4RS2PJ-WnsB-hklXNmSPyM8";

const MODEL = "gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const LOADING_MSGS = [
  "Identifying your plant species...",
  "Scanning for diseases and deficiencies...",
  "Analyzing leaf patterns and color...",
  "Preparing treatment recommendations...",
  "Finalizing diagnosis...",
];

const DIAGNOSIS_PROMPT = `You are an expert botanist and plant doctor. Analyze this plant image and respond ONLY with a valid JSON object (no markdown, no backticks, no extra text).

Return exactly this structure:
{
  "plantName": "Common plant name",
  "scientificName": "Scientific name",
  "healthStatus": "healthy" or "warning" or "danger",
  "healthLabel": "Short health label",
  "severity": 0 to 100,
  "diseases": [
    { "name": "Issue name", "description": "Brief description", "level": "none" or "mild" or "severe" }
  ],
  "careInstructions": {
    "water": "Watering info",
    "sunlight": "Sunlight needs",
    "soil": "Soil type",
    "temperature": "Temperature range",
    "humidity": "Humidity needs",
    "fertilizer": "Fertilizing schedule"
  },
  "homeRemedies": ["remedy1", "remedy2", "remedy3"],
  "chemicalTreatments": ["treatment1", "treatment2", "treatment3"],
  "treatmentSteps": ["step1", "step2", "step3", "step4", "step5"]
}`;

export function usePlantDoctor() {
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MSGS[0]);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (base64Image) => {
    setLoading(true);
    setError(null);
    setDiagnosis(null);

    let idx = 0;
    const interval = setInterval(() => {
      setLoadingMsg(LOADING_MSGS[Math.min(++idx, LOADING_MSGS.length - 1)]);
    }, 1800);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Image,
                  },
                },
                { text: DIAGNOSIS_PROMPT },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `API Error ${res.status}`);
      }

      const data = await res.json();
      let raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      raw = raw.replace(/```json|```/g, "").trim();
      const result = JSON.parse(raw);
      setDiagnosis(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      clearInterval(interval);
      setLoading(false);
      setLoadingMsg(LOADING_MSGS[0]);
    }
  }, []);

  return { diagnosis, loading, loadingMsg, error, analyze };
}

// ── AI Expert Chat ───────────────────────────
export async function askExpert(question, context) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [
          {
            text: `You are a friendly plant doctor expert. Context: ${context}. Give short, practical answers in max 3 sentences.`,
          },
        ],
      },
      contents: [
        {
          parts: [{ text: question }],
        },
      ],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 300,
      },
    }),
  });
  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, I could not answer that."
  );
}
