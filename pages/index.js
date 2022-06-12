import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import execute from '/lib/prop-helpers'
import styles from '/styles/Authorization.module.css'
import { useRouter } from 'next/router'
import { initSsr } from '/lib/prop-helpers'
import { hashPassword } from '/lib/session'


export const getServerSideProps = initSsr(async ({ req }) => {
  if (req.session.user != undefined) {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
})


export default function Authorization() {
  const router = useRouter()

  return (
		<div className={styles.obj}>
			<div className={styles.logo}>
				{
					
					<div className={styles.logo_a}><Image src='/logo.svg' width={207} height={42}/></div>
				}
			</div>
			<div className={styles.input}>
				<input  type="text"  placeholder="Почта" className={styles.email} id={"email"}/>
				<input  type="password"  placeholder="Пароль" className={styles.password1} id={"password"}/>
				<button className={styles.button1} onClick={async () => await login(router)}>Войти</button>
			</div>
		</div>
  )
}

async function login(router) {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordHash = await hashPassword(password)
  const results = await execute('/api/login', { email, password: passwordHash })

  // Обработать ошибки получения данных
  if (typeof results.error != typeof undefined) {
    if (results.error == 'emailOrPasswordIsIncorrect') {
      alert('Неверный емейл или пароль')
      return
    }
  }

  router.push('/projects')
}
