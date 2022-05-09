import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from 'components/Layout'  
import Spinner from 'components/Spinner'
import StoryParagraphs from "components/StoryParagraphs"

export default function StoryMode(){
  const [windowUser, setWindowUser] = useState({})
  const [id, setId] = useState("")
  const [story, setStory] = useState("")
  const [type, setType] = useState("")
  const router = useRouter()

  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){
      const queryParams = new URLSearchParams(window.location.search);
      setId(queryParams.get('id'))
      setType(queryParams.get('type'))

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

  // Hace fetch de la api
  useEffect(() => {
    // Función que llama a la api
    if(windowUser.username == undefined){
      console.log("no permito sacar datos")
      return
    }
    
    const getData = async () => {
      const info = {
        username: windowUser.username,
        password: windowUser.password,
        id: parseInt(id)
      }

      // Opciones para llamar a la api
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info) 
      }
      
      var data = {}
      if(type == "quick"){
        const res = await fetch('http://localhost:3000/api/quick_game/resume_vote_quick_game', options)
        data = await res.json()      
      
      }else if(type == "tale"){
        const res = await fetch('http://localhost:3000/api/tale_mode/get_paragraphs', options)
        data = await res.json()   
      }else{
        router.push("/profile/stats")
      }
      // Si no ha ido bien o no estoy logeado volvemos a /
      if(data.result === "error"){
        localStorage.setItem("logged", "no")
        router.push("/")
        return
      }

      // Llama al hook que almacena la información del usuario
      setStory(data)
    }
    getData()
  }, [windowUser])

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
      <Layout data={layoutInfo} > 
        <div className='w-screen justify-center align-middle'>
          <h1 className='commonTitle'>VOTACIONES</h1>
          <h2 className='commonSubtitle'>Elige el párrafo que más te guste</h2>
          <h2 className='commonSubtitle'>historia de </h2>
          <StoryParagraphs story={story}/>
        </div>        
      </Layout>
  )
}