import styles from './BottomNav.module.css'

const NAV = [
  { id: 'garden',  label: 'Garden',  icon: 'ti-plant-2' },
  { id: 'scan',    label: 'Scan',    icon: 'ti-scan' },
  { id: 'doctor',  label: 'Doctor',  icon: 'ti-stethoscope' },
  { id: 'planner', label: 'Planner', icon: 'ti-layout-grid' },
  { id: 'social',  label: 'Social',  icon: 'ti-users' },
]

export default function BottomNav({ active, onTab }) {
  return (
    <nav className={styles.nav}>
      {NAV.map(item => (
        <button
          key={item.id}
          className={`${styles.btn} ${active === item.id ? styles.active : ''}`}
          onClick={() => onTab(item.id)}
        >
          {active === item.id ? (
            <span className={styles.pill}>
              <i className={`ti ${item.icon}`} />
            </span>
          ) : (
            <i className={`ti ${item.icon}`} />
          )}
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
