import styles from './CareTips.module.css'

const SEASONS = [
  {
    emoji: '☀️', name: 'Summer',
    tips: [
      'Water more frequently — soil dries faster in heat',
      'Provide shade from harsh afternoon sun',
      'Check for pests weekly — they thrive in heat',
      'Mist leaves to increase humidity',
      'Fertilize every 2 weeks during growing season',
    ],
  },
  {
    emoji: '🌧️', name: 'Monsoon',
    tips: [
      'Reduce watering — soil stays moist longer',
      'Ensure proper drainage to prevent root rot',
      'Watch for fungal diseases in high humidity',
      'Move indoor plants away from cold drafts',
      'Apply neem oil to prevent fungal growth',
    ],
  },
  {
    emoji: '🍂', name: 'Winter',
    tips: [
      'Water less — plants grow slowly in cold',
      'Bring tropical plants indoors',
      'Avoid fertilizing dormant plants',
      'Keep plants away from cold windows at night',
      'Watch for pests that move indoors',
    ],
  },
  {
    emoji: '🌸', name: 'Spring',
    tips: [
      'Repot root-bound plants now',
      'Resume regular fertilizing schedule',
      'Prune dead branches to encourage new growth',
      'Good time to propagate and take cuttings',
      'Increase watering gradually as temps rise',
    ],
  },
]

export default function CareTips() {
  return (
    <div>
      <div className={styles.title}>
        <i className="ti ti-bulb" aria-hidden="true" /> Seasonal Care Tips
      </div>
      <div className={styles.grid}>
        {SEASONS.map(s => (
          <div key={s.name} className={styles.card}>
            <div className={styles.season}>{s.emoji} {s.name}</div>
            <ul className={styles.list}>
              {s.tips.map((tip, i) => (
                <li key={i} className={styles.item}>
                  <span className={styles.leaf}>🌱</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
