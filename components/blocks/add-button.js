import Image from 'next/image'
import styles from '/styles/AddButton.module.css'

export default function AddButton({text, onClick}) {
    return(
		<button className={styles.button} onClick={onClick}>
				<Image src="/plus.svg" alt="" width={21} height={21}/>
				<label className={styles.text}>{text}</label>
		</button>
    )
}