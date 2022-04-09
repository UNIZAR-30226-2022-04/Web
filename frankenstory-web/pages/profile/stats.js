import Layout from '../../components/Layout'
import FriendStats from '../../components/Statistics'
import Rulette from '../../components/Rulette'

const user = {"username": "MrNOPatineto", "password": "12345"}

export default function Stats({userInfo}) {
  const layoutInfo = {
    username: user.username,
    stars:    userInfo.stars,
    coins:    userInfo.coins
  } 

  return (
    <>
        <Layout data={layoutInfo}>          
            <FriendStats data={userInfo.bestFour} />            
            <Rulette/> 
        </Layout> 
    </>
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