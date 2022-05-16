import Image from "next/image"
import {useEffect, useState} from 'react'

import Layout from "./Layout"

export default function Spinner({showLayout}){
    const [windowUser, setWindowUser] = useState({})

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

        }else{
          router.push("/")
        }
      }, [])
    
    return(
      <>
        {showLayout === true ? (
          <Layout data={windowUser} inSettingsScreen={false}>
            <div className="flex flex-col w-screen h-screen items-center justify-center align-middle">
                <h1 className="commonTitle">LOADING</h1>
                <Image src="/mooncodeLoading.gif" width={500} height={500}/>
            </div>
          </Layout>
        ):(
          <div className="background flex flex-col w-screen h-screen items-center justify-center align-middle">
              <h1 className="commonTitle">LOADING</h1>
              <Image src="/mooncodeLoading.gif" width={500} height={500}/>
          </div>
        )}
      </>       
    )
}