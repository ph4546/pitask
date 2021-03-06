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
import Modal from '/components/blocks/Modal'
import { initSsr } from '/lib/prop-helpers'
import { useRouter } from 'next/router'


export const getServerSideProps = initSsr(async ({ query, req }) => {
  return {
    props: await execute('/api/getTeam', { projectId: query.projectId }, req.headers.cookie)
  }
})


export default function Team(props) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  
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
      user: owner
    },
    {
      headerName: 'Администратор',
      user: admin
    },
    {
      headerName: 'Исполнители',
      user: executors
    }
  ]
	
	return (
		<TopMenu> 
			<LeftMenu sTasks={stylesLeftMenu.link} sTeam={stylesLeftMenu.link_selected} sProject={stylesLeftMenu.link}>
				<BackAndTitle text="МОЙ ПРОЕКТ" link='/projects'/>
				<AddButton text="Добавить участника" onClick ={() => setShowModal(true)}/>
				<Modal
				onClose={() => setShowModal(false)}
				show={showModal}
				>	
					<h2 className={styles.h2}>Добавление участника</h2>
					<hr className={styles.hr}></hr>
					<p><input className = {styles.mail} type="text" id="email" placeholder="Почта" size={60}></input></p>
					<input className={styles.checkbox} type="checkbox" id="addedUserIsAdmin" name="admin"/><label>Назначить администратором</label> 
					<button className={styles.buttonAccept} onClick={async () => onClickFinishModal(router, setShowModal)}>Готово</button>
				</Modal>
				<div className={styles.content}>
					<div className={styles.content__types}>
						{userType.map(({ id, headerName, user }) => <UserType key={id} id={id} headerName={headerName} user={user} />)}
					</div>
				</div>
			</LeftMenu>
		</TopMenu>
	)
}

function UserType({ headerName, user }) {
	return (
		<div className={styles.UserType}>
			<div className={styles.userType__headerName}>{headerName}</div>
			<div className={styles.userType__items}>
				{user.map(({ id, name, description, avatar }) => <UserItem key={id} id={id} name={name} description={description} avatar={avatar} />)}
			</div>
		</div>
	)
}

function UserItem({ id, name, description, avatar }) {
  const router = useRouter()
	return (
		<div className={styles.userItem}>
			<div>
				<div className={styles.userItem__avatar}><Image src={avatar} alt="" width={70} height={70} /></div>
				<div className={styles.userItem__name}>{name}</div>
				<div className={styles.userItem__description}>{description}</div>
			</div>
			<button className={styles.delete} onClick={async () => onClickDeleteMember(router, id)}>Удалить из команды</button>
		</div>
	)
}

async function onClickFinishModal(router, setShowModal) {
  const projectId = router.query.projectId
  const email = document.getElementById('email').value
  const addedUserIsAdmin = document.getElementById('addedUserIsAdmin').checked
  const results = await execute('/api/addMember', { projectId, email, addedUserIsAdmin })

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

  setShowModal(false)
  router.reload()
}

async function onClickDeleteMember(router, deletedUserId) {
  const projectId = router.query.projectId
  const results = await execute('/api/deleteMember', { projectId, deletedUserId })

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