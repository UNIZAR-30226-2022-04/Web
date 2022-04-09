import Layout from '../../components/Layout'
import { useState } from 'react'
import Image from 'next/image'

const user = {"username": "MrNOPatineto", "password": "12345"}

export default function Settings({userInfo}) {
  const layoutInfo = {
    username: user.username,
    stars:    userInfo.stars,
    coins:    userInfo.coins
  }

  const [passwd, setPass] = useState("")
  const [passwdRep, setPassRep] = useState("")
  
  return(
    <Layout data={layoutInfo}>  

      <div className='flex flex-col h-full w-full items-center justify-center'>
        
        <div className='flex flex-row items-center space-x-5'>
          <Image src='/icons/settings.png' width="28" height="28" />
          <div className='franken'>Ajustes</div>
        </div> 
        
        <div className='settingsLayout'>
          <form className='settingsColLayout'>       
              <div class='franken'>Conteseña</div>
              <input type="text" value={passwd} placeholder="Usuario" />
              <div class='franken' >Repita la Conteseña</div>
              <input type="text" value={passwdRep} placeholder="Usuario" />
              <button className='buttonStyle bg-green-800 hover:bg-green-400' type="submit">Cambiar Contraseña</button>
          </form>

          <div className='settingsColLayout'>
            <div> FACES </div>
            <button class='buttonStyle bg-blue-800 hover:bg-blue-400' type="submit">Cambiar Icono</button>
            <button className='buttonStyle bg-red-800 hover:bg-red-400 ' type="submit">Eliminar Cuenta</button>
          </div>

        </div>
      </div>
            
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