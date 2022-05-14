import { useState, useEffect } from "react"
import {useRouter} from 'next/router'
import Link from "next/link"
import Image from 'next/image'

import Lottie from 'react-lottie'
import registerLottie from '/public/lottie/register.json'

export default function register () {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordR, setPasswordR] = useState("")

  const options = {
    loop: true,
    autoplay: true,
    animationData: registerLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <div className="background h-screen w-screen flex items-center">
      <Image src={'/frankenstory.png'} height={200} width={800} />
      <div className="flex flex-row">
        <Lottie 
            options = {options}
            height = {400}
            width = {400}
          />
        <form className ="p-6 align-middle space-y-2 flex flex-col items-center justify-center" onSubmit={(e) => (onSubmit(e, name, mail, password, passwordR, router))}>
            <h1 className="pb-3 pt-6 px-10 text-3xl justify-start text-white txtShadw font-arial-b">REGISTER</h1>
            <div className="flex flex-col">
              <div className="commonSubtitle">Nombre de usuario</div>
              <input className="w-96 p-2 bg-white text-blue-400 rounded-lg" type="text" value={name} placeholder="Nombre de usuario" onChange={(e) => setName(e.target.value)}/>
              <div className="commonSubtitle">Email</div>
              <input className="p-2 w-full bg-white text-blue-400 rounded-lg" type="email" value={mail} placeholder="Email" onChange={(e) => setMail(e.target.value)}/>
              <div className="commonSubtitle">Contraseña</div>
              <input className="p-2 w-full bg-white text-blue-400 rounded-lg" type="password" value={password} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
              <div className="commonSubtitle">Repita la contraseña</div>
              <input className="p-2 w-full bg-white text-blue-400 rounded-lg" type="password" value={passwordR} placeholder="Repita la contraseña" onChange={(e) => setPasswordR(e.target.value)}/>
              <button className="commonButton bg-verde_top mt-2" type="submit">Crear cuenta</button>
            </div>
        </form>
      </div>
      <button className="absolute bottom-0 left-0 m-10 commonButton bg-verde_top " > {'<-'} Iniciar Sesión</button>
    </div>

  )
}

const tryRegister = async (user, pass, mail) => {

  const info = {
    username: user,
    password: pass,
    email: mail
  }

  const url ="http://localhost:3000/api/general/register"
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    },
    body: JSON.stringify(info)
  }
  const res = await fetch(url,options)
  const data = res.json()
  return data
}

async function onSubmit (e, name, mail, password, passwordR, router) {
    
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
    const res = await tryRegister(name, password, mail)

    if(res.result == "success"){
      window.location = `http://localhost:3000/profile`
    
    }else{
      console.log(res)
      if(res.reason == "user_already_registered"){
        alert("El nombre de usuario introducido ya esta en uso")

      }else if(res.reason == "email_already_registered"){      
        alert("El correo introducido ya esta en uso")
      
      }else{
        alert("Error desconocido")
      }
    }
    
  }
}

function inputGroup () {

}