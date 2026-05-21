import { useState } from 'react'
import styles from './DoctorPage.module.css'

const TABS = ['Overview', 'Care Guide', 'Disease', 'History']

const DEFAULT = {
  name: 'Monstera Deliciosa',
  scientific: 'Swiss Cheese Plant',
  health: 92,
  gradient: 'linear-gradient(160deg,#0d3a21 0%,#1a6b3a 55%,#2a8a55 100%)',
}

export default function DoctorPage({ plant }) {
  const [tab, setTab] = useState('Overview')
  const [liked, setLiked] = useState(false)
  const p = plant || DEFAULT

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ background: p.gradient }}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <i className="ti ti-heart-rate" /> HEALTH: {p.health}/100
          </div>
          <div className={styles.heroInfo}>
            <h1 className={styles.heroName}>{p.name}</h1>
            <p className={styles.heroSci}>{p.scientific}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className={styles.body}>
        <div className={styles.container}>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.addBtn}>
              <i className="ti ti-plus" /> Add to My Garden
            </button>
            <button
              className={`${styles.heartBtn} ${liked ? styles.liked : ''}`}
              onClick={() => setLiked(l => !l)}
            >
              <i className={liked ? 'ti ti-heart-filled' : 'ti ti-heart'} />
              {liked ? 'Saved' : 'Save Plant'}
            </button>
            <button className={styles.shareBtn}>
              <i className="ti ti-share" />
            </button>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {TABS.map(t => (
              <button
                key={t}
                className={`${styles.tabBtn} ${tab === t ? styles.active : ''}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'Overview' && (
            <div className={styles.tabContent}>
              <div className={styles.twoCol}>
                {/* Left column */}
                <div>
                  {/* Care Essentials */}
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Care Essentials</h3>
                    <div className={styles.careGrid}>
                      {[
                        { icon:'ti-droplet',        label:'WATERING',   value:'Every 7 days' },
                        { icon:'ti-sun',             label:'SUNLIGHT',   value:'Partial Shade' },
                        { icon:'ti-temperature',     label:'TEMP',       value:'18-24°C' },
                        { icon:'ti-droplet-half-2',  label:'HUMIDITY',   value:'60-80%' },
                      ].map(c => (
                        <div key={c.label} className={styles.careItem}>
                          <div className={styles.careIcon}><i className={`ti ${c.icon}`} /></div>
                          <div>
                            <div className={styles.careLab}>{c.label}</div>
                            <div className={styles.careVal}>{c.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overview text */}
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Overview</h3>
                    <p className={styles.bodyText}>
                      Native to tropical forests of southern Mexico, south to Panama. It has been introduced
                      to many tropical areas and has become a mildly invasive species in Hawaii, Seychelles,
                      Ascension Island and the Society Islands.
                    </p>
                    <p className={styles.bodyText} style={{ marginTop: 12 }}>
                      Monstera deliciosa is famous for its natural leaf holes, called fenestrations. These are
                      thought to help the plant withstand tropical storms and allow sunlight to reach lower leaves.
                    </p>
                  </div>
                </div>

                {/* Right column */}
                <div>
                  {/* AI Diagnostic */}
                  <div className={styles.card}>
                    <div className={styles.diagHeader}>
                      <span className={styles.diagBadge}>
                        <i className="ti ti-sparkles" /> AI DIAGNOSTIC MODULE
                      </span>
                      <i className="ti ti-settings" style={{ color:'var(--text-3)', fontSize:18, cursor:'pointer' }} />
                    </div>
                    <div className={styles.diagImg}>
                      <div className={styles.diagLeft} />
                      <div className={styles.diagRight} />
                      <div className={styles.diagLine} />
                    </div>
                    <div className={styles.diagResult}>
                      <div className={styles.diagBar} />
                      <div>
                        <p className={styles.diagTitle}>No major pathogens detected</p>
                        <p className={styles.diagSub}>Chlorophyll levels optimal at 94.2%. Minor mechanical damage on lower nodes.</p>
                      </div>
                    </div>
                  </div>

                  {/* Growth Progress */}
                  <div className={styles.card}>
                    <div className={styles.growthHead}>
                      <h3 className={styles.cardTitle}>Growth Progress</h3>
                      <span className={styles.growthPct}>72%</span>
                    </div>
                    <div className={styles.growthBar}>
                      <div className={styles.growthFill} style={{ width:'72%' }} />
                    </div>
                    <div className={styles.growthLabels}>
                      <span>Seedling</span>
                      <span>Mature Growth</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Plant Tags</h3>
                    <div className={styles.tags}>
                      {['Tropical','Indoor','Low Maintenance','Pet Safe','Air Purifying','Fast Growing'].map(t => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'Care Guide' && (
            <div className={styles.tabContent}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Watering</h3>
                <p className={styles.bodyText}>Water thoroughly when the top 2-3 inches of soil are dry. In winter, reduce frequency to every 10-14 days. Always use room-temperature water and ensure drainage holes are clear.</p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Fertilizing</h3>
                <p className={styles.bodyText}>Apply a balanced 20-20-20 liquid fertilizer diluted to half strength once monthly during spring and summer. Skip fertilizing in fall and winter when growth slows.</p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Pruning &amp; Cleaning</h3>
                <p className={styles.bodyText}>Wipe leaves monthly with a damp cloth to remove dust. Prune dead or yellowing leaves at the base. Use sterilized scissors to prevent disease spread.</p>
              </div>
            </div>
          )}

          {tab === 'Disease' && (
            <div className={styles.tabContent}>
              {[
                { name:'Root Rot', severity:'High Risk', desc:'Caused by overwatering. Symptoms: yellowing leaves, mushy stem base, foul smell.' },
                { name:'Spider Mites', severity:'Medium', desc:'Look for fine webbing under leaves and stippled discoloration. Treat with neem oil spray.' },
                { name:'Scale Insects', severity:'Low',   desc:'Brown bumps on stems. Remove manually with rubbing alcohol and a cotton swab.' },
              ].map(d => (
                <div key={d.name} className={styles.diseaseCard}>
                  <div className={styles.diseaseHead}>
                    <h3 className={styles.cardTitle}>{d.name}</h3>
                    <span className={`${styles.severityTag} ${styles['sev' + d.severity.split(' ')[0]]}`}>{d.severity}</span>
                  </div>
                  <p className={styles.bodyText}>{d.desc}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'History' && (
            <div className={styles.tabContent}>
              <div className={styles.emptyState}>
                <i className="ti ti-clock-hour-3" />
                <h3>No History Yet</h3>
                <p>Scan your plant regularly to build a health timeline and track growth over time.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
