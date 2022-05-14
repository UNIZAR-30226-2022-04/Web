import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import Layout from 'components/Layout'
import Rulette from 'components/Rulette'
import separateStories from 'lib/separateStories'
import Spinner from 'components/Spinner'

export default function SavedTales(){

    const router = useRouter()
    const [myStories, setMyStories] = useState("")
    const [windowUser, setWindowUser] = useState({}) 

    // Recoge los datos guardados
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
            const res = await fetch('http://localhost:3000/api/general/get_stories', options)
            const data = await res.json()

            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data.result === "error"){
                router.push("/")
                return
            }

            // Llama al hook que almacena la información del usuario
            setMyStories(data)
        }
        getData()
    }, [windowUser])

    // Si tadavía no hoy usuario, esperamos a que lo haya
    if(!myStories){
        return <Spinner />
    }
    
    // Renderizamos la página
    const layoutInfo = {
        username: windowUser.username,
        stars:    windowUser.stars,
        coins:    windowUser.coins,
        image_ID: windowUser.picture
    } 

    console.log("my stories",myStories)

    const stories = separateStories(myStories)
    
    console.log(stories)

    return(
        <Layout data={layoutInfo}>
            <TalesList quicks={stories.quick_stories} tales={stories.tale_stories}/>
            <Rulette page="yourStories"/> 
        </Layout>
    )
} 

function TalesList({quicks, tales}){
    return(
        <>
            <div className='flex flex-row justify-start ml-32 items-center space-x-20 align-middle text-center'>
                <div className='flex flex-col space-y-3 items-center justify-center align-middle'>
                    <h1 className='commonTitle'>Partidas Rápidas</h1>
                    <div className="bg-scroll bg-contain overflow-auto">
                        <div className="h-[500px]">
                            <div className='flex flex-col items-center space-y-3 w-auto'>
                                {quicks.map(
                                    (game) => (
                                        <QuickStory key={game.id} info={game} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-3 items-center justify-center align-middle'>
                    <h1 className='commonTitle'>Relatos</h1>
                    <div className="bg-scroll bg-contain overflow-auto">
                        <div className="h-[500px]">
                            <div className='flex flex-col space-y-3 justify-start items-center'>
                                {tales.map((game) => (<TaleStory key={game.id} info={game}/>))}
                            </div>
                        </div>            
                    </div>
                </div>               
            </div>
        </>
    )
}

function QuickStory({info}){
    return(
        <div className='flex flex-row bg-blue-200 w-[400px] px-5'>
            <div className='justify-start w-[160px] font-bold'>{info.date}</div>
            <div className='justify-end'>
                {info.type === 'quick_twittwer' ?(
                    <Image src="/quick-game/twitter_trend.png" width="40" height="25"/>
                ):(
                    <Image src="/quick-game/random_words.png" width="40" height="25"/>
                )}
                 <div className='justify-end clickableItem'>
                <Link href={`/profile/see_tale?id=${info.id}&type=quick`}>
                    <a><Image src="/icons/play.png" width="40" height="40"/></a>
                </Link>
            </div>
            </div>
        </div>
    )
}

function TaleStory({info}){
    return(
        <div className='flex flex-row bg-blue-200 w-[400px] mx-3 p-2 items-center rounded-full'>
            <div className='justify-start flex flex-row space-x-5 items-center'>
                <div className='w-[150px] font-bold'>{info.title}</div>
                <div className='w-[160px] font-bold'>{info.date}</div>
            </div>
            <div className='justify-end clickableItem'>
                <Link href={`/profile/see_tale?id=${info.id}&type=tale&title=${info.title}`}>
                    <a><Image src="/icons/play.png" width="40" height="40"/></a>
                </Link>
            </div>            
        </div>
    )
}