import styles from "./Login.module.css"

import Link from "next/Link"

const Login = () => {
  return (
    <div className={styles.background}>
    <form className = {styles.form}>
        <h1 className = {styles.title}>Iniciar sesión</h1>
        <div className = {styles.label}>Usuario</div>
        <input className = {styles.textInput} type="text" placeholder="Usuario" /*onChange={(e) => setText(e.target.value)}*//>
        <div className = {styles.label}>Contraseña</div>
        <input className = {styles.textInput} type="text" placeholder="Usuario" /*onChange={(e) => setText(e.target.value)}*//>
        <div className = {styles.link}><Link  href="/">Crear Cuenta</Link></div>
        <input className = {styles.submitInput} type="submit" value="Iniciar sesión"/>
    </form>
    </div>
  )
}

export default Login