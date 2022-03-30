import styles from "./Login.module.css"

import Link from "next/Link"

const Login = () => {
  return (
    <div class= "p-6 h-screen w-screen flex items-center bg-blue-100">
      <form class ="m-auto justify-center p-6 bg-white align-middle">
          <h1 class="pb-3 pt-6 px-10 text-4xl text-blue-800 font-bold">Iniciar sesión</h1>
          <div>Usuario</div>
          <input class="p-2 w-full bg-blue-100 text-blue-400" type="text" placeholder="Usuario" /*onChange={(e) => setText(e.target.value)}*//>
          <div>Contraseña</div>
          <input class="p-2 w-full bg-blue-100 text-blue-400" type="text" placeholder="Usuario" /*onChange={(e) => setText(e.target.value)}*//>
          <div className = {styles.link}><Link  href="/">Crear Cuenta</Link></div>
          <input class="m-auto" type="submit" value="Iniciar sesión"/>
      </form>
    </div>
  )
}

export default Login