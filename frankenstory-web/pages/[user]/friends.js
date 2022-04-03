import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import FriendList from '../../components/FriendScreen'
import Rulette from '../../components/Rulette'

export default function friends({info}) {
    return(
        <Layout data={info}>
            <FriendList data={info.name}/>
            <Rulette />
        </Layout>
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