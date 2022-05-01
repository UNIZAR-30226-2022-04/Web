import Layout from 'components/Layout'  
import Rulette from 'components/Rulette'
import StoryList from 'components/StoryList'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const user = {"username": "MrNOPatineto", "password": "12345"}

const relatosDebug = {
    myTales: [
    ],

    friendTales: [
        {
            id: 0,
            title: "El Pepe",
            creator: "Fernando",
            maxTurns: 10,
            turn: 4
        },
        {
            id: 1,
            title: "Federico",
            creator: "GarciaLorca",
            maxTurns: 15,
            turn: 2
        },
        {
            id: 2,
            title: "Feliz Cumpleaños",
            creator: "Hg",
            maxTurns: 200,
            turn: 80
        }
    ],

    publicTales: [
    ],

    talesForVote: [
    ]
}

export default function StoryMode({userInfo}){
    const router = useRouter()
    const [visibility, setVisibility] = useState(1)
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
        <Layout data={layoutInfo} > 
            <div className='flex flex-row w-screen items-center h-screen space-x-20 ml-5'>
                <div className='flex flex-col ml-5'>
                    <h1 className='commonTitle'>Tus Relatos</h1>
                    <StoryList stories={relatosDebug.myTales} />
                    <h1 className='commonTitle'>Relatos de Amigos</h1>
                    <StoryList stories={relatosDebug.friendTales} />
                    <h1 className='commonTitle'>Relatos Públicos</h1>
                    <StoryList stories={relatosDebug.publicTales} />
                </div>
                <form className='flex flex-col space-y-3'>
                    <h1 className='commonTitle'>Crear Partida</h1>
                    
                    <div className='commonCrate'>
                        <h1 className='commonFont w-32'>Partida Pública: </h1>
                        {visibility==0?(
                            <button type='button' onClick={(e) => setVisibility(1)} className='bg-green-700 text-white w-full rounded-3xl'>Sí</button>
                        ):(
                            <button type='button' onClick={(e) => setVisibility(0)} className='bg-red-700 text-white w-full rounded-3xl'>No</button>
                        )}
                        
                    </div>

                    <div className='commonCrate'>
                        <h1 className='commonFont w-32'>Turnos: </h1>
                        <input id='turns' type='number' min='0' className='text-center w-full rounded-lg' />
                    </div>

                    <div className='commonCrate'>
                        <h1 className='commonFont w-32'>Número Caracteres: </h1>
                        <input id='chars' type='number' min='0' className='text-center w-full rounded-lg' />
                    </div>

                    <button type='button' className='buttonStyle bg-red-300' onClick={() => createGame(visibility, router)}>
                        Crear Partida
                    </button>
                </form>
                <Rulette page='story'/>
            </div>            
        </Layout>
    )
}

function createGame(privacy, router){
    const turns = document.getElementById('turns').value
    const chars = document.getElementById('chars').value

    console.log("T:",turns," C:",chars)
    if(turns && chars){
        if(turns < 0 || turns > 10){
            alert("No puede haber menos de 1 turno o más de 10")
        }else if(chars < 0 || chars > '120'){
            alert("No puede haber menos de 1 carácter o más de 120")
        }else{
            router.push(`/storyMode/start?turns=${turns}&characters=${chars}&privacy=${privacy}`)
        }
    }else{
        alert("Los campos no pueden estar vacíos")
    }
    
}