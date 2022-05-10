import ImageButton from '/components/blocks/image-button'
import WideButton from '/components/blocks/wide-button'
import styles from '/styles/PopUp.module.css'

// `onFinish` and `onClose` can be undefined - this will hide the corresponding buttons.
export default function PopUp({ headerName, onFinish, onClose, children }) {
  return (
    <div className={styles.popup}>
      <div className={styles.popup__headerName}>{headerName}</div>
      {
        onClose != undefined && <div className={styles.popup__closeButton}>
          <ImageButton src='/close.svg' onClick={onClose} />
        </div>
      }
      <div className={styles.popup__line}></div>
      <div className={styles.popup__content}>{children}</div>
      <div className={styles.popup__footer}>
        {onFinish != undefined && <WideButton text='Готово' onClick={onFinish} />}
      </div>
    </div>
  )
}