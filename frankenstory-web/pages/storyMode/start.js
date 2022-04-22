import Layout from 'components/Layout'
import WriteStory from 'components/WriteStory'
import { useLogin } from "contexts/LoginContext"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Stats() { 
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

  // Solo la primera vez que se renderiza:  useState(() => {}, []) 
  // Cada vez que se renderiza              useState(() => {}) 
  // Cada vez que cambia la variable foo:   useState(() => {}, [foo]) 

  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!myuser){
    return <div>loading...</div> 
  }
  
  // Renderizamos la página
  const layoutInfo = {
    username: ctxUsername,
    stars:    myuser.stars,
    coins:    myuser.coins,
    image_ID: myuser.picture
  } 

  return (
    <>
        <Layout data={layoutInfo}>
                    <WriteStory user={user} first={true}/>
        </Layout> 
    </>
  )
}