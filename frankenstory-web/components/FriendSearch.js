import { useState } from "react"
import Friend from "./Friend"
import { useLogin } from "../contexts/LoginContext"

export default function FriendSearch(){

    const { ctxUsername, ctxPassword } = useLogin()
    const url = "http://localhost:3000/api/search_friends"
    const user = {username: ctxUsername, password: ctxPassword}
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
        setFound(false)
        setSearchedName(name)
        trySearch().then((res) =>{
            console.log(res)
            if(res.result == "success"){
                if(res.isFound){
                    setFriend(res.isFriend)
                    setFound(true)
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
            {found ? <Friend name={searchedName} isFriend={isFriend} user={user} type={"Search"}/> : "" }
            
        </>
    )
}