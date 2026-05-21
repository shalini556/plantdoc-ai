import { useState, useRef } from 'react'
import { usePlantDoctor } from '../hooks/usePlantDoctor.js'
import styles from './ScanPage.module.css'

const FEATURES = [
  { icon: 'ti-zoom-in',     title: 'Instant ID',       desc: 'Over 10,000 plant species recognized in seconds.' },
  { icon: 'ti-virus-search',title: 'Disease Detection', desc: 'AI scans for pests, fungi, and nutrient issues.' },
  { icon: 'ti-book',        title: 'Care Guides',       desc: 'Personalized watering, light, and soil advice.' },
  { icon: 'ti-robot',       title: 'AI Bot Consult',    desc: 'Ask follow-up questions to our plant AI expert.' },
]

const RECENT = [
  { name: 'Ficus Lyrata',   grad: 'linear-gradient(160deg,#1a2a0a,#2a4a1a)' },
  { name: 'Aloe Vera',      grad: 'linear-gradient(160deg,#1a3a2a,#2a6a4a)' },
  { name: 'Sansevieria',    grad: 'linear-gradient(160deg,#0a1a0a,#1a3010)' },
  { name: 'Epipremnum',     grad: 'linear-gradient(160deg,#0d2a1a,#1a4a2a)' },
  { name: 'Calathea',       grad: 'linear-gradient(160deg,#1a0a2e,#2d1b69)' },
  { name: 'Peace Lily',     grad: 'linear-gradient(160deg,#1a1a1a,#2a2a2a)' },
]

export default function ScanPage() {
  const [imageSrc, setImageSrc] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const inputRef = useRef()

  const { diagnosis, loading, loadingMsg, error, analyze } = usePlantDoctor()

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => {
      setImageSrc(e.target.result)
      setImageBase64(e.target.result.split(',')[1])
    }
    reader.readAsDataURL(file)
  }

  const handleScan = () => { if (imageBase64) analyze(imageBase64) }
  const isHealthy = diagnosis?.healthStatus === 'healthy'

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <i className="ti ti-sparkles" /> NEXT-GEN BOTANICAL AI
        </div>
        <h1 className={styles.heroTitle}>Scan Any Plant<br />Instantly with AI</h1>
        <p className={styles.heroSub}>
          Identify plants and detect diseases with 99% accuracy.<br />
          Your pocket botanist is always ready.
        </p>
      </section>

      {/* Main Upload Section */}
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.mainGrid}>
            {/* Upload / Camera area */}
            <div className={styles.uploadSide}>
              <div
                className={styles.uploadArea}
                onClick={() => !imageSrc && inputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
              >
                {imageSrc ? (
                  <>
                    <img src={imageSrc} alt="Plant" className={styles.preview} />
                    {/* Corner brackets */}
                    <div className={`${styles.corner} ${styles.tl}`} />
                    <div className={`${styles.corner} ${styles.tr}`} />
                    <div className={`${styles.corner} ${styles.bl}`} />
                    <div className={`${styles.corner} ${styles.br}`} />
                    {loading && (
                      <>
                        <div className={styles.scanLine} />
                        <div className={styles.analyzingBadge}>
                          <span className={styles.dot} />
                          {loadingMsg}
                        </div>
                      </>
                    )}
                    {diagnosis && !loading && (
                      <div className={styles.confidence}>
                        <span className={styles.confLabel}>Confidence</span>
                        <span className={styles.confVal}>98%</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <div className={styles.uploadIcon}>
                      <i className="ti ti-leaf" />
                    </div>
                    <p className={styles.uploadTitle}>Drop your plant photo here</p>
                    <p className={styles.uploadHint}>or click to browse files</p>
                  </div>
                )}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={e => handleFile(e.target.files[0])}
              />

              <div className={styles.btnRow}>
                <button className={styles.uploadBtn} onClick={() => inputRef.current?.click()}>
                  <i className="ti ti-upload" /> Upload Plant Image
                </button>
                <button className={styles.cameraBtn} onClick={() => inputRef.current?.click()}>
                  <i className="ti ti-camera" /> Scan with Camera
                </button>
              </div>

              {imageSrc && (
                <button
                  className={styles.analyzeBtn}
                  onClick={handleScan}
                  disabled={loading}
                >
                  {loading
                    ? <><span className={styles.spinner} /> Analyzing…</>
                    : <><i className="ti ti-microscope" /> Analyze Plant</>}
                </button>
              )}
            </div>

            {/* Results side */}
            <div className={styles.resultSide}>
              {diagnosis && !loading ? (
                <div className={styles.resultCard}>
                  <div className={styles.resultTop}>
                    <div>
                      <h2 className={styles.rName}>{diagnosis.plantName}</h2>
                      <p className={styles.rSci}>{diagnosis.scientificName}</p>
                    </div>
                    <span className={`${styles.healthBadge} ${isHealthy ? styles.hHealthy : styles.hWarn}`}>
                      {isHealthy ? '✓ HEALTHY' : '⚠ NEEDS CARE'}
                    </span>
                  </div>
                  <div className={styles.resultBar}>
                    <span>AI Scan Complete</span>
                    <span className={styles.complete}>100%</span>
                  </div>
                  <div className={styles.resultFillWrap}>
                    <div className={styles.resultFill} />
                  </div>
                  {diagnosis.careInstructions && (
                    <div className={styles.careGrid}>
                      {[
                        { icon:'ti-droplet',     label:'Watering',    val: diagnosis.careInstructions.water },
                        { icon:'ti-sun',         label:'Sunlight',    val: diagnosis.careInstructions.sunlight },
                        { icon:'ti-temperature', label:'Temperature', val: diagnosis.careInstructions.temperature },
                        { icon:'ti-leaf',        label:'Soil',        val: diagnosis.careInstructions.soil },
                      ].map(c => (
                        <div key={c.label} className={styles.careItem}>
                          <i className={`ti ${c.icon}`} />
                          <span className={styles.careLab}>{c.label}</span>
                          <span className={styles.careVal}>{c.val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : error ? (
                <div className={styles.errorBox}>
                  <i className="ti ti-alert-circle" />
                  <p>{error}</p>
                </div>
              ) : (
                <div className={styles.instructCard}>
                  <h3 className={styles.instrTitle}>How It Works</h3>
                  <div className={styles.steps}>
                    {[
                      { n:'1', title:'Upload Photo',   desc:'Snap a clear photo of your plant\'s leaves or stem.' },
                      { n:'2', title:'AI Analysis',    desc:'Our neural network identifies species and health indicators.' },
                      { n:'3', title:'Get Care Tips',  desc:'Receive personalized care schedules and treatment advice.' },
                    ].map(s => (
                      <div key={s.n} className={styles.step}>
                        <div className={styles.stepNum}>{s.n}</div>
                        <div>
                          <div className={styles.stepTitle}>{s.title}</div>
                          <div className={styles.stepDesc}>{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Intelligent Features */}
              <div className={styles.featuresCard}>
                <h3 className={styles.instrTitle}>Intelligent Features</h3>
                <div className={styles.featureGrid}>
                  {FEATURES.map(f => (
                    <div key={f.title} className={styles.feature}>
                      <i className={`ti ${f.icon}`} />
                      <div className={styles.featureTitle}>{f.title}</div>
                      <div className={styles.featureDesc}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Scans */}
          <div className={styles.recentSection}>
            <div className={styles.recentHead}>
              <h2 className={styles.sectionTitle}>Recent Scans</h2>
              <button className={styles.viewAll}>View All <i className="ti ti-arrow-right" /></button>
            </div>
            <div className={styles.recentGrid}>
              {RECENT.map((r, i) => (
                <div key={i} className={styles.recentCard}>
                  <div className={styles.recentImg} style={{ background: r.grad }} />
                  <span className={styles.recentName}>{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
