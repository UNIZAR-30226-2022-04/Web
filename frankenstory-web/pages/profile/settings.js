import Layout from 'components/Layout'
import { useState } from 'react'
import Image from 'next/image'

const user = {username: "MrNOPatineto", password: "12345"}
const testDelete = {username: "dabumm", password: "adios"}

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
  const [deleteCheck, setDeleteCheck] = useState("")

  return(
    <Layout data={layoutInfo} inSettingsScreen='true'>  

      <div className='flex flex-col h-full w-full items-center justify-center'>
        
        <div className='flex flex-row items-center space-x-5'>
          <Image src='/icons/settings.png' width="28" height="28" />
          <div className='commonTitle'>Ajustes</div>
        </div> 
        
        <div className='flex flex-row items-center space-x-56 '>
          <form className='flex flex-col space-y-2 '>       
              <div className='commonTitle'>Conteseña</div>
              <input type="password" value={passwd} placeholder="**********" onChange={(e) => setPass(e.target.value)}/>
              <div className='commonTitle' >Repita la Conteseña</div>
              <input type="password" value={passwdRep} placeholder="**********" onChange={(e) => setPassRep(e.target.value)}/>
              <button className='buttonStyle bg-green-800 hover:bg-green-400' type="button" onClick={() => changePassword(passwd, passwdRep)}>Cambiar Contraseña</button>
          </form>

          <div className='flex flex-col space-y-2 '>
              <div className="flex flex-col items-center space-y-4">
                
                <div className="flex flex-row space-x-3">
                  <ProfilePic iconId='0' path='/profPic/icon0.png' selectedIcon={icon} setIcon={setIcon}/>
                  <ProfilePic iconId='1' path='/profPic/icon1.png' selectedIcon={icon} setIcon={setIcon}/>
                  <ProfilePic iconId='2' path='/profPic/icon2.png' selectedIcon={icon} setIcon={setIcon}/>
                  <ProfilePic iconId='3' path='/profPic/icon3.png' selectedIcon={icon} setIcon={setIcon}/>           
                </div>

                <div className="flex flex-row space-x-3">
                  <ProfilePic iconId='4' path='/profPic/icon4.png' selectedIcon={icon} setIcon={setIcon}/>
                  <ProfilePic iconId='5' path='/profPic/icon5.png' selectedIcon={icon} setIcon={setIcon}/>
                  <ProfilePic iconId='6' path='/profPic/icon6.png' selectedIcon={icon} setIcon={setIcon}/>
                  <ProfilePic iconId='7' path='/profPic/icon7.png' selectedIcon={icon} setIcon={setIcon}/>
                </div>

                <div className="flex flex-row space-x-3">   
                  <ProfilePic iconId='8' path='/profPic/icon8.png' selectedIcon={icon} setIcon={setIcon}/>
                  <ProfilePic iconId='9' path='/profPic/icon9.png' selectedIcon={icon} setIcon={setIcon}/>
                </div>
            </div>  
            <button className='buttonStyle bg-blue-800 hover:bg-blue-400' type="button" onClick={() => changeIcon(icon)}>Cambiar Icono</button>
            {deleteCheck == ''?(
              <button className='buttonStyle bg-red-800 hover:bg-red-400 ' type="button" onClick={() => deleteUser(deleteCheck, setDeleteCheck)}>Eliminar Cuenta</button>
            ):(
              <button className='buttonStyle bg-red-800 hover:bg-red-400 ' type="button" onClick={() => deleteUser(deleteCheck, setDeleteCheck)}>Estoy seguro</button>
            )}
            
          </div>

        </div>
      </div>
            
    </Layout>
  )
}

function ProfilePic({iconId, path, selectedIcon, setIcon}){
  if(selectedIcon == iconId){
    return(
      <div className='rounded-full h-12 w-12 ring ring-violet-800'>
        <Image id={iconId}  src={path} width="50" height="50" onClick={(e) => setIcon(e.target.id) }/>
      </div>
    )
  }else{
    return(
      <div className='hover:ring hover:ring-violet-300 rounded-full h-12 w-12'>
        <Image id={iconId}  src={path} width="50" height="50" onClick={(e) => setIcon(e.target.id) }/>
      </div>
    )
  }
  
}

async function changeIcon(icon){
  if(icon != ''){
    const info = {
      "username": user.username,
      "password": user.password,
      "newPicture": parseInt(icon)
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info) 
    }
    
    const result = await fetch('http://localhost:3000/api/change_picture', options)
    const resultJson = await result.json()
    if(resultJson.result == 'success'){
      window.location.reload()
    }else{
      alert("Icono no cambiado")
    }
  }
}

// cambiar alerts por algo mejor
async function changePassword(passwd, passwdRep){
  if(passwd == ''){
    alert("Las contraseñas no puede estar vacía")
  }else if(passwd != passwdRep){
    alert("Las contraseñas no coinciden")
  }else if(passwd.length < 10){
    alert("Las contraseñas debe superar los 10 caracteres")
  }else{
    const info = {
      "username": user.username,
      "password": user.password,
      "newPassword": passwd
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info) 
    }
    
    const result = await fetch('http://localhost:3000/api/change_password', options)
    const resultJson = await result.json()
    if(resultJson.result == 'success'){
      window.location.reload()
    }else{
      alert("Conteseña no cambiada")
    }
  }
}

async function deleteUser(deleteCheck, setDeleteCheck){
  if(deleteCheck == ''){
    alert("Seguro que quieres borrar la cuenta, esta acción no se puede deshacer")
    setDeleteCheck("estoy seguro")
  }else{
    setDeleteCheck('')
    
    const info = {
      "username": testDelete.username,
      "password": testDelete.password
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info) 
    }
    
    const result = await fetch('http://localhost:3000/api/delete_user', options)
    const resultJson = await result.json()
    if(resultJson.result == 'success'){
      window.location.reload()
    }else{
      alert("Cuenta no borrada")
    }
  }
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