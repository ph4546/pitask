import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import execute from '/lib/prop-helpers'
import styles from '/styles/Authorization.module.css'

export default function Authorization() {
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
				<button className={styles.button1} onClick={()=>checkUser()}>Войти</button>
			</div>
		</div>
  )
}

function checkUser() {
	var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
	if (email == "почта" & password == "пароль") location.href = "/projects"
	else alert("Неверный логин или пароль")
}
