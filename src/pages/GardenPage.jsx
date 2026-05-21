import { useState } from 'react'
import styles from './GardenPage.module.css'

const PLANTS = [
  {
    id: 1, name: 'Monstera Deliciosa', scientific: 'Swiss Cheese Plant',
    health: 92, healthLabel: 'Excellent', status: 'Stable', statusType: 'stable',
    nextWatering: '2 days', location: 'Living Room',
    gradient: 'linear-gradient(160deg,#0d3a21 0%,#1a6b3a 55%,#2a8a55 100%)',
  },
  {
    id: 2, name: 'Sansevieria', scientific: 'Snake Plant',
    health: 68, healthLabel: 'Good', status: 'Thirsty', statusType: 'thirsty',
    nextWatering: 'Due Today', location: 'Bedroom',
    gradient: 'linear-gradient(160deg,#0a1a10 0%,#1a3020 50%,#0d2518 100%)',
  },
  {
    id: 3, name: 'Fiddle Leaf Fig', scientific: 'Ficus lyrata',
    health: 85, healthLabel: 'Very Good', status: 'Stable', statusType: 'stable',
    nextWatering: '4 days', location: 'Office',
    gradient: 'linear-gradient(160deg,#1a2a0a,#2a4a1a,#3a6a2a)',
  },
]

const TASKS = [
  { id: 1, label: 'Water Fiddle Leaf Fig', sub: 'Living Room', icon: 'ti-droplet' },
  { id: 2, label: 'Fertilize Monstera', sub: 'Balcony · 10-10-10 Mix', icon: 'ti-activity' },
  { id: 3, label: 'Repot Aloe Vera', sub: 'Kitchen Window', icon: 'ti-tools' },
  { id: 4, label: 'Trim Snake Plant', sub: 'Bedroom', icon: 'ti-cut' },
]

export default function GardenPage({ onPlantSelect }) {
  const [done, setDone] = useState([])
  const toggle = id => setDone(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  return (
    <div className={styles.page}>
      {/* Page Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroDot} /> 12 plants tracked
          </div>
          <h1 className={styles.heroTitle}>Your Garden Overview</h1>
          <p className={styles.heroSub}>Monitor health, tasks, and growth — all in one place.</p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statCard}>
            <i className="ti ti-plant-2" />
            <span className={styles.statNum}>12</span>
            <span className={styles.statLab}>Total Plants</span>
          </div>
          <div className={styles.statCard}>
            <i className="ti ti-clipboard-check" />
            <span className={styles.statNum}>4</span>
            <span className={styles.statLab}>Tasks Today</span>
          </div>
          <div className={styles.statCard}>
            <i className="ti ti-heart-rate" />
            <span className={styles.statNum}>94%</span>
            <span className={styles.statLab}>Avg Health</span>
          </div>
          <div className={styles.statCard}>
            <i className="ti ti-droplet" />
            <span className={styles.statNum}>3</span>
            <span className={styles.statLab}>Need Water</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.body}>
        <div className={styles.container}>

          {/* Health + Tasks Row */}
          <div className={styles.row2}>
            {/* Garden Health */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>Garden Health</h2>
                <span className={styles.healthTag}>94% Optimal</span>
              </div>
              <div className={styles.progressWrap}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '94%' }} />
                </div>
              </div>
              <div className={styles.metrics}>
                {[
                  { label: 'Moisture', value: '82%', icon: 'ti-droplet', color: '#0ea5e9' },
                  { label: 'Light',    value: '76%', icon: 'ti-sun',     color: '#f59e0b' },
                  { label: 'Nutrients',value: 'High', icon: 'ti-leaf',   color: '#22c55e' },
                ].map(m => (
                  <div key={m.label} className={styles.metric}>
                    <div className={styles.metricIcon} style={{ background: m.color + '18', color: m.color }}>
                      <i className={`ti ${m.icon}`} />
                    </div>
                    <div>
                      <div className={styles.metricVal}>{m.value}</div>
                      <div className={styles.metricLab}>{m.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Care */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>Today's Care</h2>
                <span className={styles.doneTag}>{done.length}/{TASKS.length} done</span>
              </div>
              <div className={styles.taskList}>
                {TASKS.map(t => (
                  <button key={t.id} className={styles.task} onClick={() => toggle(t.id)}>
                    <div className={`${styles.check} ${done.includes(t.id) ? styles.checked : ''}`}>
                      {done.includes(t.id) && <i className="ti ti-check" />}
                    </div>
                    <div className={styles.taskText}>
                      <span className={`${styles.taskLabel} ${done.includes(t.id) ? styles.strike : ''}`}>{t.label}</span>
                      {t.sub && <span className={styles.taskSub}>{t.sub}</span>}
                    </div>
                    <i className={`ti ${t.icon}`} style={{ color: 'var(--primary)', fontSize: 18 }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Plants Grid */}
          <div className={styles.plantsSection}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>My Plants</h2>
              <button className={styles.viewAll}>View All <i className="ti ti-arrow-right" /></button>
            </div>
            <div className={styles.plantGrid}>
              {PLANTS.map(p => (
                <div key={p.id} className={styles.plantCard} onClick={() => onPlantSelect(p)}>
                  <div className={styles.plantImg} style={{ background: p.gradient }}>
                    <span className={`${styles.statusBadge} ${styles[p.statusType]}`}>● {p.status}</span>
                    <div className={styles.plantLocation}>
                      <i className="ti ti-map-pin" /> {p.location}
                    </div>
                  </div>
                  <div className={styles.plantBody}>
                    <div className={styles.plantName}>{p.name}</div>
                    <div className={styles.plantSci}>{p.scientific}</div>
                    <div className={styles.plantHealthRow}>
                      <span className={styles.healthLabel}>Health</span>
                      <span className={styles.healthVal}>{p.healthLabel}</span>
                    </div>
                    <div className={styles.healthBar}>
                      <div className={styles.healthFill} style={{ width: `${p.health}%` }} />
                    </div>
                    <div className={`${styles.waterRow} ${p.nextWatering === 'Due Today' ? styles.urgent : ''}`}>
                      <i className="ti ti-droplet" />
                      Water {p.nextWatering === 'Due Today' ? <strong>Due Today</strong> : <>in <strong>{p.nextWatering}</strong></>}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Plant Card */}
              <div className={styles.addCard}>
                <div className={styles.addIcon}><i className="ti ti-plus" /></div>
                <div className={styles.addTitle}>Add New Plant</div>
                <div className={styles.addSub}>Scan or search to add</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
