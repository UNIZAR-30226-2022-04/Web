import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Layout from 'components/Layout'  
import Spinner from 'components/Spinner'
import StoryParagraphs from "components/StoryParagraphs"

const placeholder = {
  topic:"El Quijote", //vacío si no hay tema de twitter
  isLast: false,
  turn: 1,
  paragraphs:[
      { text:"uno dos tres cuatro cinco uno seis siete ocho nueve", 
        words:["uno","tres","word3"]
      },
      {
        text:"kgk tgoejrhgji hrthkrghijwehrbg ergjrst hji", 
        words:["word1","hrthkrghijwehrbg","word3"]
      },
  ]
}

export default function QuickVote(){
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
        body: JSON.stringify(info) 
      }
      
      const res = await fetch('http://localhost:3000/api/quick_game/resume_vote_quick_game', options)
      const data = await res.json()      
      
      data.result = "correcto" // DEBUG

      // Si no ha ido bien o no estoy logeado volvemos a /
      if(data.result === "error"){
        localStorage.setItem("logged", "no")
        router.push("/")
        return
      }

      // Llama al hook que almacena la información del usuario
      setStory(placeholder) // setStory(data)
    }
    getData()
  }, [windowUser])

  console.log(story)

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
          {story.topic == "" ? (
            <></>
          ):(
            <div className='flex flex-row items-center justify-center space-x-2'>
              <h1 className='commonSubtitle'>Tema de la historia:</h1>
              <div className='flex flex-row bg-blue-400 items-center justify-center py-1 px-4 rounded-md space-x-3'>
                <Image src='/quick-game/twitter_trend.png' width={28} height={28}/>
                <h1 className='text-white'>#{story.topic}</h1>
              </div>
            </div>            
          )}
          <StoryParagraphs story={story} chosenStory={chosenStory} setChosenStory={setChosenStory}/>
          <button className='bg-white rounded-full p-2' onClick={() => (enviarVoto(info, chosenStory))}>Enviar Voto</button>
        </div>        
      </Layout>
  )
}

async function enviarVoto(info, voto){
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info) 
  }

  const res = await fetch('http://localhost:3000/api/quick_game/¿?¿?¿¿?¿?¿?', options)
  const data = await res.json();

  if(!data){

  }else if(data.result === "error"){

  }else{

  }
}