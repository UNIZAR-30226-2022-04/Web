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

  const [publicGame, setPublicGame] = useState(true)
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
      router.push("/")
    }
  }, [])

  const tryJoin = async () => {
    alert("Hola")
    const body = {
      username:windowUser.username,
      password:windowUser.password,
      id:code
    }
    alert("Hola1")
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body) 
    }
    alert("Hola2")
    const data = await fetch("http://localhost:3000/api/quick_game/join_room",options)
    alert("Hola3")
    return await data.json()
  }
  
  const join = (e) =>{
    setErrorR("")
    e.preventDefault()
    tryJoin().then((res)=>{
      if(res.result != "success"){
        setErrorJ(res.reason)
      }else{
        router.push(`quickGame/lobby?id=${code}`)
      }
    })
  }
  
  const tryRandom = async () => {
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
    const data = await fetch("http://localhost:3000/api/quick_game/join_random_room",options)
    return await data.json()
  }
  
  const random = () =>{
    setErrorJ("")
    tryRandom().then((res)=>{
      if(res.result != "success"){
        setErrorR(res.reason)
      }else{
        alert("Acierto")
        router.push(`quickGame/lobby?id=${res.id}`)
      }
    })
  }
  
  const onSubmit = (e) => {
    create().then((res) =>{
        console.log(res)
        if (res.result != "success"){
            alert("Error al crear sala")
            router.push("/quickGame")
        }else{
            router.push(`/quickGame/lobby?code=${res.id.slice(1)}`)
        }
    })
  }
  
  const create = async () =>{
    const data = {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        time: time,
        isPrivate: publicGame,
        mode: gameMode
    }
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) 
    }
    console.log(data)
    const res = await fetch("http://localhost:3000/api/quick_game/create_room", options)
    return await res.json()
  }
 
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
        <form className="flex flex-col items-center space-y-4" onSubmit={(e)=>(join(e))}>
          <input type="text" placeholder='Código' value={code} onChange={(e) => setCode(e.target.value)}/>
          { errorJ != "" ? <div className="centered text-red-700">{errorJ}</div> : ""}
          <button className="rounded-xl bg-green-800 text-white p-2 border-2 border-white" type="submit">Unirse a sala</button>
          <button type="button" className='rounded-xl bg-green-800 text-white p-2 border-2 border-white' onClick={()=>(random())}>Partida aleatoria</button>
          { errorR != "" ? <div className="centered text-red-700">{errorR}</div> : ""}
        </form>

        <form className ="flex flex-col space-y-2" onSubmit={onSubmit}>
          <p>Tiempo de escritura</p>
          <div className="flex flex-col">
              <p className="text-2xl float-left text-white">{parseInt(time/60)}min:{time % 60}seg</p>
              <div className="flex flex-row text-2xl text-white">
                  <button type="button" onClick={(e)=>(changeTime(-5))}>-</button>
                  <button type="button"  onClick={(e)=>(changeTime(5))}>+</button>
              </div>
          </div>

          <p>Tipo de partida</p>          
          <div className='flex flex-row'>
            <input className={`py-1 px-2 text-white ${ publicGame ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="PUBLICA" onClick={() => setPublicGame(true)}/>
            <input className={`py-1 px-2 text-white ${ !publicGame ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="PRIVADA" onClick={() => setPublicGame(false)}/>
          </div>
          
          <div>Modo de juego</div>
          <div className='flex flex-row'>
            <input className={`py-1 px-2 text-white ${ gameMode=="random" ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="ALEATORIAS" onClick={() => setGameMode("random")}/><> </>
            <input className={`py-1 px-2 text-white ${ gameMode=="twitter" ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="TWITTER" onClick={() => setGameMode("twitter")}/><> </>
          </div>
          <input className="clickableItem"type="submit" value="Crear partida"/>
          <button className='rounded-xl bg-green-800 text-white p-2 border-2 border-white' onClick={(e) => (create(e))}>Crear partida</button>
        </form>
      </div>
      <Rulette page='quickGame'/>            
    </Layout>
  )
}

