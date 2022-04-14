import { useState } from "react"
import Friend from "./Friend"

/*{
  "username":"nombre del usuario",
  "password":"contraseña",
  "searchedName":"nombre del usuario buscado"
}


FORMATO DE RESPUESTA
{
  "result":("success","error"),
  "isFound": (boolean) (false,true),
  "picture": (int) ID de la foto de perfil del usuario buscado,
  "isFriend": (boolean) (false,true),
}

 */
const user = {
    username:"Jaime",
    password:"Jaime1234"
}

export default function FriendSearch({user}){
    const url = "http://localhost:3000/api/search_friends"
    const trySearch = async () => {
        const data = {
            username:user.username,
            password:user.password,
            searchedName: name
        }
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json' 
            },
            body: JSON.stringify(data)
          }
          var res = await fetch(url,options)
          return res.json()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setSearchedName(name)
        trySearch().then((res) =>{
            console.log(res)
            if(res.result == "success"){
                if(res.isFound){
                    setFound(true)
                    setFriend(res.isFriend)
                }else{
                    setFound(false)
                }
            }else{
                alert("Error en busqueda de usuario")
            }
        })
    }

    const [name, setName] = useState("")
    const [searchedName, setSearchedName] = useState("")
    const [found, setFound] = useState(false)
    const [isFriend, setFriend] = useState(false)

    return(
        <>
            <div className="friendsTitle">
                <div className="franken2">Buscar amigos</div>
            </div>
            <form onSubmit={onSubmit}>
                <input className="friendsSearch" value={name} type="text" placeholder="Introduce nombre" onChange={(e) => setName(e.target.value)}/>
            </form>
            {found ? <Friend name={searchedName} isFriend={isFriend} user={user}/> : "" }
            
        </>
    )
}