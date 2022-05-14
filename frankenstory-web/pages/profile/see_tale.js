import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Link from 'next/link'

import Layout from "components/Layout"
import Spinner from 'components/Spinner'

export default function See_Tale() {
  const router = useRouter()
  const [windowUser, setWindowUser] = useState({}) 
  const [story, setStory] = useState({})
  
  const queryParams = new URLSearchParams(window.location.search);
  const title = queryParams.get('title')
  const id = queryParams.get('id')
  const type = queryParams.get('type')


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

  useEffect (()=>{
      const getData = async () =>{
          const info = {
              username:localStorage.getItem("username"),
              password:localStorage.getItem("password"),
              id:parseInt(id),
              type:type
          }
          var options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
              },
              body: JSON.stringify(info)
          }
          const res = await fetch("http://localhost:3000/api/general/watch_story", options)
          const data = await res.json()
          setStory(data)
      }
      getData()
  },[])

  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!windowUser || !story){
    return <Spinner />
  }

  const layoutInfo = {
    username: windowUser.username,
    stars:    windowUser.stars,
    coins:    windowUser.coins,
    image_ID: windowUser.picture
  }  

return(
    <Layout data={layoutInfo}>
        <div className="storyBox">
          <div className="titleWrite">{title}</div>
          <div className="savedStory max-h-full text-xl">{story.body}</div>
          <div className="centered">
              <Link href="/profile/saved_tales">
                  <div className="clickableItem border-2 border-green-900 rounded-xl w-48 text-center bg-green-700 h-6 text-white">
                      Volver a libreria
                  </div>
              </Link>
          </div>
      </div>
    </Layout>
  )
}