import { useState } from "react";
import execute from '/lib/prop-helpers'
import Modal from "/components/blocks/Modal";
import styles from "/styles/Projects.module.css";


export async function getServerSideProps() {
  return {
    props: await execute('/api/getProjects', { searchText: '' })
  }
}


export default function Home(props) {
  if (typeof props.ok == typeof undefined) {
    if (typeof props.error == typeof undefined) {
      return ('emptyResponse')
    }
    return (props.error)
  }
  const { ok: { projects } } = props

	const [showModal, setShowModal] = useState(false);
  
	return (
	  <div>
		  <button onClick={() => setShowModal(true)}>+ Добавить проект</button>
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
			<button className={styles.button}>Готово</button>
		  </Modal>
	  </div>
	)
  }

