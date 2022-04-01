import { useRouter } from 'next/router'
import Header from '../../components/Head'
import FriendStats from '../../components/Statistics'
import Rulette from '../../components/Rulette'

export default function Stats({info}) {
  
  const headerInfo = {
    username: info.username,
    stars: info.stars,
    coins: info.coins
  }

  return (
    <>
        <Header data={headerInfo}>
          <div class='background'>
            <FriendStats data={info.bestFour} />
            <Rulette />
          </div>  
        </Header> 
    </>
  )
}

export async function getStaticPaths () {
    return {
        paths:[],
        fallback:'blocking'
    }
}

export async function getStaticProps ({params}) {
  const user = params.user
  const info = {
    username: user,
    result: "success", 
    picture: "",
    stars: 3350,
    coins: 1750,
    bestFour: [
      { username: 'Mercu',
        stars: 6575
      },
      {
        username: 'Amiga',
        stars: 4342 
      },
      {
        username: 'Tú',
        stars: 3350
      },
      {
        username: 'Amigo',
        stars: 575
      }
    ]
  }

  return {
    props: { info }
  }
}