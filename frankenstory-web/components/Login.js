import { useState } from "react"
import Link from "next/Link"

const Login = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = (e)=>{
    e.preventDefault()
    console.log(name)
    console.log(password)
  }

  return (
    <div className= "p-6 h-screen w-screen flex items-center bg-blue-100">
      <form className ="m-auto justify-center p-6 bg-white align-middle" onSubmit={onSubmit}>
          <h1 className="pb-3 pt-6 px-10 text-4xl text-blue-800 font-bold">Iniciar sesión</h1>
          <div>Usuario</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" placeholder="Usuario" onChange={(e) => setName(e.target.value)}/>
          <div>Contraseña</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
          <div className="py-2 font-bold text-blue-800"><Link  href="/">Crear Cuenta</Link></div>
          <input className="ml-20 bg-center text-white justify-self-center bg-blue-900 rounded-md px-4 py-2"
          type="submit" value="Iniciar sesión"/>
      </form>
    </div>
  )
}

export default Login