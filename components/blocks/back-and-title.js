import Image from 'next/image'
import Link from 'next/link'
import styles from '/styles/BackAndTitle.module.css'

export default function BackAndTitle({text, link}) {
    return(
		<div className={styles.component}>
			<div className={styles.button}>
				<Link href={link}>
					<a href="">
							<Image src="/arrowBack.svg" alt="" width={21} height={21}/>
					</a>	
				</Link>
			</div>
			<div className={styles.text}>{text}</div>
		</div>
    )
}