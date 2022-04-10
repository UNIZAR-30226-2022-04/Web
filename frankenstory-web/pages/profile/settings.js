import Layout from '../../components/Layout'
import { useState } from 'react'
import Image from 'next/image'

const user = {"username": "MrNOPatineto", "password": "12345"}



export default function Settings({userInfo}) {
  const layoutInfo = {
    username: user.username,
    stars:    userInfo.stars,
    coins:    userInfo.coins,
    image_ID: userInfo.picture
  }

  const [passwd, setPass] = useState("")
  const [passwdRep, setPassRep] = useState("")
  const [icon, setIcon] = useState("")

  return(
    <Layout data={layoutInfo}>  

      <div className='flex flex-col h-full w-full items-center justify-center'>
        
        <div className='flex flex-row items-center space-x-5'>
          <Image src='/icons/settings.png' width="28" height="28" />
          <div className='franken'>Ajustes</div>
        </div> 
        
        <div className='settingsLayout'>
          <form className='settingsColLayout'>       
              <div className='franken'>Conteseña</div>
              <input type="text" value={passwd} placeholder="Contrseña" onChange={(e) => setPass(e.target.value)}/>
              <div className='franken' >Repita la Conteseña</div>
              <input type="text" value={passwdRep} placeholder="Repita la contraseña" onChange={(e) => setPassRep(e.target.value)}/>
              <button className='buttonStyle bg-green-800 hover:bg-green-400' type="submit">Cambiar Contraseña</button>
          </form>

          <div className='settingsColLayout'>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-row items-center">
                  <Image id="icon0" value="0" src="/profPic/icon0.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                  <Image id="icon1" value="1" src="/profPic/icon1.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                  <Image id="icon2" value="2" src="/profPic/icon2.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                  <Image id="icon3" value="3" src="/profPic/icon3.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                </div>
                <div className="flex flex-row items-center">
                  <Image id="icon4" value="4" src="/profPic/icon4.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                  <Image id="icon5" value="5" src="/profPic/icon5.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                  <Image id="icon6" value="6" src="/profPic/icon6.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                  <Image id="icon7" value="7" src="/profPic/icon7.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                </div>
                <div className="flex flex-row items-center">                  
                  <Image id="icon8" value="8" src="/profPic/icon8.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                  <Image id="icon9" value="9" src="/profPic/icon9.png" width="50" height="50" onclick={(e) => setIcon(e.value)}/>
                </div>
            </div>  
            <button className='buttonStyle bg-blue-800 hover:bg-blue-400' type="button" onclick="changeIcon()">Cambiar Icono</button>
            <button className='buttonStyle bg-red-800 hover:bg-red-400 ' type="button" onclick="deleteUser()">Eliminar Cuenta</button>
          </div>

        </div>
      </div>
            
    </Layout>
  )
}

async function changeIcon(){
  const body = {
    "username": user.username,
    "password": user.password,
    "icon": icon
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body) 
  }
  
  const friendStats = await fetch('http://localhost:3000/api/change_picture', options)
}

function deleteUser(){

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