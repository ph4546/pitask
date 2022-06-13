import { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import execute from '/lib/prop-helpers'
import Modal from "/components/blocks/Modal";
import styles from "/styles/Projects.module.css";
import TopMenu from '/components/layout/topMenu.js'
import LeftFilters from '/components/layout/leftFilters.js'
import AddButton from '/components/blocks/add-button.js'
import SearchBox from '/components/blocks/searchbox.js'
import { initSsr } from '/lib/prop-helpers'
import { useRouter } from 'next/router'


export const getServerSideProps = initSsr(async ({ req }) => {
  return {
    props: await execute('/api/getProjects', { searchText: '' }, req.headers.cookie)
  }
})


export default function Projects(props) {
  const router = useRouter()
	const [showModal, setShowModal] = useState(false);
	
  // Обработать ошибки получения данных
  if (typeof props.ok == typeof undefined) {
    if (typeof props.error == typeof undefined) {
      return (<div>emptyResponse</div>)
    }
    return (<div>{props.error}</div>)
  }
	const { ok: { projects } } = props
  
	return (
	  <TopMenu>
		  <LeftFilters>
			  <label className={styles.title}>Список проектов</label>
			  <AddButton text="Добавить проект" onClick ={() => setShowModal(true)}/>
			  <Modal
				onClose={() => setShowModal(false)}
				show={showModal}
			  >	
				<h2 className={styles.h2}>Добавление проекта</h2>
				<hr className={styles.hr}></hr>
				<p><input className = {styles.nameOfProject} type="text" id="name" placeholder="Название проекта" size={60}></input></p>
				<p><textarea className = {styles.description} type="text" id="description" placeholder="Описание проекта"></textarea></p>
				<div className = {styles.addText}>Добавление участников</div>
				<p><input className = {styles.mail} type="text" id="mail" placeholder="Почта"></input></p>
				<button className={styles.button} onClick = {async () => onClickFinishModal(router, setShowModal)}>Готово</button>
			  </Modal>
			  <div className={styles.content}>
				{projects.map(({ projectId, projectName }) => <ProjectItem key={projectId} projectId={projectId} projectName={projectName} />)}
			  </div>
		  </LeftFilters>
	  </TopMenu>
	)
  }
  
  function ProjectItem({ projectId, projectName }) {
	return (
		<div className={styles.projectItem}>
			<Link href={`/projects/${projectId}`}>
				<a>
					<div>
						<div className={styles.projectItem__name}>{projectName}</div>
					</div>
				</a>
			</Link>
		</div>
	)
}

async function onClickFinishModal(router, setShowModal) {
  const projectName = document.getElementById('name').value
  const projectDescription = document.getElementById('description').value
  const results = await execute('/api/addProject', { projectName, projectDescription })

  // Обработать ошибки получения данных
  if (typeof results.error != typeof undefined) {
    if (results.error == 'userNotLoggedIn') {
      router.push('/')
      return
    }
  }

  setShowModal(false)
  router.reload()
}
