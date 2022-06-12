import execute from '/lib/prop-helpers'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


export default function Logout() {
  const router = useRouter()

  useEffect(async () => {
    await execute('/api/logout', {})
    router.push('/')
  })

  return (
    <>
    </>
  )
}