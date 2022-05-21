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

        }else{
            router.push("/login")
        }
    }, [])
    

    // Hace fetch de la api
    useEffect(() => {
        // Función que llama a la api
        if(!windowUser.username || !code){
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
            // Llamada a la api
            const res = await fetch('http://localhost:3000/api/quick_game/get_room', options)
            const data = await res.json()       

            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data.result === 'error'){
                console.log("Error first get room", data)
                await leaveRoom(windowUser, ident, router)
                return
            }

            setRoom(data)
        }
        getData()
    }, [windowUser])    

    // Compruebo periódicamente que la partida no ha empezado
    useEffect(() => {            
        if(!windowUser.username || !code){
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
            // Llamada a la api
            const res = await fetch('http://localhost:3000/api/quick_game/get_room', options)
            const data = await res.json()       

            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data.result === 'error'){
                console.log("Error check started", data)
                await leaveRoom(windowUser, ident, router)                
                return
            }

            if(data.hasStarted == 1){
                router.push(`/quickGame/write?id=${code}`)
            }else if(data.hasStarted == 2){
                router.push(`/quickGame/vote?id=${code}`)
            }

            setRoom(data)
        }       
        
        const timer = setInterval(getData, 2000);
        return () => clearInterval(timer);

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
                    <button type="button" className='commonButton bg-purple-500' onClick={() => (leaveRoom(windowUser, room, router))}> {'<-'} SALIR</button>  
                    {windowUser.username == room.participants[0].username ?(
                        <>
                            <button type="button" className='commonButton bg-purple-500' onClick={() => (closeRoom(windowUser, router))}> CERRAR SALA </button> 
                            <button type="button" className='commonButton bg-purple-500' onClick={() => (startGame(windowUser, code, router))}> EMPEZAR </button>  
                        </>                        
                    ):(<></>)}
                    
                </div>
                
            </div>                      
        </Layout>
    )
}

async function leaveRoom(user, room, router){    
    
    const info = {
        username: user.username,
        password: user.password,
        id: '#' + room
    }

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(info) 
    }

    await fetch('http://localhost:3000/api/quick_game/leave_room', options)
    router.push("/quickGame")
}

async function startGame(user, room, router){
    const info = {
        username: user.username,
        password: user.password,
        id: '#' + room
    }

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(info) 
    }

    const res = await fetch('http://localhost:3000/api/quick_game/play_quick_game', options)
    const data = await res.json()

    if(data.result == "success") router.push(`/quickGame/write?id=${room}`)
}

function closeRoom(user, room, router){

}