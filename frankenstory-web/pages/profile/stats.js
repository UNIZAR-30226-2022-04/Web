import Layout from 'components/Layout'
import FriendStats from 'components/Statistics'
import Rulette from 'components/Rulette'
import { useLogin } from "contexts/LoginContext"
import useSwr from 'swr'
import { useRouter } from "next/router"
import Router from 'next/router'
import { useEffect } from 'react'

// const user = {"username": "MrNOPatineto", "password": "12345"}
const fetcher = (url, options) => fetch(url, options).then((res) => res.json())

export default function Stats({userInfo}) { 
  const {ctxUsername, ctxPassword, ctxLogged, setctxLogged} = useLogin()
  const router = useRouter()

  console.log("Username: ", ctxUsername)
  console.log("Pass: ",ctxPassword)
  console.log("Logged: ",ctxLogged)

  if(!ctxLogged){
    useEffect(() => {
      Router.push("http://localhost:3000/login")
    });
  }  

  const user = {username: ctxUsername, password: ctxPassword}

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user) 
  }   

  const { data, error } = useSwr(['http://localhost:3000/api/home', options], fetcher)
  
  if(error){
    console.log(error)
    return  <div>FRACASO ABSOLUTO</div>
  }

  if(!data){
    return <div>loading...</div> 
  }

  console.log(data)
  
  const layoutInfo = {
    username: ctxUsername,
    stars:    data.stars,
    coins:    data.coins,
    image_ID: data.picture
  } 

  return (
    <>
        <Layout data={layoutInfo}>
          <div className='flex flex-row w-screen items-center h-screen space-x-20 ml-5'>
            <FriendStats data={data.bestFour} />            
            <Rulette /> 
          </div>                        
        </Layout> 
    </>
  )
}

/*
  

export async function getStaticProps () {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ctxUser) 
  }
  
  const friendStats = await fetch('http://localhost:3000/api/home', options)
  const userInfo = await friendStats.json()

  return {
    props: { userInfo }
  }
}
*/