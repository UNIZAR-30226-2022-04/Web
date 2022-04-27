import Layout from 'components/Layout'  
import Rulette from 'components/Rulette'
import CreateQuickGame from 'components/CreateQuickGame'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const user = {"username": "MrNOPatineto", "password": "12345"}

export default function StoryMode({userInfo}){
    const router = useRouter()
    const [visibility, setVisibility] = useState("")
    const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api

    const [windowUser, setWindowUser] = useState({}) 

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
        const res = await fetch('http://localhost:3000/api/home', options)
        const data = await res.json()

        console.log(data)

        // Si no ha ido bien o no estoy logeado volvemos a /
        if(data.result === "error"){
            alert("Not logged")
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
        return <div className='background'>loading...</div> 
    }
    
    // Renderizamos la página
    const layoutInfo = {
        username: windowUser.username,
        stars:    myuser.stars,
        coins:    myuser.coins,
        image_ID: myuser.picture
    } 

    return(
        <Layout data={layoutInfo}>
            <div className='flex flex-row w-screen items-center h-screen space-x-20 ml-5'>
                <CreateQuickGame/>
                <Rulette page='quickGame'/>
            </div>
        </Layout>
    )
}

export async function getStaticProps () {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user) 
    }
    
    const friendStats = await fetch('http://localhost:3000/api/home', options)
    const userInfo = await friendStats.json()
  
    return {
      props: { userInfo }
    }
}