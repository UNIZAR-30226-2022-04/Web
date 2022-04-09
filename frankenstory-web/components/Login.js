import { useState } from "react"
import Link from "next/link"

async function tryLogin (user,pass) {
  let url ="http://localhost:3000/api/login"

  const data = {
    "username": user,
    "password": pass
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
  
  var res = await fetch(url,options)
  var jsonRes = await res.json()

  console.log(jsonRes)
}

const Login = () => {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  //const goTo = '/' + name + '/friends'

  return (
      <form className ="m-auto justify-center p-6 bg-white align-middle">
          <h1 className="pb-3 pt-6 px-10 text-4xl text-blue-800 font-bold">Iniciar sesión</h1>
          <div>Usuario</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={name} placeholder="Usuario" onChange={(e) => setName(e.target.value)}/>
          <div>Contraseña</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={password} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
          <div className="py-2 font-bold text-blue-800"><Link  href="/register">Crear Cuenta</Link></div>
          <button className="ml-20 bg-center text-white justify-self-center bg-blue-900 rounded-md px-4 py-2" type="submit">Iniciar sesión</button>
      </form>
  )
}

export default Login