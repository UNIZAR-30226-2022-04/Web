import Layout from '../../components/Layout'
import FriendScreen from '../../components/FriendScreen'
import Rulette from '../../components/Rulette'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLogin } from '../../contexts/LoginContext'
import { FriendsProvider } from "../../contexts/FriendsContext"

export default function Friends() {

  const {ctxUsername, ctxPassword, ctxLogged} = useLogin()
  const router = useRouter()
  const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api

  const user = {username: ctxUsername, password: ctxPassword}

  // Hace fetch de la api
  useEffect(() => {
    // Función que llama a la api
    const getData = async () => {
      // Opciones para llamar a la api
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user) 
      }
    
      // Llamada a la api
      const res = await fetch('http://localhost:3000/api/home', options)
      const data = await res.json()

      // Si no ha ido bien o no estoy logeado volvemos a /
      if(data.result === "error" || !ctxLogged){
        router.push("/")
        return
      }

      // Llama al hook que almacena la información del usuario
      setMyuser(data)
    }
    getData()
  }, [])  // Llama al useState solo una vez usando []

  if(!myuser){
    return <div>loading...</div>
  }

  const layoutInfo = {
    username: ctxUsername,
    stars:    myuser.stars,
    coins:    myuser.coins,
    image_ID: myuser.picture
  } 

    return(
      <FriendsProvider>
          <Layout data={layoutInfo}>
            <FriendScreen/>
            <Rulette />
          </Layout>
      </FriendsProvider>
    )
}