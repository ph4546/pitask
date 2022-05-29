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


export async function getServerSideProps() {
	const { creator , administrator, executor } = await execute('/api/team', {})
	return {
		props: { creator: creator, administrator:administrator, executor: executor }
	}
}


export default function Team({ creator, administrator, executor }) {
	const [userType] = useState([
		{
			headerName: 'Создатель проекта',
			user: creator,
			buttonPlus: "/empty.png"
		},
		{
			headerName: 'Администратор',
			user: administrator,
			buttonPlus: '/plus.svg'
		},
		{
			headerName: 'Исполнители',
			user: executor,
			buttonPlus: '/plus.svg'
		}
	])
	
	return (
		<TopMenu> 
			<LeftMenu sTasks={stylesLeftMenu.link} sTeam={stylesLeftMenu.link_selected} sProject={stylesLeftMenu.link}>
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
				<a>
					<div className={styles.userItem__avatar}><Image src={avatar} alt="" width={70} height={70} /></div>
					<div className={styles.userItem__name}>{name}</div>
					<div className={styles.userItem__description}>{description}</div>
				</a>
			</Link>
			<div className={styles.edit}>Редактировать</div>
		</div>
	)
}