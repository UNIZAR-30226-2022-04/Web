import Layout from 'components/Layout'
import FriendStats from 'components/ListOfPeople'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Image from 'next/image'

export default function Stats() { 
  const router = useRouter()
  const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api

  const [windowUser, setWindowUser] = useState({}) 

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
    getData()
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

          <div className='text-center'>
              <div className="commonTitle my-2 text-6xl">Resultados</div>
          </div>

          <div className="flex">

            <div className="w-1/12"></div>
            <div className="w-5/12 flex flex-row bg-red-800">
              <div>
                <Image src="/icons/star.png" width={250} height={250}/>
              </div>
                <div>
                  <div className="h-10"/>
                  <div className="text-centered commonTitle text-5xl ml-16 bg-blue-800">{windowUser.username}</div>
                  <div className="inline-grid grid-cols-3">
                    <Image src="/profPic/icon0.png" width={38} height={38}/>
                    <div className="text-2xl">+500</div>
                    <Image src="/icons/mooncoin.png" width={38} height={38}/>
                  </div>
                </div>
            </div>

            <div className='w-5/12'>
              <FriendStats className="pl-0" data={myuser.bestFour}/>
            </div>

          </div>

        </div>
    </Layout>
  )
}
/*    <Layout data={layoutInfo}>
        <div className="flex flex-col w-screen">
          <div className='centered'>
              <div className="commonTitle mt-2">Resultados</div>
          </div>
          <div>
              <div className="grid grid-cols-2">
                  <div>
                      <Image src="/icons/star.png" width={100} height={100}/>
                  </div>
                  <div>
                      <div className="text-centered">{windowUser.username}</div>
                      <div className="inline-grid grid-cols-3">
                          <Image src="/profPic/icon0.png" width={38} height={38}/>
                          <div className="text-2xl">+500</div>
                          <Image src="/icons/stats.png" width={38} height={38}/>
                      </div>
                  </div>
              </div>
          </div>
          <div className='centered px-20'>
              <FriendStats className="pl-0" data={myuser.bestFour}/>
          </div>
        </div>
    </Layout>*/
