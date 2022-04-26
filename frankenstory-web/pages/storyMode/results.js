import Layout from 'components/Layout'
import FriendStats from 'components/Statistics'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Image from 'next/image'

export default function Stats() { 
  const router = useRouter()
  const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api

  const [windowUser, setWindowUser] = useState({}) 

  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){
      const username = localStorage.getItem("username")
      const password = localStorage.getItem("password")
      setWindowUser({username: username, password: password})
      console.log("SACO DATOS")
    }else{
      console.log("VOY A LOGIN")
      router.push("/")
    }
  }, [])
     
  // Hace fetch de la api
  useEffect(() => {
    // Función que llama a la api
    if(windowUser.username == undefined){
      console.log("no permito sacar datos")
      return
    }
    
    const getData = async () => {
      // Opciones para llamar a la api
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(windowUser) 
      }
    
      // Llamada a la api
      const res = await fetch('http://localhost:3000/api/home', options)
      const data = await res.json()

      console.log(data)

      // Si no ha ido bien o no estoy logeado volvemos a /
      if(data.result === "error"){
        router.push("/")
        return
      }

      // Llama al hook que almacena la información del usuario
      setMyuser(data)
    }
    getData()
  }, [windowUser])

  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!myuser){
    return <div className='background'>loading...</div> 
  }
  
  // Renderizamos la página
  const layoutInfo = {
    username: windowUser.username,
    stars:    myuser.stars,
    coins:    myuser.coins,
    image_ID: myuser.picture
  } 

  return (
    <Layout data={layoutInfo}>
        
        <div className='centered'>
            <div className="commonTitle mt-2">Resultados</div>
        </div>
        <div className="centered">
            <div className="grid grid-cols-2">
                <div>
                    <Image src="/icons/star.png" width={100} height={100}/>
                </div>
                <div>
                    <div className="text-centered">{windowUser.username}</div>
                    <div className="inline-grid grid-cols-3">
                        <Image src="/profPic/icon0.png" width={38} height={38}/>
                        <div className="text-2xl">+500</div>
                        <Image src="/icons/stats.png" width={38} height={38}/>
                    </div>
                </div>
            </div>
        </div>
        <div className='centered px-20'>
            <FriendStats className="pl-0" data={myuser.bestFour}/>
        </div>                        
    </Layout> 
  )
}