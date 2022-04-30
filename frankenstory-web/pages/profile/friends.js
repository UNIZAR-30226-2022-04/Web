import Layout from '../../components/Layout'
import FriendScreen from '../../components/FriendScreen'
import Rulette from '../../components/Rulette'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FriendsProvider } from "../../contexts/FriendsContext"

export default function Friends() {

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
      const res = await fetch('http://localhost:3000/api/general/home', options)
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

    return(
      <FriendsProvider>
          <Layout data={layoutInfo}>
            <FriendScreen/>
            <Rulette page="friends" />
          </Layout>
      </FriendsProvider>
    )
}