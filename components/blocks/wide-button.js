import styles from '/styles/WideButton.module.css'

export default function WideButton({ text, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>{text}</button>
  )
}