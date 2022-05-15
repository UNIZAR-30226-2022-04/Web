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

  const router = useRouter()

  const options = {
    loop: true,
    autoplay: true,
    animationData: registerLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <div className="background h-screen w-screen flex items-center justify-center">
      <Image src={'/frankenstory.png'} height={150} width={600} />
      <div className="flex flex-row items-center justify-center">
        <Lottie 
            options = {options}
            height = {400}
            width = {400}
          />
        <form className ="flex flex-col items-center justify-center" onSubmit={(e) => (onSubmit(e, name, mail, password, passwordR, router))}>
            <h1 className="commonTitle font-arial-b">REGISTER</h1>
            <div className="flex flex-col w-96 space-y-2">
              <div>
                <div className="commonSubtitle">Nombre de usuario</div>
                <input className="w-full p-2 bg-white rounded-lg" type="text" value={name} placeholder="Nombre de usuario" onChange={(e) => setName(e.target.value)}/>
              </div>
              <div>
                <div className="commonSubtitle">Email</div>
                <input className="w-full p-2 bg-white rounded-lg" type="email" value={mail} placeholder="Email" onChange={(e) => setMail(e.target.value)}/>
              </div>
              <div>
                <div className="commonSubtitle">Contraseña</div>
                <input className="w-full p-2 bg-white rounded-lg" type="password" value={password} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>    
              </div>
              <div>
                <div className="commonSubtitle">Repita la contraseña</div>
                <input className="w-full p-2 bg-white rounded-lg" type="password" value={passwordR} placeholder="Repita la contraseña" onChange={(e) => setPasswordR(e.target.value)}/>
              </div>
              <button className="commonButton bg-verde_top mt-2" type="submit">Crear cuenta</button>
            </div>
        </form>
      </div>
      <button className="absolute bottom-0 left-0 m-10 commonButton bg-verde_top " onClick={() => (router.push("/login"))} > {'<-'} Iniciar Sesión</button>
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