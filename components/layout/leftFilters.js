import React from 'react';
import styles from '/styles/LeftFilters.module.css'
import Link from 'next/link'
import Image from 'next/image'



const LeftFilters =({children}) =>{
    return(
        <div>
			<div className={styles.line2}></div>
			<div className={styles.leftMenu}>
				<label>Фильтр</label>
				<div className={styles.filter}>
					<input type="checkbox" name="filter" value="Активные" id={styles["checkbox1"]}/>
					<label for="checkbox1">Активные</label>
				</div>
				<div className={styles.filter}>
					<input type="checkbox" name="filter" value="Завершенные"/>
					<label>Завершенные</label>
				</div>
				<div className={styles.filter}>
					<input type="checkbox" name="filter" value="Избранные"/>
					<label>Избранные</label>
				</div>
			</div>
        <main className={styles.main}>{children}</main>
		</div>
    )
}

export default LeftFilters;