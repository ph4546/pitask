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
import { initSsr } from '/lib/prop-helpers'


export const getServerSideProps = initSsr(async ({ query, req }) => {
  return {
    props: await execute('/api/getProjectDescription', { projectId: query.projectId }, req.headers.cookie)
  }
})


export default function AboutProject(props) {
  const router = useRouter()

  // Обработать ошибки получения данных
	if (typeof props.ok == typeof undefined) {
    if (typeof props.error == typeof undefined) {
      return (<div>emptyResponse</div>)
    }
    return (<div>{props.error}</div>)
  }
  const { ok: { description } } = props

  const projectId = router.query.projectId

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
			<TextArea placeholder='Описание задачи...' onChange={(e) => {}}>{description}</TextArea>
		</div>

		<div className = {styles.TextBox2}>
			<TextArea placeholder='Результат...' onChange={(e) => {}}></TextArea>  
		</div>

		<div>
			<select className={styles.CBswitch} onChange={async (e) => onClickMarkTaskSomething(router, e.target.value)}>
				<option value='/api/markTaskNew'>Новая</option>
				<option value='/api/markTaskInProgress'>В разработке</option>
				<option value='/api/markTaskCompleted'>Завершено</option>
			</select>
		</div>
		</>
	)
}

async function onClickMarkTaskSomething(router, endPoint) {
  const taskId = router.query.taskId
  const results = await execute(endPoint, { taskId })

  // Обработать ошибки получения данных
  if (typeof results.error != typeof undefined) {
    if (results.error == 'userNotLoggedIn') {
      router.push('/')
      return
    } else {
      alert(results.error)
      return
    }
  }

  router.reload()
}