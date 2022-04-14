import { useState } from "react"
import Link from "next/link"
import { useLogin } from "contexts/LoginContext"
import Router from 'next/router'

const tryLogin = async (user,pass) => {

  const data = {
    username:user,
    password:pass
  }
  const url ="http://localhost:3000/api/login"
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    },
    body: JSON.stringify(data)
  }
  var res = await fetch(url,options)
  return res.json()
}

const Login = () => {

  const {ctxLogged, setctxUsername, setctxPassword, setctxTime, setctxLogged} = useLogin();

  if (ctxLogged){
    Router.push("http://localhost:3000/profile/stats")
  }

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = (e) => {
    
    e.preventDefault()
    if(name == ""){
      alert("Introduce un nombre de usuario")
    }else if(password == ""){
      alert("Introduce una contraseña")
    }else{
      tryLogin(name, password).then((res) =>{
        if(res.result == "success"){
          setctxUsername(name)
          setctxPassword(password)
          setctxLogged(true)          
        }else{
          if(res.reason == "user_not_found"){
            alert("Usuario desconocido")
          }else if(res.reason == "wrong_password"){
            alert("Contraseña incorrecta")
          }else{
            alert("Error desconocido")
          }
        }
      })
    }
    setName("")
    setPassword("")
  }

  
  return (
      <form className ="m-auto justify-center p-6 bg-white align-middle" onSubmit={onSubmit}>
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