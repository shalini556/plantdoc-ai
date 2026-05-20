import { useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import UploadZone from './components/UploadZone.jsx'
import DiagnosisResult from './components/DiagnosisResult.jsx'
import Journal from './components/Journal.jsx'
import CareTips from './components/CareTips.jsx'
import Toast from './components/Toast.jsx'
import { usePlantDoctor } from './hooks/usePlantDoctor.js'
import styles from './App.module.css'

export default function App() {
  const [activeTab,   setActiveTab]   = useState('diagnose')
  const [imageSrc,    setImageSrc]    = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [toast,       setToast]       = useState('')

  const { diagnosis, loading, loadingMsg, error, analyze } = usePlantDoctor()

  // Handle image loaded from UploadZone
  const handleImageLoad = useCallback((dataUrl) => {
    setImageSrc(dataUrl)
    setImageBase64(dataUrl.split(',')[1])
  }, [])

  // Trigger AI analysis
  const handleAnalyze = useCallback(() => {
    if (imageBase64) analyze(imageBase64)
  }, [imageBase64, analyze])

  // Save current diagnosis to localStorage journal
  const handleSave = useCallback(() => {
    if (!diagnosis) return
    const journal = JSON.parse(localStorage.getItem('plantJournal') || '[]')
    journal.unshift({
      id: Date.now(),
      plantName:    diagnosis.plantName,
      scientificName: diagnosis.scientificName,
      healthStatus: diagnosis.healthStatus,
      healthLabel:  diagnosis.healthLabel,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      imageSrc,
    })
    localStorage.setItem('plantJournal', JSON.stringify(journal.slice(0, 20)))
    setToast('✅ Saved to My Plants Journal!')
  }, [diagnosis, imageSrc])

  // Reset everything
  const handleReset = useCallback(() => {
    setImageSrc(null)
    setImageBase64(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className={styles.app}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className={styles.main}>

        {/* ── DIAGNOSE TAB ── */}
        {activeTab === 'diagnose' && (
          <section>
            <div className={styles.tipBar}>
              <i className="ti ti-info-circle" aria-hidden="true" />
              Upload a clear photo of your plant — leaves, stem, or full plant for best results.
            </div>

            <UploadZone imageSrc={imageSrc} onImageLoad={handleImageLoad} />

            <button
              className={styles.analyzeBtn}
              disabled={!imageBase64 || loading}
              onClick={handleAnalyze}
            >
              {loading
                ? <><span className={styles.spinner}>🔬</span> {loadingMsg}</>
                : <><i className="ti ti-microscope" aria-hidden="true" /> Diagnose My Plant</>
              }
            </button>

            {error && (
              <div className={styles.errorBox}>
                <i className="ti ti-alert-circle" aria-hidden="true" />
                {error} — Check your API key in <code>src/hooks/usePlantDoctor.js</code>
              </div>
            )}

            {diagnosis && !loading && (
              <DiagnosisResult
                data={diagnosis}
                onSave={handleSave}
                onReset={handleReset}
              />
            )}
          </section>
        )}

        {/* ── JOURNAL TAB ── */}
        {activeTab === 'journal' && (
          <Journal onGoDiagnose={() => setActiveTab('diagnose')} />
        )}

        {/* ── TIPS TAB ── */}
        {activeTab === 'tips' && <CareTips />}

      </main>

      <Toast message={toast} onHide={() => setToast('')} />
    </div>
  )
}
