import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from 'components/Layout'  
import Rulette from 'components/Rulette'
import Spinner from 'components/Spinner'

export default function StoryMode(){
    const router = useRouter()

  const [windowUser, setWindowUser] = useState({})
  const [code, setCode] = useState("")
  const [errorJ, setErrorJ] = useState("")
  const [errorR, setErrorR] = useState("")

  const [privateGame, setprivateGame] = useState(false)
  const [gameMode, setGameMode] = useState("random")
  const [time, setTime ] = useState(30)

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

    }else{
router.push("/login")
    }
  }, [])
 
  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!windowUser){
    return <Spinner />
  }
  
  // Renderizamos la página
  const layoutInfo = {
    username: windowUser.username,
    stars:    windowUser.stars,
    coins:    windowUser.coins,
    image_ID: windowUser.picture
  }

  const changeTime = (change) => {
    if( 5 <= time + change && 120 >= time+change){
      setTime(time+change)
    }
  }

  return(
    <Layout data={layoutInfo} >
      <div className='h-full w-2/4 flex flex-row justify-center items-center space-x-20'>
        <form className="flex flex-col items-center space-y-4">
          <input type="text" placeholder='Código' value={code} onChange={(e) => setCode(e.target.value)}/>
          { errorJ != "" ? (
            <div className="centered text-red-700">{errorJ}</div>
          ):(
            <></>
          )}
          <button type="button" onClick={()=>(join(windowUser, code, setErrorR, setErrorJ, router))} className="rounded-xl bg-green-800 text-white p-2 border-2 border-white">Unirse a sala</button>
          <button type="button" onClick={()=>(random(windowUser, setErrorJ, setErrorR, router))} className='rounded-xl bg-green-800 text-white p-2 border-2 border-white'>Partida aleatoria</button>
          { errorR != "" ? (
            <div className="centered text-red-700">{errorR}</div>
          ):(
            <></>
          )}
        </form>

        <form className ="flex flex-col space-y-2">
          <p>Tiempo de escritura</p>
          <div className="flex flex-col">
              <p className="text-2xl float-left text-white">{parseInt(time/60)}min:{time % 60}seg</p>
              <div className="flex flex-row text-2xl text-white">
                  <button type="button" onClick={()=>(changeTime(-5))}>-</button>
                  <button type="button"  onClick={()=>(changeTime(5))}>+</button>
              </div>
          </div>

          <p>Tipo de partida</p>          
          <div className='flex flex-row'>
            <input className={`py-1 px-2 text-white ${ !privateGame ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="PUBLICA" onClick={() => setprivateGame(false)}/>
            <input className={`py-1 px-2 text-white ${ privateGame ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="PRIVADA" onClick={() => setprivateGame(true)}/>
          </div>
          
          <div>Modo de juego</div>
          <div className='flex flex-row'>
            <input className={`py-1 px-2 text-white ${ gameMode=="random" ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="ALEATORIAS" onClick={() => setGameMode("random")}/><> </>
            <input className={`py-1 px-2 text-white ${ gameMode=="twitter" ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="TWITTER" onClick={() => setGameMode("twitter")}/><> </>
          </div>
          <button type="button" onClick={()=>(create(windowUser, time, privateGame, gameMode, setErrorR, setErrorJ, router))} className="clickableItem rounded-xl bg-green-800 text-white p-2 border-2 border-white">Crear partida</button>
        </form>
      </div>
      <Rulette page='quickGame'/>            
    </Layout>
  )
}

async function create (windowUser, time, isPrivate, gameMode, setErrorR, setErrorJ, router){
  setErrorR("")
  const res = await tryCreate(windowUser, time, isPrivate, gameMode)

  if(res.result != "success"){
    setErrorJ(res.reason)
  }else{
    console.log(res)
    router.push(`quickGame/lobby?code=${res.id.slice(1)}`)
  }
}

async function join (windowUser, code, setErrorR, setErrorJ, router) {
  setErrorR("")
  const res = await tryJoin(windowUser, code)

  if(res.result != "success"){
    setErrorJ(res.reason)
  }else{
    console.log(res)
    router.push(`quickGame/lobby?code=${code}`)
  }
}

async function random(windowUser, setErrorJ, setErrorR, router) {
  setErrorJ("")
  
  const res = await tryRandom(windowUser)
  
  if(res.result != "success"){
    setErrorR(res.reason)
  
  }else{
    console.log(res)
    router.push(`quickGame/lobby?code=${res.id.slice(1)}`)
  }
}

async function tryCreate(windowUser, time, isPrivate, gameMode) {
  const info = {
      username: windowUser.username,
      password: windowUser.password,
      time: time,
      isPrivate: isPrivate,
      mode: gameMode
  }

  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info) 
  }
  
  const res = await fetch("http://localhost:3000/api/quick_game/create_room", options)
  const data = await res.json()
  return data
}

async function tryJoin(windowUser, code) {
  const info = {
    username:windowUser.username,
    password:windowUser.password,
    id:code
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info) 
  }

  const res = await fetch("http://localhost:3000/api/quick_game/join_room",options)
  const data = await res.json()
  return data
}

async function tryRandom (windowUser) {
  
  const body = {
    username:windowUser.username,
    password:windowUser.password,
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body) 
  }
  const data = await fetch("http://localhost:3000/api/quick_game/join_random_room", options)
  return await data.json()
}
