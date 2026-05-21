import styles from './Navbar.module.css'

const LINKS = [
  { id: 'garden',  label: 'Garden',  icon: 'ti-plant-2' },
  { id: 'scan',    label: 'Scan',    icon: 'ti-scan' },
  { id: 'doctor',  label: 'Doctor',  icon: 'ti-stethoscope' },
  { id: 'planner', label: 'Planner', icon: 'ti-layout-grid' },
  { id: 'social',  label: 'Social',  icon: 'ti-users' },
]

export default function Navbar({ active, onNav }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <button className={styles.logo} onClick={() => onNav('garden')}>
          <div className={styles.logoIcon}>
            <i className="ti ti-leaf" />
          </div>
          <span className={styles.logoText}>PlantDoc <strong>AI</strong></span>
        </button>

        {/* Links */}
        <div className={styles.links}>
          {LINKS.map(l => (
            <button
              key={l.id}
              className={`${styles.link} ${active === l.id ? styles.active : ''}`}
              onClick={() => onNav(l.id)}
            >
              <i className={`ti ${l.icon}`} />
              {l.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className={styles.right}>
          <button className={styles.scanCta} onClick={() => onNav('scan')}>
            <i className="ti ti-scan" /> Scan a Plant
          </button>
          <div className={styles.avatar}>
            <i className="ti ti-user" />
          </div>
        </div>
      </div>
    </nav>
  )
}
