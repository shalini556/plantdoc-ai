import { useState } from 'react'
import styles from './SocialPage.module.css'

const TRENDS = [
  { tag:'#MonsteraMonday',   gradient:'linear-gradient(160deg,#0d3a21,#1a6b3a)', count:'2.4k posts' },
  { tag:'#PropagationTips',  gradient:'linear-gradient(160deg,#1a3a0a,#2a5a1a)', count:'1.8k posts' },
  { tag:'#UrbanJungle',      gradient:'linear-gradient(160deg,#0a1a2a,#1a3a4a)', count:'3.1k posts' },
  { tag:'#PlantParent',      gradient:'linear-gradient(160deg,#2a0a1a,#4a1a2a)', count:'956 posts' },
]

const POSTS = [
  { user:'Green_Thumb_Leo', avatar:'G', text:'Finally got my prayer plant to fold! 🌿✨', likes:'1.2k', comments:34, badge:'AI',       gradient:'linear-gradient(160deg,#1a0a2e,#2d1b69,#4c1b6d)', color:'#2d7a52' },
  { user:'Urban_Seed',      avatar:'U', text:'Tomato sprouts are ready for the balcony!', likes:'89',   comments:12, badge:'Seedlings', gradient:'linear-gradient(160deg,#0a200a,#1a3a1a,#0d3010)', color:'#1a5c7a' },
  { user:'Maya_Propagates', avatar:'M', text:'Morning light hitting the nursery just right.', likes:'482', comments:28, badge:null,    gradient:'linear-gradient(160deg,#1a2a1a,#2a3e2a,#354f35)', color:'#6a2d7a' },
  { user:'Succulent_Society',avatar:'S',text:'Succulents or Art? Hard to tell sometimes.', likes:'2.5k', comments:67, badge:null,     gradient:'linear-gradient(160deg,#0a2828,#1a4040,#255050)', color:'#7a5c2d' },
  { user:'PlantMom_Rae',    avatar:'P', text:'New arrivals from the nursery. Which one first?', likes:'733', comments:45, badge:null,  gradient:'linear-gradient(160deg,#0a0a2a,#1a1a3a,#2a2a5a)', color:'#2d5a7a' },
  { user:'GardenGuru',      avatar:'G', text:'Repotting day for 8 plants. Wish me luck! 🌱', likes:'1.1k', comments:89, badge:'Tips', gradient:'linear-gradient(160deg,#1a3a1a,#2a5a2a,#3a7a3a)', color:'#3a7a2a' },
]

const REVIEWS = [
  { name:'Sarah J.', rating:5, text:'Saved my Fiddle Leaf Fig! The disease detection was spot on and the recovery steps were so easy to follow.' },
  { name:'Mike R.',  rating:5, text:'The AI identification is incredibly fast. I take it on my walks and learn about every plant I see.' },
  { name:'Emma L.', rating:5, text:'Best plant app I\'ve ever used. The care reminders have kept all my plants alive for 6 months!' },
]

export default function SocialPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Plant Community</h1>
          <p className={styles.heroSub}>Connect with gardeners, share your journey, and get expert advice.</p>
          <div className={styles.searchBar}>
            <i className="ti ti-search" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for plants or creators…"
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => setQuery('')}>
                <i className="ti ti-x" />
              </button>
            )}
          </div>
          <div className={styles.chips}>
            {['Nearby Gardeners','Disease Q&A','Experts'].map(c => (
              <button
                key={c}
                className={`${styles.chip} ${filter === c ? styles.chipActive : ''}`}
                onClick={() => setFilter(filter === c ? '' : c)}
              >
                <i className={`ti ${c==='Nearby Gardeners'?'ti-map-pin':c==='Disease Q&A'?'ti-message-circle':'ti-award'}`} />
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.body}>
        <div className={styles.container}>

          {/* Trending */}
          <div className={styles.trendSection}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Trending Now</h2>
              <button className={styles.viewAll}>View All <i className="ti ti-arrow-right" /></button>
            </div>
            <div className={styles.trendGrid}>
              {TRENDS.map((t, i) => (
                <div key={i} className={styles.trendCard} style={{ background:t.gradient }}>
                  <span className={styles.trendTag}>{t.tag}</span>
                  <span className={styles.trendCount}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts + Sidebar */}
          <div className={styles.mainGrid}>
            {/* Posts */}
            <div>
              <h2 className={styles.sectionTitle} style={{ marginBottom:20 }}>Recent Posts</h2>
              <div className={styles.postGrid}>
                {POSTS.map((p, i) => (
                  <div key={i} className={styles.postCard}>
                    <div className={styles.postImg} style={{ background:p.gradient }}>
                      {p.badge && <span className={styles.postBadge}>{p.badge}</span>}
                    </div>
                    <div className={styles.postBody}>
                      <div className={styles.postUser}>
                        <div className={styles.avatar} style={{ background:p.color }}>{p.avatar}</div>
                        <span className={styles.username}>{p.user}</span>
                      </div>
                      <p className={styles.postText}>{p.text}</p>
                      <div className={styles.postActions}>
                        <button className={styles.likeBtn}>
                          <i className="ti ti-heart" /> {p.likes}
                        </button>
                        <button className={styles.commentBtn}>
                          <i className="ti ti-message-circle" /> {p.comments}
                        </button>
                        <button className={styles.sharePostBtn}>
                          <i className="ti ti-share" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              {/* Gardener Reviews */}
              <div className={styles.reviewCard}>
                <h3 className={styles.cardTitle}>Gardener Reviews</h3>
                <div className={styles.reviews}>
                  {REVIEWS.map((r, i) => (
                    <div key={i} className={styles.review}>
                      <div className={styles.stars}>{'★'.repeat(r.rating)}</div>
                      <p className={styles.reviewText}>"{r.text}"</p>
                      <div className={styles.reviewer}>
                        <div className={styles.reviewAvatar}>{r.name[0]}</div>
                        <span>{r.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Tags */}
              <div className={styles.tagsCard}>
                <h3 className={styles.cardTitle}>Popular Tags</h3>
                <div className={styles.tagCloud}>
                  {['#monstera','#succulents','#propagation','#indoorplants','#urbanjungle',
                    '#plantcare','#greenthumb','#houseplants','#botanica','#plantlover'].map(t => (
                    <span key={t} className={styles.tagItem}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
