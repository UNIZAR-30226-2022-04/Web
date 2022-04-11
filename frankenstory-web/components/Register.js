import { useState } from "react"
import Link from "next/link"

const tryRegister = async (user,pass,mail) => {

  const data = {
    username:user,
    password:pass,
    email:mail
  }
  const url ="http://localhost:3000/api/register"
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

const Register = () => {

  const onSubmit = (e) => {
    
    e.preventDefault()
    if(name == ""){
      alert("Introduce un nombre de usuario")
    }else if(mail == ""){
      alert("Introduce un correo electronico")
    }else if(password == ""){
      alert("Introduce una contraseña")
    }else if(password != passwordR){
      alert("Las contraseñas introducidas no coinciden")
    }else{
      tryRegister(name,password).then((res) =>{
        if(res.result == "success"){
          window.location = `http://localhost:3000/profile/stats`
        }else{
          if(res.reason == "user_already_registered"){
            alert("El nombre de usuario introducido ya esta en uso")
          }else if(res.reason == "email_already_registered"){
            alert("El correo introducido ya esta en uso")
          }else{
            alert("Error desconocido")
          }
        }
      })
    }
    setName("")
    setMail("")
    setPassword("")
    setPasswordR("")
  }

  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordR, setPasswordR] = useState("")


  return (
      <form className ="m-auto justify-center p-6 bg-white align-middle" onSubmit={onSubmit}>
          <h1 className="pb-3 pt-6 px-10 text-4xl text-blue-800 font-bold">Crear cuenta</h1>
          <div>Nombre de usuario</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={name} placeholder="Nombre de usuario" onChange={(e) => setName(e.target.value)}/>
          <div>Email</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={mail} placeholder="Email" onChange={(e) => setMail(e.target.value)}/>
          <div>Contraseña</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={password} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
          <div>Repita la contraseña</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={passwordR} placeholder="Repita la contraseña" onChange={(e) => setPasswordR(e.target.value)}/>
          <div className="py-2 font-bold text-blue-800"><Link  href="/login">Iniciar sesión</Link></div>
          <button className="ml-20 bg-center text-white justify-self-center bg-blue-900 rounded-md px-4 py-2" type="submit">Crear cuenta</button>
      </form>
  )
}

export default Register