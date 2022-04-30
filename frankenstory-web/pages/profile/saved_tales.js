import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import Layout from 'components/Layout'
import Rulette from 'components/Rulette'
import separateStories from 'lib/separateStories'
export default function SavedTales(){

    const router = useRouter()
    const [myuser, setMyuser] = useState("")  // Hook que devuelve la llamada de la api
    const [myStories, setMyStories] = useState("")
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
            const res1 = await fetch('http://localhost:3000/api/general/home', options)
            const data1 = await res1.json()

            const res2 = await fetch('http://localhost:3000/api/general/get_stories', options)
            const data2 = await res2.json()

            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data1.result === "error" || data2.result === "error"){
                router.push("/")
                return
            }

            // Llama al hook que almacena la información del usuario
            setMyuser(data1)
            setMyStories(data2)
        }
        getData()
    }, [windowUser])

    // Si tadavía no hoy usuario, esperamos a que lo haya
    if(!myuser || !myStories){
        return <div className='background'>loading...</div> 
    }
    
    // Renderizamos la página
    const layoutInfo = {
        username: windowUser.username,
        stars:    myuser.stars,
        coins:    myuser.coins,
        image_ID: myuser.picture
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
            <div className='absolute h-screen w-screen flex flex-row justify-start ml-32 items-center space-x-20 align-middle text-center'>
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
            <div className='justify-start w-[160px]'>{info.date}</div>
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
                <div className='w-[150px]'>{info.title}</div>
                <div className='w-[160px]'>{info.date}</div>
            </div>
            <div className='justify-end clickableItem'>
                <Link href={`/profile/see_tale?id=${info.id}&type=tale&title=${info.title}`}>
                    <a><Image src="/icons/play.png" width="40" height="40"/></a>
                </Link>
            </div>            
        </div>
    )
}