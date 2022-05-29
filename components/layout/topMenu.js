import React from 'react';
import styles from '/styles/TopMenu.module.css'
import Link from 'next/link'
import Image from 'next/image'



const TopMenu =({children}) =>{
    return(
        <div>
            <div className={styles.line1}></div>
			<div className={styles.topMenu}>
				<div className={styles.logo}>
					<Link href={``}><a><Image src="/logo.svg" width={230} height={22}/></a></Link>
				</div>
				<div id={styles["notification"]}><Image src="/notifications.svg" width={34} height={34}/></div>
				<div id={styles["profile"]}><Image src="/profile.svg" width={30} height={30}/></div>
			</div>
        <main className={styles.main}>{children}</main>
		</div>
    )
}

export default TopMenu;