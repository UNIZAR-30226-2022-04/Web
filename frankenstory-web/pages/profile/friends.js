import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import FriendScreen from '../../components/FriendScreen'
import Rulette from '../../components/Rulette'

const user = {
  "username":"Jaime",
  "password":"Jaime1234"
}

export default function friends({userInfo}) {

  const layoutInfo = {
    username: user.username,
    stars:    userInfo.stars,
    coins:    userInfo.coins,
    image_ID: userInfo.picture
  } 

    return(
        <Layout data={layoutInfo}>
            <FriendScreen data={user}/>
            <Rulette />
        </Layout>
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
      props: { userInfo }
    }
  }