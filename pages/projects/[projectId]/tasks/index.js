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
import AddButton from '/components/blocks/add-button.js'
import Modal from '/components/blocks/Modal'


export async function getServerSideProps({ query }) {
  return {
    props: await execute('/api/getTasks', { projectId: query.projectId })
  }
}


export default function Tasks(props) {
  const [showModal, setShowModal] = useState(false);
  const [switcher, setSwitcher] = useState(new Switcher(3))
  const isThreeColumnMode = useMediaQuery('(min-width: 768px)')

  // Обработать ошибки получения данных
  if (typeof props.ok == typeof undefined) {
    if (typeof props.error == typeof undefined) {
      return (<div>emptyResponse</div>)
    }
    return (<div>{props.error}</div>)
  }
  const { ok: { newTasks, inProgressTasks, completedTasks } } = props

  // Подготовить данные
  const taskColumns = [
    {
      headerName: 'Новое',
      tasks: newTasks
    },
    {
      headerName: 'В процессе',
      tasks: inProgressTasks
    },
    {
      headerName: 'Завершено',
      tasks: completedTasks
    }
  ]  

  return (
    <TopMenu>
      <LeftMenu sTasks={stylesLeftMenu.link_selected} sTeam={stylesLeftMenu.link} sProject={stylesLeftMenu.link}>
        <BackAndTitle text="МОЙ ПРОЕКТ" link='/projects' />

      <div>
				<AddButton text="Добавить задачу" onClick ={() => setShowModal(true)}/>
		  	<Modal
				onClose={() => setShowModal(false)}
				show={showModal}
		  	>	
		    <h2 className={styles.h2}>Добавление задачи</h2>
				<hr className={styles.hr}></hr>
				<p><input className = {styles.nameOfTask} type="text" id="name" placeholder="Название задачи" size={60}></input></p>
				<p><textarea className = {styles.description} type="text" id="description" placeholder="Описание задачи"></textarea></p>
				<p><label className ={styles.deadlineText}>Дедлайн</label> 
				<input className={styles.date} type="date"/> 
				<input className={styles.time} type="time"/></p>
				<button className={styles.buttonAccept} onClick={() => setShowModal(false)}>Готово</button>
		  	</Modal>
	  	</div>

        <div className={styles.content}>
          <button
            className={`${styles.content__button} ${switcher.isFirst() ? styles.content__button_disabled : null}`}
            onClick={() => { setSwitcher(switcher.goPrevious()); }}>
            <Image src='/leftArrow.svg' alt="" width={12} height={30} />
          </button>
          <div className={styles.content__columns}>
            {
              isThreeColumnMode ? (
                taskColumns.map(({ headerName, tasks }) =>
                  <TaskColumn key={headerName} headerName={headerName} tasks={tasks} />
                )
              ) : (
                <TaskColumn
                  headerName={taskColumns[switcher.currentIndex].headerName}
                  tasks={taskColumns[switcher.currentIndex].tasks}
                />
              )
            }
          </div>
          <button
            className={`${styles.content__button} ${switcher.isLast() ? styles.content__button_disabled : null}`}
            onClick={() => { setSwitcher(switcher.goNext()) }}>
            <Image src='/rightArrow.svg' alt="" width={12} height={30} />
          </button>
        </div>
      </LeftMenu>
    </TopMenu>
  )
}

function TaskColumn({ headerName, tasks }) {
  return (
    <div className={styles.taskColumn}>
      <div className={styles.taskColumn__headerName}>{headerName}</div>
      <div className={styles.taskColumn__items}>
        {tasks.map(({ id, name, deadline }) => <TaskItem key={id} id={id} name={name} deadline={deadline} />)}
      </div>
    </div>
  )
}

function TaskItem({ id, name, deadline }) {
  return (
    <Link href={`/tasks/${encodeURIComponent(id)}`}>
      <a className={styles.taskItem}>
        <div className={styles.taskItem__name}>{name}</div>
        <div className={styles.taskItem__deadline}>
          <div className={styles.taskItem__deadlineHeader}>Дедлайн:</div>
          <div className={styles.taskItem__deadlineDate}>{dayjs(deadline).format('DD-MM HH:mm')}</div>
        </div>
      </a>
    </Link>
  )
}

class Switcher {
  #currentIndex
  #maxIndex

  constructor(length) {
    if (length < 1) {
      throw new Error('`length` must be greater than or equal to 1')
    }
    this.#currentIndex = 0
    this.#maxIndex = length - 1
  }

  goPrevious() {
    const newCurrentIndex = this.#currentIndex - 1
    if (newCurrentIndex < 0) {
      return this.#cloneSwitcher()
    }

    return this.#cloneSwitcherWith(newCurrentIndex)
  }

  goNext() {
    const newCurrentIndex = this.#currentIndex + 1
    if (newCurrentIndex > this.#maxIndex) {
      return this.#cloneSwitcher()
    }

    return this.#cloneSwitcherWith(newCurrentIndex)
  }

  isFirst() {
    return this.#currentIndex == 0
  }

  isLast() {
    return this.#currentIndex == this.#maxIndex
  }

  get currentIndex() {
    return this.#currentIndex
  }

  #cloneSwitcherWith(currentIndex) {
    var newSwitcher = new Switcher()
    newSwitcher.#currentIndex = currentIndex
    newSwitcher.#maxIndex = this.#maxIndex
    return newSwitcher
  }

  #cloneSwitcher() {
    var newSwitcher = new Switcher()
    newSwitcher.#currentIndex = this.#currentIndex
    newSwitcher.#maxIndex = this.#maxIndex
    return newSwitcher
  }
}