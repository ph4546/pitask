import { executeData } from '/lib/api-helpers.js'

// every task is [{id, name, deadline}]
export default function handler(request, response) {
	executeData(request, response, () => {
		return {
			creator: [
				{
					id: 1,
					name: 'Создатель',
					description: 'Описание создателя проекта',
					avatar: '/profilePurple.svg'
				}
			],
			administrator: [
				{
					id: 1,
					name: 'Администратор',
					description: 'Описание администратора',
					avatar: '/profilePurple.svg'
				}
			],
			executor: [
				{
					id: 2,
					name: 'Исполнитель 1',
					description: 'Описание исполнителя 1 Описание исполнителя 1 Описание исполнителя 1 Описание исполнителя 1 Описание исполнителя 1 Описание исполнителя 1',
					avatar: '/profilePurple.svg'
				},
				{
					id: 3,
					name: 'Исполнитель 2',
					description: 'Описание исполнителя 2',
					avatar: '/profilePurple.svg'
				}
			]
		}
	})
}
