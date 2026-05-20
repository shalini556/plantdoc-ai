import { useEffect } from 'react'
import styles from './Toast.module.css'

export default function Toast({ message, onHide }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onHide, 3000)
    return () => clearTimeout(t)
  }, [message, onHide])

  if (!message) return null

  return (
    <div className={styles.toast}>{message}</div>
  )
}
