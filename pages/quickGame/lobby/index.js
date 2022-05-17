import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from 'components/Layout'
import Spinner from 'components/Spinner'
import ListOfPeople from 'components/ListOfPeople'


export default function QuickGame(){
    const router = useRouter()
    const [windowUser, setWindowUser] = useState({})
    const [code, setCode] = useState("")
    const [room, setRoom] = useState("")
    
    useEffect(()=>{
        if(localStorage.getItem("logged") == "si"){
            const queryParams = new URLSearchParams(window.location.search);
            setCode(queryParams.get('code'))

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
        if(!windowUser.username || !code){
            console.log("no permito sacar datos")
            return
        }
            
        const getData = async () => {
            // Opciones para llamar a la api
            const ident = "#" + code.toString()
            
            const info = {
                username: windowUser.username,
                password: windowUser.password,
                id: ident
            }

            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(info) 
            }
            console.log(info)
            alert("Info")

            // Llamada a la api
            const res = await fetch('http://localhost:3000/api/quick_game/get_room', options)
            const data = await res.json()       

            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data.result === 'error'){
                console.log(data)
                alert("Error")
                router.push("/quickGame")
                return
            }

            // Llama al hook que almacena la información del usuario
            setRoom(data)
        }
        getData()
    }, [windowUser])

    // Si tadavía no hoy usuario, esperamos a que lo haya
    if(!windowUser || !room){
        return <Spinner />
    }

    // Renderizamos la página
    const layoutInfo = {
        username: windowUser.username,
        stars:    windowUser.stars,
        coins:    windowUser.coins,
        image_ID: windowUser.picture
    } 

    return(
        <Layout data={layoutInfo} >
            <div className='flex flex-col items-center justify-center w-screen space-y-5'>
                <div className='commonTitle'>Código de la Sala: #{code}</div>
                <div className='flex flex-row justify-center items-center space-x-20 ml-5'>
                    <ListOfPeople data={room.participants} showFaces={true} />
                    <div className='flex flex-col  space-y-5'>
                        <div className='flex flex-row bg-white rounded-lg items-center justify-center p-2 space-x-2'>
                            <Image src='/quick-game/clock.png' width="30" height="30"/>
                            <p className=''>{secsToString(room.time)}</p>                            
                        </div>
                        
                        {room.mode == 'random'?(
                            <div className='flex flex-row bg-purple-500 rounded-lg items-center justify-center space-x-2 p-2'>
                                <Image src='/quick-game/random_words.png' width="30" height="30"/>
                                <p className=''>Modo Aleatorio</p>                                
                            </div>
                        ):(
                            <div className='flex flex-row rounded-lg items-center justify-center space-x-2 p-2 bg-blue-500'>
                                <Image src='/quick-game/twitter_trend.png' width="30" height="30"/>
                                <p>Modo Tendencias Twitter</p>
                            </div>
                        )}             
                    </div>
                </div>
                <div className='flex flex-row space-x-3 items-center justify-center'>
                    <button className='commonButton bg-purple-500' onClick={() => leaveRoom(windowUser, room, router)}> {'<-'} SALIR</button>  
                    {windowUser.username == room.participants[0].username ?(
                        <>
                            <button className='commonButton bg-purple-500' onClick={() => closeRoom(windowUser, router)}> CERRAR SALA </button> 
                            <button className='commonButton bg-purple-500' onClick={() => startGame(windowUser, router)}> EMPEZAR </button>  
                        </>                        
                    ):(<></>)}
                    
                </div>
                
            </div>                      
        </Layout>
    )
}

function secsToString(totSeconds){
    const secondsInt = parseInt(totSeconds)
    const minutes = parseInt(secondsInt / 60)
    const seconds = secondsInt - minutes * 60
    return minutes.toString() + "min " + seconds.toString() + "seg"
}

function leaveRoom(user, room, router){
    router.push("/quickGame")

    // HACER FETCH DE LEAVE ROOM
}

function startGame(user, room, router){

}

function closeRoom(user, room, router){

}