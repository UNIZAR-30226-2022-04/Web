import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from 'components/Layout'  
import Rulette from 'components/Rulette'
import Spinner from 'components/Spinner'
import StoryVote from "components/StoryVote"

export default function StoryMode(){
  const router = useRouter()
  const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api
  const [windowUser, setWindowUser] = useState({})
  const [story, setStory ] = useState([])

  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){
      const username = localStorage.getItem("username")
      const password = localStorage.getItem("password")
      const picture = localStorage.getItem("picture")
      const coins = localStorage.getItem("coins")
      const stars = localStorage.getItem("stars")

      setWindowUser({
        username: username, 
        password: password,
        picture: picture,
        coins: coins,
        stars: stars
      })
      console.log("SACO DATOS")
    }else{
      console.log("VOY A LOGIN")
      router.push("/")
    }
  }, [])

  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!windowUser){
    return <Spinner />
  }

  const layoutInfo = {
    username: windowUser.username,
    stars:    windowUser.stars,
    coins:    windowUser.coins,
    image_ID: windowUser.picture
  }  

    return(
        <Layout data={layoutInfo} > 
            <StoryVote user={windowUser}/>
            <Rulette page='quickGame'/>            
        </Layout>
    )
}