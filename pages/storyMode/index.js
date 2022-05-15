import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Layout from 'components/Layout'  
import Rulette from 'components/Rulette'
import StoryList from 'components/StoryList'
import Spinner from 'components/Spinner'

export default function StoryMode(){
    const router = useRouter()
    
    // Api data
    const [windowUser, setWindowUser] = useState({}) 
    const [myTales, setMyTales] = useState("")

    // Tale options
    const [visibility, setVisibility] = useState(1)
    const [turnos, setTurnos] = useState(3)
    const [chars, setChars] = useState(30)

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
    // Hace fetch de la api
    useEffect(() => {
        // Función que llama a la api
        if(windowUser.username == undefined){
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
            const res = await fetch('http://localhost:3000/api/tale_mode/get_tales', options)
            const data = await res.json() 

            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data.result === "error"){
                localStorage.setItem("logged", "no")
                router.push("/")
                return
            }

            // Llama al hook que almacena la información del usuario
            setMyTales(data)
        }
        getData()
    })

    // Si tadavía no hoy usuario, esperamos a que lo haya
    if(!myTales){
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
            <div className='flex flex-row items-center space-x-20 ml-5 mb-16'>
                <div className='flex flex-col ml-5 bg-scroll bg-contain overflow-auto h-[400px] pr-2'>
                    <h1 className='commonTitle'>Mis Relatos</h1>
                    <StoryList stories={myTales.myTales} isVoteStory={false}/>
                    <h1 className='commonTitle'>Relatos de Amigos</h1>
                    <StoryList stories={myTales.friendTales} isVoteStory={false}/>
                    <h1 className='commonTitle'>Relatos Públicos</h1>
                    <StoryList stories={myTales.publicTales} isVoteStory={false}/>
                    <h1 className='commonTitle'>Relatos en Votación</h1>
                    <StoryList stories={myTales.talesForVote} isVoteStory={true}/>
                </div>
                <form className='flex flex-col space-y-3 w-80'>
                    <h1 className='commonTitle'>Crear Relato</h1>
                    
                    <div className='flex flex-col w-full justify-center item-center space-y-2'>
                        
                        <h1 className='commonSubtitle'>Número de escrituras</h1>
                        <div className='flex flex-row space-x-2 items-center justify-center text-center'>
                            <button className='addReduceButton bg-verde_plus_minus' type='button' onClick={() => (changeTurnos(setTurnos,turnos-1))}>-</button>
                            <div className='text-white font-arial-b text-2xl'>
                                {turnos}
                            </div>
                            <button className='addReduceButton bg-verde_plus_minus' type='button' onClick={() => (changeTurnos(setTurnos,turnos+1))}>+</button>
                        </div>
                    </div>

                    <div className='flex flex-col w-full justify-center item-center space-y-2'>
                        
                        <h1 className='commonSubtitle'>Número de caracteres</h1>
                        <div className='flex flex-row space-x-2 items-center justify-center text-center'>
                            <button className='addReduceButton bg-verde_plus_minus' type='button' onClick={() => (changeCaracteres(setChars,chars-5))}>-</button>
                            <div className='text-white font-arial-b text-2xl'>
                                {chars}
                            </div>
                            <button className='addReduceButton bg-verde_plus_minus' type='button' onClick={() => (changeCaracteres(setChars,chars+5))}>+</button>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center item-center space-y-2'>
                        <h1 className='commonSubtitle'>Tipo de partida</h1>
                        {visibility==0?(
                            <button type='button' onClick={() => setVisibility(1)} className='bg-red-700 text-white rounded-3xl font-arial-b p-1'>Privada</button>
                        ):(
                            <button type='button' onClick={() => setVisibility(0)} className='bg-green-700 text-white rounded-3xl font-arial-b p-1'>Pública</button>
                        )}
                        
                    </div>

                    <button type='button' className='commonButton bg-verde_top' onClick={() => createGame(visibility, router)}>
                        Crear Partida
                    </button>
                </form>
            </div>         
            <Rulette page='story'/>   
        </Layout>
    )
}

function changeCaracteres(stateChanger, chars){
    if(chars < 30){
        stateChanger(30)
    }else if(chars > 120){
        stateChanger(120)
    }else{
        stateChanger(chars)
    }
}

function changeTurnos(stateChanger, turnos){ 
    if(turnos < 3){
        stateChanger(3)
    }else{
        stateChanger(turnos)
    }
}

function createGame(privacy, router){
    const turns = document.getElementById('turns').value
    const chars = document.getElementById('chars').value
    if(turns && chars){
        if(turns < 3 || turns > 1000){
            alert("No puede haber menos de 3 turnos")
        }else if(chars < 30 || chars > 120){
            alert("No puede haber menos de 30 carácter o más de 120")
        }else{
            router.push(`/storyMode/start?turns=${turns}&characters=${chars}&privacy=${privacy}`)
        }
    }else{
        alert("Los campos no pueden estar vacíos")
    }
    
}