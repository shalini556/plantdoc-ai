# 🌿 PlantDoc AI — React 19 + Vite + Google Gemini (FREE)

## 📁 Project Structure

```
plantdoc-react/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx / App.module.css
    ├── styles/global.css
    ├── hooks/
    │   └── usePlantDoctor.js  ← Gemini API here
    └── components/
        ├── Header.jsx
        ├── UploadZone.jsx
        ├── DiagnosisResult.jsx
        ├── Journal.jsx
        ├── CareTips.jsx
        └── Toast.jsx
```

---

## 🔑 Step 1 — Free Gemini API Key Lena

1. Jao → https://aistudio.google.com/
2. Google account se login karo (Gmail)
3. "Get API Key" → "Create API Key" click karo
4. Key copy karo (AIzaSy... jaisi dikhegi)

---

## ⚙️ Step 2 — API Key Paste Karo

`src/hooks/usePlantDoctor.js` file kholo, line 10:

```js
const API_KEY = 'AIzaSyXXXXXXXXXXXXXXXXXXX'  // ← yahan paste karo
```

---

## 🚀 Step 3 — Run Karo

```bash
# Dependencies install karo
npm install

# Dev server start karo
npm run dev
```

App khulegi → http://localhost:3000 ✅

---

## 🆓 Gemini Free Tier

| Feature        | Limit             |
|----------------|-------------------|
| Requests       | 1,500 / day FREE  |
| Speed          | 15 req / minute   |
| Cost           | ₹0 — Bilkul Free  |
| Image Support  | ✅ Yes             |

---

## ✅ Features

- 📸 Photo upload (click / drag & drop)
- 🌿 Plant identification + scientific name
- ❤️ Health status (Healthy / Warning / Danger)
- 🦠 Disease detection + severity meter
- 🌿 Home remedies & 🧪 Chemical treatments
- 💧 6-point care guide
- 📋 Step-by-step treatment plan
- 💬 AI Expert chat
- 📔 My Plants Journal (localStorage)
- 🗂️ Seasonal Care Tips
- 📱 Mobile responsive

---

## ❓ Troubleshooting

**"API_KEY_INVALID"** → Check karo key sahi paste ki hai

**"CORS error"** → `npm run dev` use karo, direct file open mat karo

**Port busy** → `vite.config.js` mein port change karo: `port: 3001`
