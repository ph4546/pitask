import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from '/lib/react-helpers'
import execute from '/lib/prop-helpers'
import styles from '/styles/Team.module.css'
import stylesLeftMenu from '/styles/LeftMenu.module.css'
import TopMenu from '/components/layout/topMenu.js'
import LeftMenu from '/components/layout/leftMenu.js'
import LeftFilters from '/components/layout/leftFilters.js'
import BackAndTitle from '/components/blocks/back-and-title.js'
import AddButton from '/components/blocks/add-button.js'


export async function getServerSideProps({ query }) {
  return {
    props: await execute('/api/getTeam', { projectId: query.projectId })
  }
}


export default function Team(props) {
  // Обработать ошибки получения данных
  if (typeof props.ok == typeof undefined) {
    if (typeof props.error == typeof undefined) {
      return (<div>emptyResponse</div>)
    }
    return (<div>{props.error}</div>)
  }
  const { ok: { owner, admin, executors } } = props

  // Подготовить данные
  const userType = [
    {
      headerName: 'Создатель проекта',
      user: owner,
      buttonPlus: "/empty.png"
    },
    {
      headerName: 'Администратор',
      user: admin,
      buttonPlus: '/plus.svg'
    },
    {
      headerName: 'Исполнители',
      user: executors,
      buttonPlus: '/plus.svg'
    }
  ]
	
	return (
		<TopMenu> 
			<LeftMenu sTasks={stylesLeftMenu.link} sTeam={stylesLeftMenu.link_selected} sProject={stylesLeftMenu.link}>
				<BackAndTitle text="МОЙ ПРОЕКТ" link='/projects'/>
				<AddButton text="Добавить участника"/>
				<div className={styles.content}>
					<div className={styles.content__types}>
						{userType.map(({ id, headerName, user, buttonPlus }) => <UserType key={id} id={id} headerName={headerName} user={user} buttonPlus={buttonPlus} />)}
					</div>
				</div>
			</LeftMenu>
		</TopMenu>
	)
}

function UserType({ headerName, user, buttonPlus }) {
	return (
		<div className={styles.UserType}>
			<div className={styles.userType__headerName}>{headerName}</div>
			<div className={styles.userType__buttonPlus}><Image src={buttonPlus} alt="" width={21} height={21} /></div>
			<div className={styles.userType__items}>
				{user.map(({ id, name, description, avatar }) => <UserItem key={id} id={id} name={name} description={description} avatar={avatar} />)}
			</div>
		</div>
	)
}

function UserItem({ id, name, description, avatar }) {
	return (
		<div className={styles.userItem}>
			<Link href={`/team/${encodeURIComponent(id)}`}>
				<a href="">
					<div className={styles.userItem__avatar}><Image src={avatar} alt="" width={70} height={70} /></div>
					<div className={styles.userItem__name}>{name}</div>
					<div className={styles.userItem__description}>{description}</div>
				</a>
			</Link>
			<div className={styles.edit}>Редактировать</div>
		</div>
	)
}