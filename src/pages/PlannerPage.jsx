import { useState, useRef, useCallback } from 'react'
import styles from './PlannerPage.module.css'

const ENTRIES = [
  {
    date:'OCT 24', title:'First Bloom', desc:'Unfolding successfully under optimal UV.',
    tag:'+15% HEIGHT', tagIcon:'ti-trending-up', tagType:'growth',
    starred:true, aiSync:true,
    gradient:'linear-gradient(160deg,#0d2e1a,#1a5c35,#2a8a55)',
  },
  {
    date:'OCT 15', title:'Stable Care', desc:'Node health is consistent with expectations.',
    tag:'HYDRATED', tagIcon:'ti-droplet', tagType:'water',
    gradient:'linear-gradient(160deg,#0a1a28,#0f2e4a,#1a4a6b)',
  },
  {
    date:'OCT 02', title:'New Pot', desc:'Root expansion triggered transfer.',
    tag:'TRANSPLANT', tagIcon:'ti-layout-grid', tagType:'transplant',
    gradient:'linear-gradient(160deg,#0a200a,#1a3a1a,#253a25)',
  },
  {
    date:'SEP 28', title:'Sun Bath', desc:'8 hours of indirect sunlight today.',
    tag:'OPTIMAL', tagIcon:'ti-sun', tagType:'sun',
    gradient:'linear-gradient(160deg,#1a1a08,#3a3a18,#4a5228)',
  },
  {
    date:'SEP 10', title:'First Leaf', desc:'New aerial root detected on main stem.',
    tag:'+8% HEIGHT', tagIcon:'ti-trending-up', tagType:'growth',
    gradient:'linear-gradient(160deg,#0d3a21,#1a6b3a)',
  },
  {
    date:'AUG 22', title:'Fertilized', desc:'Applied balanced 20-20-20 mix at dawn.',
    tag:'FED', tagIcon:'ti-leaf', tagType:'water',
    gradient:'linear-gradient(160deg,#1a2a0a,#2a4a1a)',
  },
]

export default function PlannerPage() {
  const [sliderPos, setSliderPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef()

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setSliderPos(pos)
  }, [])

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}><i className="ti ti-plant-2" /> Growth Timeline</div>
          <h1 className={styles.heroTitle}>Monstera Journey</h1>
          <p className={styles.heroSub}>Vibrant Growth Timeline &amp; Insights</p>
        </div>
      </section>

      <div className={styles.body}>
        <div className={styles.container}>

          {/* Before/After Slider */}
          <div className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>Before &amp; After</h2>
            <div
              ref={containerRef}
              className={styles.slider}
              onMouseMove={e => { if (dragging) updatePos(e.clientX) }}
              onMouseUp={() => setDragging(false)}
              onMouseLeave={() => setDragging(false)}
              onTouchMove={e => updatePos(e.touches[0].clientX)}
            >
              <div className={styles.sliderBefore} />
              <div className={styles.sliderAfter} style={{ width:`${sliderPos}%` }}>
                <div className={styles.afterBg} />
              </div>
              <div
                className={styles.handle}
                style={{ left:`${sliderPos}%` }}
                onMouseDown={e => { e.preventDefault(); setDragging(true) }}
              >
                <div className={styles.handleCircle}>
                  <i className="ti ti-arrows-left-right" style={{ fontSize:14 }} />
                </div>
              </div>
              <span className={styles.labelL}>MAY 12</span>
              <span className={styles.labelR}>TODAY</span>
              <div className={styles.slideBtn}>
                <i className="ti ti-arrows-exchange" /> SLIDE TO COMPARE
              </div>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className={styles.timelineSection}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Growth Timeline</h2>
              <button className={styles.addEntry}>
                <i className="ti ti-plus" /> Log Entry
              </button>
            </div>
            <div className={styles.grid}>
              {ENTRIES.map((e, i) => (
                <div key={i} className={styles.entry}>
                  <div className={styles.entryImg} style={{ background:e.gradient }}>
                    {e.starred && <button className={styles.star}><i className="ti ti-star-filled" /></button>}
                    {e.aiSync && <span className={styles.aiSync}><i className="ti ti-sparkles" /> AI SYNC</span>}
                  </div>
                  <div className={styles.entryBody}>
                    <span className={styles.entryDate}>{e.date}</span>
                    <div className={styles.entryTitle}>{e.title}</div>
                    <div className={styles.entryDesc}>{e.desc}</div>
                    <span className={`${styles.entryTag} ${styles[e.tagType]}`}>
                      <i className={`ti ${e.tagIcon}`} /> {e.tag}
                    </span>
                  </div>
                </div>
              ))}

              {/* Add Entry Card */}
              <div className={styles.addCard}>
                <i className="ti ti-plus" />
                <span>Add Journal Entry</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
