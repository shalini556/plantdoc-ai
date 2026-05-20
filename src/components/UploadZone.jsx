import { useRef, useCallback } from 'react'
import styles from './UploadZone.module.css'

export default function UploadZone({ imageSrc, onImageLoad }) {
  const inputRef = useRef(null)

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => onImageLoad(e.target.result)
    reader.readAsDataURL(file)
  }, [onImageLoad])

  const handleDragOver = (e) => { e.preventDefault() }
  const handleDrop = (e) => {
    e.preventDefault()
    processFile(e.dataTransfer.files[0])
  }

  return (
    <div
      className={`${styles.zone} ${imageSrc ? styles.hasImage : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      aria-label="Upload plant photo"
    >
      {imageSrc ? (
        <img src={imageSrc} alt="Plant preview" className={styles.preview} />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.icon}><i className="ti ti-camera" aria-hidden="true" /></div>
          <div className={styles.title}>Upload your plant photo</div>
          <div className={styles.sub}>Click to browse or drag & drop</div>
          <div className={styles.hint}>JPG, PNG, WEBP supported</div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => processFile(e.target.files[0])}
      />
    </div>
  )
}
