import { executeData } from '/lib/api-helpers.js'

// every task is [{id, name, deadline}]
export default function handler(request, response) {
	executeData(request, response, () => {
		return {
			newTasks: [
				{
					id: 1,
					name: 'Название задачи',
					deadline: new Date('2022-01-17T20:00:00')
				},
				{
					id: 2,
					name: 'Название задачи',
					deadline: new Date('2022-01-17T16:00:00')
				},
				{
					id: 3,
					name: 'Название задачи',
					deadline: new Date('2022-01-17T16:00:00')
				}
			],
			inProgressTasks: [
				{
					id: 4,
					name: 'Название задачи',
					deadline: new Date('2022-01-17T18:00:00')
				},
				{
					id: 5,
					name: 'Название задачи',
					deadline: new Date('2022-01-17T18:00:00')
				}
			],
			completedTasks: [
				{
					id: 6,
					name: 'Название задачи',
					deadline: new Date('2022-01-17T20:00:00')
				},
				{
					id: 7,
					name: 'Название задачи',
					deadline: new Date('2022-01-17T20:00:00')
				}
			]
		}
	})
}
