import styles from './Header.module.css'

export default function Header({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'diagnose', label: 'Diagnose', icon: 'ti-camera' },
    { id: 'journal',  label: 'My Plants', icon: 'ti-notebook' },
    { id: 'tips',     label: 'Care Tips', icon: 'ti-bulb' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoCircle}>🌿</div>
        <div>
          <div className={styles.logoText}>PlantDoc AI</div>
          <div className={styles.logoSub}>Your personal plant health assistant</div>
        </div>
      </div>
      <nav className={styles.nav}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.navBtn} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <i className={`ti ${tab.icon}`} aria-hidden="true" />
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
