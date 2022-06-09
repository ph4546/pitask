import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from '/lib/react-helpers'
import execute from '/lib/prop-helpers'
import stylesLeftMenu from '/styles/LeftMenu.module.css'
import TextArea from '/components/blocks/violet-textbox'
import styles from '/styles/TaskPage.module.css'
const dayjs = require('dayjs')
import TopMenu from '/components/layout/topMenu.js'
import LeftMenu from '/components/layout/leftMenu.js'
import BackAndTitle from '/components/blocks/back-and-title.js'
import {useRouter} from 'next/router'


export async function getServerSideProps({ query }) {
  return {
    props: await execute('/api/getProjectDescription', { projectId: query.projectId })
  }
}


export default function AboutProject(/*props*/) {
  // Обработать ошибки получения данных
//	if (typeof props.ok == typeof undefined) {
  //  if (typeof props.error == typeof undefined) {
    //  return (<div>emptyResponse</div>)
    //}
    //return (<div>{props.error}</div>)
  //}
  //const { ok: { description } } = props

  const projectId = useRouter().query.projectId

	return (
		<>
		<TopMenu>
			<LeftMenu sTasks={stylesLeftMenu.link} sTeam={stylesLeftMenu.link} sProject={stylesLeftMenu.link_selected}>
				<BackAndTitle text="НАЗВАНИЕ ЗАДАЧИ" link={`/projects/${projectId}/tasks`} />
				<div className={styles.content}>
				</div>
			</LeftMenu>
		</TopMenu>
		<div className = {styles.TextBox1}>
			<TextArea placeholder='Описание задачи...'></TextArea>
		</div>

		<div className = {styles.TextBox2}>
			<TextArea placeholder='Результат...'></TextArea>  
		</div>

		<div>
			<select className = {styles.CBswitch}>
				<option value="New">Новая</option>
				<option value="InProgress">В разработке</option>
				<option value="Complete">Завершено</option>
			</select>
		</div>
		</>
	)
}