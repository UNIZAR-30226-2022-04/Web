import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from 'components/Layout'
import Spinner from 'components/Spinner'
import ListOfPeople from 'components/ListOfPeople'

const sala = {
    result:"success",
    mode: "random", // "random | twitter"
    maxPlayers: 10,
    participants: [
        {
            username:"nombre",
            picture: 1,
            stars: 4531
        },
        {
            username:"nombre",
            picture: 2,
            stars: 435 
        },
    ],
    hasStarted:0
  }
  

export default function QuickGame(){
    const router = useRouter()
    const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api
    const [windowUser, setWindowUser] = useState({})
    const [code, setCode] = useState("")

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
        const queryParams = new URLSearchParams(window.location.search);
        setCode(queryParams.get('code'))
    }, [])
        
    // Hace fetch de la api
    useEffect(() => {
        // Función que llama a la api
        if(!windowUser.username || !code){
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
            
            const info = {
                username: windowUser.username,
                password: windowUser.password,
                id: code
            }

            const options2 = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(info) 
            }

            // Llamada a la api
            const res1 = await fetch('http://localhost:3000/api/general/home', options)
            const data1 = await res1.json()
            const res2 = await fetch('http://localhost:3000/api/quick_game/get_room', options)
            const data2 = await res2.json()

            //DEBUG
            data2.result = "acierto"

            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data1.result === "error" || data2.result === 'error'){
                router.push("/")
                return
            }

            // Llama al hook que almacena la información del usuario
            setMyuser(data1)
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

    return(
        <Layout data={layoutInfo} >
            <div className='flex flex-col items-center justify-center w-screen space-y-5'>
                <div className='commonTitle'>Código de la Sala: {code}</div>
                <div className='flex flex-row justify-center items-center space-x-20 ml-5'>
                    <ListOfPeople data={sala.participants} />
                    <div className='flex flex-col  space-y-5'>
                        <div className='flex flex-row bg-white rounded-lg items-center justify-center p-2 space-x-2'>
                            <Image src='/quick-game/clock.png' width="30" height="30"/>
                            <p className=''>Tiempo: </p>                            
                        </div>
                        
                        {sala.mode == 'random'?(
                            <div className='flex flex-row bg-purple-500 rounded-lg items-center justify-center space-x-2 p-2'>
                                <Image src='/quick-game/random_words.png' width="30" height="30"/>
                                <p className=''>Modo Aleatorio</p>                                
                            </div>
                        ):(
                            <div className='flex flex-row bg-blue-500'>
                                <p>Modo Tendencias Twitter</p>
                                <Image src='/quick-game/twitter_trend.png' width="30" height="30"/>
                            </div>
                        )}             
                    </div>
                </div>
                <button className='buttonStyle bg-purple-500' onClick={() => leaveRoom(windowUser, router)}> {'<-'} VOLVER</button>  
            </div>                      
        </Layout>
    )
}

function leaveRoom(user, router){
    router.push("/quickGame")

    // HACER FECT DE LEAVE ROOM
}