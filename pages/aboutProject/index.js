import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from '/lib/react-helpers'
import execute from '/lib/prop-helpers'
import styles from '/styles/Tasks.module.css'
import stylesLeftMenu from '/styles/LeftMenu.module.css'
const dayjs = require('dayjs')
import TopMenu from '/components/layout/topMenu.js'
import LeftMenu from '/components/layout/leftMenu.js'
import BackAndTitle from '/components/blocks/back-and-title.js'


export default function AboutProject() {
	
	return (
		<TopMenu>
			<LeftMenu sTasks={stylesLeftMenu.link} sTeam={stylesLeftMenu.link} sProject={stylesLeftMenu.link_selected}>
				<BackAndTitle text="МОЙ ПРОЕКТ" link='/projects'/>
				<div className={styles.content}>
				</div>
			</LeftMenu>
		</TopMenu>
	)
}