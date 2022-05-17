import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Layout from 'components/Layout'
import ListOfPeople from 'components/ListOfPeople'
import Rulette from 'components/Rulette'
import Spinner from 'components/Spinner'

export default function Stats() { 
  const router = useRouter()
  const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api

  const [windowUser, setWindowUser] = useState({}) 

  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){
      const username = localStorage.getItem("username")
      const password = localStorage.getItem("password")
      setWindowUser({username: username, password: password})
    }else{
      router.push("/login")
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
      const res = await fetch('http://localhost:3000/api/general/home', options)
      const data = await res.json()

      console.log(data)

      // Si no ha ido bien o no estoy logeado volvemos a /
      if(data.result === "error"){
        localStorage.setItem("logged", "no")
        router.push("/login")
        return
      }

      // Llama al hook que almacena la información del usuario
      setMyuser(data)
    }
    getData()
  }, [windowUser])

  useEffect(() => {
    if(myuser){
      localStorage.setItem("picture", myuser.picture)
      localStorage.setItem("stars", myuser.stars)
      localStorage.setItem("coins", myuser.coins)
    }
  })
  
  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!myuser){
    return <Spinner />
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
        <div className='ml-20 flex flex-col justify-center space-y-3 mb-16'>
            <h1 className='commonTitle'>Estadísticas</h1>
            <ListOfPeople data={myuser.bestFour} showFaces={false}/>
        </div>
        <Rulette />
    </Layout> 
  )
}