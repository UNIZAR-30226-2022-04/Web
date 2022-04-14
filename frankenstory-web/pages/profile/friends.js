import Layout from '../../components/Layout'
import FriendScreen from '../../components/FriendScreen'
import Rulette from '../../components/Rulette'

const user = {
  "username":"Jaime",
  "password":"Jaime1234"
}

export default function Friends({userInfo, friendInfo}) {

  const layoutInfo = {
    username: user.username,
    stars:    userInfo.stars,
    coins:    userInfo.coins,
    image_ID: userInfo.picture
  } 

    return(
        <Layout data={layoutInfo}>
            <FriendScreen friendInfo={friendInfo} user={user}/>
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
    const friendList = await fetch('http://localhost:3000/api/friends', options)
    const friendInfo = await friendList.json()
    return {
      props: { userInfo, friendInfo }
    }
  }