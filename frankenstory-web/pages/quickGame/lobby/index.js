import Layout from 'components/Layout'
import Image from 'next/image'

const user = {"username": "MrNOPatineto", "password": "12345"}
const creator = "MrNOPatineto"
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
  

export default function QuickGame({userInfo}){
    const layoutInfo = {
        username: user.username,
        stars:    userInfo.stars,
        coins:    userInfo.coins,
        image_ID: userInfo.picture
    }
    
    return(
        <Layout data={layoutInfo} >
            <div className='flex flex-row w-screen items-center h-screen space-x-20 ml-5'>
                <ListOfPlayers participants={sala.participants} />
                <div className='flex flex-col bg-white'>
                    <div className='flex flex-row'>
                        <p>Tiempo: </p>
                        <Image src='/quick-game/clock.png' width="30" height="30"/>
                    </div>
                    
                    {sala.mode == 'random'?(
                        <div className='flex flex-row bg-purple-500'>
                            <p>Modo Aleatorio</p>
                            <Image src='/quick-game/random_words.png' width="30" height="30"/>
                        </div>
                    ):(
                        <div className='flex flex-row bg-blue-500'>
                            <p>Modo Tendencias Twitter</p>
                            <Image src='/quick-game/twitter_trend.png' width="30" height="30"/>
                        </div>
                    )}             
                </div>
            </div>            
        </Layout>
    )
}

function ListOfPlayers({participants}){
    
    return(
        <>
            <div className='flex flex-col space-y-2'>
                <h1>Paricipantes {participants.length}/10</h1>
                {participants.map( (player) => ( <Player key={player.toString()} info={player} /> ) )}
                <div className='flex flex-col'>
                    <h1></h1>
                </div>
            </div>
        </>        
    )
}

function Player({info}){
    console.log(info)
    const imageRoute = '/profPic/icon' + info.picture + '.png'
    return(
        <div className='flex flex-row px-2 b-white'>
            <div className='w-14'><Image src={imageRoute} width="30" height="30"/></div>
            <p className='w-32'>{info.username}</p>
            <p className='w-14'>x{info.stars}</p>
            <div><Image src='/icons/star.png' width="30" height="30"/></div>
        </div>
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
      props: {
            userInfo,
        }
    }
}