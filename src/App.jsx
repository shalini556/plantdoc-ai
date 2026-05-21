import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import GardenPage from './pages/GardenPage.jsx'
import ScanPage from './pages/ScanPage.jsx'
import DoctorPage from './pages/DoctorPage.jsx'
import PlannerPage from './pages/PlannerPage.jsx'
import SocialPage from './pages/SocialPage.jsx'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState('garden')
  const [selectedPlant, setSelectedPlant] = useState(null)

  const goToPlant = (plant) => {
    setSelectedPlant(plant)
    setPage('doctor')
  }

  const handleNav = (id) => {
    if (id !== 'doctor') setSelectedPlant(null)
    setPage(id)
  }

  const activeNav = page === 'doctor' ? 'garden' : page

  return (
    <div className={styles.app}>
      <Navbar active={activeNav} onNav={handleNav} />

      <main className={styles.main}>
        {page === 'garden'  && <GardenPage  onPlantSelect={goToPlant} />}
        {page === 'scan'    && <ScanPage />}
        {page === 'doctor'  && <DoctorPage  plant={selectedPlant} />}
        {page === 'planner' && <PlannerPage />}
        {page === 'social'  && <SocialPage />}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <div className={styles.footerIcon}><i className="ti ti-leaf" /></div>
            <span>PlantDoc <strong>AI</strong></span>
          </div>
          <p className={styles.footerText}>
            Your intelligent plant health companion. Identify, monitor, and care for your plants with AI.
          </p>
          <div className={styles.footerLinks}>
            {['Garden','Scan','Doctor','Planner','Social'].map(l => (
              <button key={l} className={styles.footerLink} onClick={() => handleNav(l.toLowerCase())}>
                {l}
              </button>
            ))}
          </div>
          <p className={styles.footerCopy}>© 2025 PlantDoc AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
