import Layout from 'components/Layout'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import ListOfPeople from 'components/ListOfPeople'

import Image from 'next/image'

const placeholder = {
  "result":"success",
  "clasification":[
  {
    "username":"1",
    "stars":1
  },{
    "username":"1",
    "stars":1
  },{
    "username":"1",
    "stars":1
  },{
    "username":"1",
    "stars":1
  },{
    "username":"1",
    "stars":1
  },{
    "username":"1",
    "stars":1
  },{
    "username":"1",
    "stars":1
  }],
  coins:42069
}

export default function Results() {

  const router = useRouter()
  const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api

  const [windowUser, setWindowUser] = useState({}) 

  const [results, setResults] = useState([])

  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){
      const username = localStorage.getItem("username")
      const password = localStorage.getItem("password")
      setWindowUser({username: username, password: password})
    }else{
      router.push("/login")
    }
  }, [])
     
  // Hace fetch de la api
  useEffect(() => {
    // Función que llama a la api
    console.log(placeholder)
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

      // Si no ha ido bien o no estoy logeado volvemos a /
      if(data.result === "error"){
        localStorage.setItem("logged", "no")
        router.push("/login")
        return
      }

      // Llama al hook que almacena la información del usuario
      setMyuser(data)
    }
    const getResults = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      // Opciones para llamar a la api
      const body = {
        username:windowUser.username,
        password:windowUser.password,
        id:queryParams.get("code")
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body) 
      }
    
      // Llamada a la api
      const res = await fetch('http://localhost:3000/api/quick_game/points_voted_quick_game', options)
      const data = await res.json()

      // Si no ha ido bien o no estoy logeado volvemos a /
      if(data.result === "error"){
        alert("Error al obtener datos")
        router.push("/quickGame")
        return
      }

      // Llama al hook que almacena la información del usuario
      setResults(data)
    }
    getData()
    getResults()
  }, [windowUser])

  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!myuser){
    return <div className='background'>loading...</div> 
  }
  
  // Renderizamos la página
  const layoutInfo = {
    username: windowUser.username,
    stars:    myuser.stars,
    coins:    myuser.coins,
    image_ID: myuser.picture
  } 

  return (
    <Layout data={layoutInfo}>
        <div className="flex flex-col w-screen">

          <div className="flex">
            <div className="w-1/12"/>
            <div className="w-5/12">
              <div className="text-center commonTitle my-4 text-6xl">Resultados</div>
              <div className="flex flex-row pt-20">
              <div>
                <Image src="/icons/star.png" width={250} height={250}/>
              </div>
                <div>
                  <div className="h-10"/>
                  <div className="text-centered commonTitle text-5xl ml-16">{windowUser.username}</div>
                  <div className="flex flex-row pt-10">
                  <div className="w-1/12"/>
                    <Image src="/profPic/icon0.png" width={50} height={50}/>
                    <div className="text-4xl text-white font-bold ml-10">+{placeholder.coins}</div>
                    <Image src="/icons/mooncoin.png" width={50} height={50}/>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-5/12'>
            <div className="commonTitle my-4 text-6xl">Clasificación</div>
              <div className="scrollBox h-64 mt-20">
                <ListOfPeople  data={placeholder.clasification}/>
              </div>
            </div>

          </div>

          <div className='text-center'>
            <input className="clickableItem rounded-xl bg-green-800 text-white p-2 border-2 border-white text-center font-bold" value="Recoger"/>
          </div>

        </div>
    </Layout>
  )
}
