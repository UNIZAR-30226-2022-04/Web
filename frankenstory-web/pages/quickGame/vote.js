import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from 'components/Layout'  
import Rulette from 'components/Rulette'
import Spinner from 'components/Spinner'
import QuickVote from "components/QuickVote"

export default function StoryMode(){
  const router = useRouter()

  const [windowUser, setWindowUser] = useState({}) 


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
            <QuickVote user={windowUser}/>    
        </Layout>
    )
}