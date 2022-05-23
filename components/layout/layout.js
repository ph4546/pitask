import React from 'react';
import styles from '/styles/Menu.module.css'



const Layout =({children}) =>{
    return(
		<>
        <div>
            <div className={styles.line1}></div>
			<div className={styles.line2}></div>
			<div className={styles.topMenu}>
				<div className={styles.logo}>
					<a href=""><img src="logo.svg"/></a>
				</div>
				<img src="notifications.svg" id={styles["notification"]}/>
				<img src="profile.svg" id={styles["profile"]}/>
			</div>
			<div className={styles.leftMenu}>
				<div className={styles.taskList}>
					<a href="" className={styles.link} id={styles["link1"]}><img src="taskList.svg" id={styles["icon1"]}/><label className={styles.menuItem}>Список задач</label></a>
				</div>
				<div className={styles.team}>
					<a href="" className={styles.link} id={styles["link2"]}><img src="team.svg" id={styles["icon2"]}/> <label className={styles.menuItem}>Команда</label></a>
				</div>
				<div className={styles.about}>
					<a href="" className={styles.link} id={styles["link3"]}><img src="aboutProject.svg" id={styles["icon3"]}/> <label className={styles.menuItem}>О проекте</label></a>
				</div>
			</div>
        </div>
        <main className={styles.main}>{children}</main>
        </>
    )
}

export default Layout;