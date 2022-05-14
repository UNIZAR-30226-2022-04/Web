import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from 'components/Layout'  
import Spinner from 'components/Spinner'
import StoryParagraphs from "components/StoryParagraphs"

export default function StoryVote(){
  const [windowUser, setWindowUser] = useState({})
  const [id, setId] = useState("")
  const [story, setStory] = useState("")
  const router = useRouter()
  const [chosenStory, setChosenStory] = useState(0);

  const info = {
    username: windowUser.username,
    password: windowUser.password,
    id: parseInt(id)
  }
  
  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){
      const queryParams = new URLSearchParams(window.location.search);
      setId(queryParams.get('id'))

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
      return
    }
    
    const getData = async () => {
      

      // Opciones para llamar a la api
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info) 
      }
      
      const res = await fetch('http://localhost:3000/api/tale_mode/get_paragraphs', options)
      const data = await res.json()   
  
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
        <div className='w-screen justify-top h-full align-middle items-center text-center space-y-4'>
          <h1 className='commonTitle'>VOTACIONES</h1>
          <h2 className='commonSubtitle'>Elige el párrafo que más te guste</h2>
          <h2 className='commonSubtitle'> {story.title}, de {story.paragraphs[0].username} </h2>
          <StoryParagraphs story={story} chosenStory={chosenStory} setChosenStory={setChosenStory}/>
          <button className='bg-white rounded-full p-2' onClick={() => (enviarVoto(info, chosenStory, router))}>Enviar Voto</button>
        </div>        
      </Layout>
  )
}

async function enviarVoto(tale_info, voto, router){
  
  const info = {
    username: tale_info.username,
    password: tale_info.password,
    id: tale_info.id,
    indexParagraph: voto
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info) 
  }

  const res = await fetch('http://localhost:3000/api/tale_mode/vote_story', options)
  const data = await res.json();
  
  console.log(data)

  if(data.result === "error"){

  }else{
    router.push("http://localhost:3000/storyMode")
  }
}