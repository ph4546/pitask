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


export async function getServerSideProps() {
	const { newTasks, inProgressTasks, completedTasks } = await execute('/api/tasks', {})
	return {
		props: { newTasks: newTasks, inProgressTasks: inProgressTasks, completedTasks: completedTasks }
	}
}


export default function Tasks({ newTasks, inProgressTasks, completedTasks }) {
	const [taskColumns] = useState([
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
	])
	const [switcher, setSwitcher] = useState(new Switcher(taskColumns.length))
	const isThreeColumnMode = useMediaQuery('(min-width: 768px)')

	return (
		<TopMenu>
			<LeftMenu sTasks={stylesLeftMenu.link_selected} sTeam={stylesLeftMenu.link} sProject={stylesLeftMenu.link}>
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