import styles from './Journal.module.css'

export default function Journal({ onGoDiagnose }) {
  const journal = JSON.parse(localStorage.getItem('plantJournal') || '[]')

  const badgeCls = (status) => ({
    healthy: styles.healthy,
    warning: styles.warning,
    danger:  styles.danger,
  }[status] || styles.healthy)

  if (journal.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🪴</div>
        <p>No plants saved yet.<br />Diagnose a plant and save it here!</p>
        <button className={styles.diagBtn} onClick={onGoDiagnose}>
          <i className="ti ti-camera" aria-hidden="true" /> Diagnose a Plant
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.sectionTitle}>
        <i className="ti ti-notebook" aria-hidden="true" /> My Plants Journal
      </div>
      <div className={styles.grid}>
        {journal.map(entry => (
          <div key={entry.id} className={styles.card}>
            {entry.imageSrc
              ? <img src={entry.imageSrc} alt={entry.plantName} className={styles.img} />
              : <div className={styles.imgPlaceholder}>🌿</div>
            }
            <div className={styles.body}>
              <div className={styles.name}>{entry.plantName}</div>
              <div className={styles.date}>{entry.date}</div>
              <div className={`${styles.badge} ${badgeCls(entry.healthStatus)}`}>
                {entry.healthLabel || 'Checked'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
