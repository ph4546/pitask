import React from 'react';
import { useState } from "react";
import styles from '/styles/LeftMenu.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'


const LeftMenu =({sTasks, sTeam, sProject, children}) =>{
  const projectId = useRouter().query.projectId

	const [styleTasks] = useState(sTasks);
	const [styleTeam] = useState(sTeam);
	const [styleProject] = useState(sProject);
	
    return(
        <div>
			<div className={styles.leftMenu}>
				<div className={styles.line2}></div>
				<div className={styles.menuItem}>
					<Link href={`/projects/${projectId}/tasks`}>
						<a href="" className={styleTasks}>
							<div className={styles.icon}><Image src="/taskList.svg" alt="" width={30} height={30}/></div>
							<label className={styles.label}>Список задач</label>
						</a>
					</Link>
				</div>
				<div className={styles.menuItem}>
					<Link href={`/projects/${projectId}/team`}>
						<a href="" className={styleTeam}>
							<div className={styles.icon}><Image src="/team.svg" alt="" width={30} height={30}/></div>
							<label className={styles.label}>Команда</label>
						</a>
					</Link>
				</div>
				<div className={styles.menuItem}>
					<Link href={`/projects/${projectId}/about`}>
						<a href="" className={styleProject}>
							<div className={styles.icon}><Image src="/aboutProject.svg" alt="" width={30} height={30}/></div>
							<label className={styles.label}>О проекте</label>
						</a>
					</Link>
				</div>
			</div>
        <main className={styles.main}>{children}</main>
		</div>
    )
}

export default LeftMenu;