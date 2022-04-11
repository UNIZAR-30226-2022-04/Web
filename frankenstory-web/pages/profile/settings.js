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
    <Layout data={layoutInfo} inSettingsScreen='true'>  

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
                  <Image id='0' src="/profPic/icon0.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                  <Image id="1" src="/profPic/icon1.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                  <Image id="2" src="/profPic/icon2.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                  <Image id="3" src="/profPic/icon3.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                </div>
                <div className="flex flex-row items-center">
                  <Image id="4" src="/profPic/icon4.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                  <Image id="5" src="/profPic/icon5.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                  <Image id="6" src="/profPic/icon6.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                  <Image id="7" src="/profPic/icon7.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                </div>
                <div className="flex flex-row items-center">   
                  <Image id="8" src="/profPic/icon8.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                  <Image id="9" src="/profPic/icon9.png" width="50" height="50" onClick={(e) => setIcon(e.target.id)}/>
                </div>
            </div>  
            <button className='buttonStyle bg-blue-800 hover:bg-blue-400' type="button" onClick={() => changeIcon(icon)}>Cambiar Icono</button>
            <button className='buttonStyle bg-red-800 hover:bg-red-400 ' type="button" onClick={() => deleteUser(icon)}>Eliminar Cuenta</button>
          </div>

        </div>
      </div>
            
    </Layout>
  )
}

async function changeIcon(icon){
  const info = {
    "username": user.username,
    "password": user.password,
    "icon": icon
  }

  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info) 
  }
  
  const friendStats = await fetch('http://localhost:3000/api/change_picture', options)
  console.log(await friendStats.json())
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