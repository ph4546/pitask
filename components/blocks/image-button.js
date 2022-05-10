import Image from 'next/image'
import styles from '/styles/ImageButton.module.css'

export default function ImageButton({ src, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <Image src={src} width={15} height={15} />
    </button>
  )
}