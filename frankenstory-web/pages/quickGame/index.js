import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from 'components/Layout'  
import Rulette from 'components/Rulette'
import Spinner from 'components/Spinner'

export default function StoryMode(){
    const router = useRouter()

  const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api
  const [windowUser, setWindowUser] = useState({})
  const [code, setCode] = useState("")
  const [errorJ, setErrorJ] = useState("")
  const [errorR, setErrorR] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){
      const username = localStorage.getItem("username")
      const password = localStorage.getItem("password")
      setWindowUser({username: username, password: password})
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
        body: JSON.stringify(windowUser) 
      }
    
      // Llamada a la api
      const res = await fetch('http://localhost:3000/api/general/home', options)
      const data = await res.json()

      console.log(data)

      // Si no ha ido bien o no estoy logeado volvemos a /
      if(data.result === "error"){
        router.push("/")
        return
      }

      // Llama al hook que almacena la información del usuario
      setMyuser(data)
    }
    getData()
  }, [windowUser])

  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!myuser){
    return <Spinner />
  }
  
  // Renderizamos la página
  const layoutInfo = {
    username: windowUser.username,
    stars:    myuser.stars,
    coins:    myuser.coins,
    image_ID: myuser.picture
  }

  const create = (e) =>{
    e.preventDefault()
    router.push("/quickGame/create")
  }

  const tryJoin = async () => {
    const body = {
      username:windowUser.username,
      password:windowUser.password,
      id:code
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body) 
    }
    const data = await fetch("http://localhost:3000/api/quick_game/join_room",options)
    return data.json()
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
    return data.json()
  }

  const random = (e) =>{
    router.push("quickGame/write")
    return
    setErrorJ("")
    e.preventDefault()
    tryRandom().then((res)=>{
      if(res.result != "success"){
        setErrorR(res.reason)
      }else{
        router.push(`quickGame/lobby?id=${res.id}`)
      }
    })
  }

    return(
        <Layout data={layoutInfo} > 
            <div className="w-2/3 ml-30">
              <div className='centered'>
                  <button className='rounded-xl bg-green-800 text-white p-2 border-2 border-white' onClick={create}>Crear partida</button>
              </div>
              <form onSubmit={join}>
                <div className='centered'>
                    <input type="text" placeholder='Código' value={code} onChange={(e) => setCode(e.target.value)}/>
                </div>
                { errorJ != "" ? <div className="centered text-red-700">{errorJ}</div> : ""}
                <div className="centered">
                    <button className="rounded-xl bg-green-800 text-white p-2 border-2 border-white" type="submit">Unirse a sala</button>
                </div>
              </form>
              <div className='centered'>
                <button className='rounded-xl bg-green-800 text-white p-2 border-2 border-white' onClick={random}>Partida aleatoria</button>
              </div>
              { errorR != "" ? <div className="centered text-red-700">{errorR}</div> : ""}
            </div>
            <Rulette page='quickGame'/>            
        </Layout>
    )
}