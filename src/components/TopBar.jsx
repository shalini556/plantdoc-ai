import styles from './TopBar.module.css'

export default function TopBar({ onBack, title, actions = [] }) {
  return (
    <header className={styles.bar}>
      {onBack ? (
        <button className={styles.back} onClick={onBack}>
          <i className="ti ti-arrow-left" />
        </button>
      ) : (
        <div className={styles.logo}>
          <i className="ti ti-leaf" />
          <span>PlantDoc AI</span>
        </div>
      )}

      {title && <span className={styles.title}>{title}</span>}

      <div className={styles.actions}>
        {actions.map((a, i) => (
          <button key={i} className={styles.action} onClick={a.onClick}>
            <i className={`ti ${a.icon}`} />
          </button>
        ))}
      </div>
    </header>
  )
}
