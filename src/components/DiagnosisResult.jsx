import { useState, useEffect, useRef } from 'react'
import { askExpert } from '../hooks/usePlantDoctor'
import styles from './DiagnosisResult.module.css'

// ── Identification Card ──────────────────────
function IdentCard({ data }) {
  const statusMap = {
    healthy: { cls: styles.healthy, icon: 'ti-circle-check' },
    warning: { cls: styles.warning, icon: 'ti-alert-triangle' },
    danger:  { cls: styles.danger,  icon: 'ti-circle-x' },
  }
  const s = statusMap[data.healthStatus] || statusMap.healthy

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <i className="ti ti-plant-2" style={{ color: 'var(--green-600)', fontSize: 20 }} aria-hidden="true" />
        <span className={styles.cardTitle}>Plant Identification</span>
      </div>
      <div className={styles.plantName}>{data.plantName}</div>
      <div className={styles.plantSci}>{data.scientificName}</div>
      <div className={`${styles.healthBadge} ${s.cls}`}>
        <i className={`ti ${s.icon}`} aria-hidden="true" />
        {data.healthLabel}
      </div>
      {data.severity > 0 && (
        <div className={styles.severityWrap}>
          <div className={styles.severityLabel}>
            <span>Disease Severity</span><span>{data.severity}%</span>
          </div>
          <div className={styles.track}>
            <SeverityBar pct={data.severity} />
          </div>
        </div>
      )}
    </div>
  )
}

function SeverityBar({ pct }) {
  const [width, setWidth] = useState(0)
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 100); return () => clearTimeout(t) }, [pct])
  const cls = pct < 30 ? styles.sevLow : pct < 65 ? styles.sevMed : styles.sevHigh
  return <div className={`${styles.fill} ${cls}`} style={{ width: `${width}%` }} />
}

// ── Diagnosis Card ───────────────────────────
function DiseaseCard({ diseases }) {
  const dotColor = (lvl) => lvl === 'none' ? styles.dotGreen : lvl === 'mild' ? styles.dotAmber : styles.dotRed
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <i className="ti ti-virus" style={{ color: '#E24B4A', fontSize: 20 }} aria-hidden="true" />
        <span className={styles.cardTitle}>Diagnosis</span>
      </div>
      <ul className={styles.diseaseList}>
        {diseases?.length ? diseases.map((d, i) => (
          <li key={i} className={styles.diseaseItem}>
            <div className={`${styles.dot} ${dotColor(d.level)}`} />
            <div>
              <div className={styles.diseaseName}>{d.name}</div>
              <div className={styles.diseaseDesc}>{d.description}</div>
            </div>
          </li>
        )) : (
          <li className={styles.diseaseItem}>
            <div className={`${styles.dot} ${styles.dotGreen}`} />
            <div>
              <div className={styles.diseaseName}>No diseases detected</div>
              <div className={styles.diseaseDesc}>Your plant looks healthy! 🎉</div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

// ── Treatment Card ───────────────────────────
function TreatmentCard({ homeRemedies, chemicalTreatments }) {
  const [tab, setTab] = useState('home')
  const items = tab === 'home' ? homeRemedies : chemicalTreatments
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <i className="ti ti-clipboard-list" style={{ color: 'var(--green-600)', fontSize: 20 }} aria-hidden="true" />
        <span className={styles.cardTitle}>Treatment Plan</span>
      </div>
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'home' ? styles.tabActive : ''}`} onClick={() => setTab('home')}>🌿 Home Remedies</button>
        <button className={`${styles.tab} ${tab === 'chemical' ? styles.tabActive : ''}`} onClick={() => setTab('chemical')}>🧪 Chemical</button>
      </div>
      <div>
        {(items || []).map((r, i) => (
          <div key={i} className={styles.remedyItem}>
            <span className={styles.bullet}>•</span>
            <span>{r}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Care Card ────────────────────────────────
function CareCard({ care }) {
  const items = [
    { icon: 'ti-droplet',     label: 'Water',       val: care?.water },
    { icon: 'ti-sun',         label: 'Sunlight',    val: care?.sunlight },
    { icon: 'ti-mountain',    label: 'Soil',        val: care?.soil },
    { icon: 'ti-temperature', label: 'Temperature', val: care?.temperature },
    { icon: 'ti-cloud',       label: 'Humidity',    val: care?.humidity },
    { icon: 'ti-leaf',        label: 'Fertilizer',  val: care?.fertilizer },
  ]
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <i className="ti ti-droplet" style={{ color: 'var(--green-600)', fontSize: 20 }} aria-hidden="true" />
        <span className={styles.cardTitle}>Care Instructions</span>
      </div>
      <div className={styles.careGrid}>
        {items.map((c, i) => (
          <div key={i} className={styles.careItem}>
            <i className={`ti ${c.icon}`} style={{ color: 'var(--green-600)', fontSize: 20 }} aria-hidden="true" />
            <div>
              <div className={styles.careLabel}>{c.label}</div>
              <div className={styles.careVal}>{c.val || '—'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Steps Card ───────────────────────────────
function StepsCard({ steps }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <i className="ti ti-steps" style={{ color: 'var(--green-600)', fontSize: 20 }} aria-hidden="true" />
        <span className={styles.cardTitle}>Step-by-step Treatment</span>
      </div>
      {(steps || []).map((s, i) => (
        <div key={i} className={styles.step}>
          <div className={styles.stepNum}>{i + 1}</div>
          <div className={styles.stepText}>{s}</div>
        </div>
      ))}
    </div>
  )
}

// ── Chat Card ────────────────────────────────
function ChatCard({ diagnosis }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: `I've analyzed your ${diagnosis?.plantName || 'plant'}. Ask me anything about its care, treatment, or health!` }
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const q = input.trim()
    if (!q || sending) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: q }])
    setSending(true)
    try {
      const ctx = diagnosis
        ? `Plant: ${diagnosis.plantName}, Health: ${diagnosis.healthLabel}, Issues: ${(diagnosis.diseases || []).map(d => d.name).join(', ')}`
        : 'No plant analyzed yet.'
      const reply = await askExpert(q, ctx)
      setMessages(m => [...m, { role: 'ai', text: reply }])
    } catch {
      setMessages(m => [...m, { role: 'ai', text: 'Sorry, I could not process that. Please try again.' }])
    }
    setSending(false)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <i className="ti ti-message-circle" style={{ color: 'var(--green-600)', fontSize: 20 }} aria-hidden="true" />
        <span className={styles.cardTitle}>Ask Plant Expert AI</span>
      </div>
      <div className={styles.chatBox}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.chatMsg} ${m.role === 'ai' ? styles.aiMsg : styles.userMsg}`}>
            <span>{m.role === 'ai' ? '👨‍🌾' : '🧑'}</span>
            <div>{m.text}</div>
          </div>
        ))}
        {sending && (
          <div className={`${styles.chatMsg} ${styles.aiMsg}`}>
            <span>👨‍🌾</span><div className={styles.typing}>Thinking…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className={styles.chatInputRow}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="e.g. Why are my leaves turning yellow?"
          className={styles.chatInput}
          disabled={sending}
        />
        <button className={styles.sendBtn} onClick={send} disabled={sending} aria-label="Send">
          <i className="ti ti-send" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

// ── Main Export ──────────────────────────────
export default function DiagnosisResult({ data, onSave, onReset }) {
  return (
    <div className={styles.wrapper}>
      <IdentCard    data={data} />
      <DiseaseCard  diseases={data.diseases} />
      <TreatmentCard homeRemedies={data.homeRemedies} chemicalTreatments={data.chemicalTreatments} />
      <CareCard     care={data.careInstructions} />
      <StepsCard    steps={data.treatmentSteps} />
      <ChatCard     diagnosis={data} />

      <button className={styles.saveBtn} onClick={onSave}>
        <i className="ti ti-bookmark" aria-hidden="true" /> Save to My Plants Journal
      </button>
      <button className={styles.resetBtn} onClick={onReset}>
        <i className="ti ti-refresh" aria-hidden="true" /> Diagnose Another Plant
      </button>
    </div>
  )
}
