import Layout from 'components/Layout'  
import Rulette from 'components/Rulette'
import StoryList from 'components/StoryList'
import { useState } from 'react'

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
    const layoutInfo = {
        username: user.username,
        stars:    userInfo.stars,
        coins:    userInfo.coins,
        image_ID: userInfo.picture
    }
        
    const [visibility, setVisibility] = useState("")

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
                        {visibility=='public'?(
                            <button type='button' onClick={(e) => setVisibility('private')} className='bg-green-700 text-white w-full rounded-3xl'>Sí</button>
                        ):(
                            <button type='button' onClick={(e) => setVisibility('public')} className='bg-red-700 text-white w-full rounded-3xl'>No</button>
                        )}
                        
                    </div>

                    <div className='commonCrate'>
                        <h1 className='commonFont w-32'>Turnos: </h1>
                        <input type='number' min='0' className='text-center w-full rounded-lg'></input>
                    </div>

                    <div className='commonCrate'>
                        <h1 className='commonFont w-32'>Número Caracteres: </h1>
                        <input type='number' min='0' className='text-center w-full rounded-lg'></input>
                    </div>

                    <button type='submit' className='buttonStyle bg-red-300'>
                        Crear Partida
                    </button>
                </form>                
                <Rulette page='story'/>
            </div>            
        </Layout>
    )
}

function changeVisibility(){

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