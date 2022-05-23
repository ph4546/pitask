import { useRouter } from 'next/router'

export default function Team() {
	const router = useRouter()
	const { id } = router.query

	return <p>Team: {id}</p>
}