import FriendSearch from "./FriendSearch"
import FriendList from "./FriendList"
import RequestList from "./RequestList"
import { useFriendsUpdate } from "../contexts/FriendsContext"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function FriendScreen() {

    const router = useRouter()
    const { changeFriends } = useFriendsUpdate()
    const { changeNotifications } = useFriendsUpdate()

    const user = {username: localStorage.getItem("username"), password: localStorage.getItem("password")}
    useEffect(() => {
        // Función que llama a la api
        const getData = async () => {
          // Opciones para llamar a la api
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user) 
          }
        
          // Llamada a la api
          console.log(user)
          const res = await fetch('http://localhost:3000/api/friends', options)
          const data = await res.json()
          console.log(data)
    
          // Si no ha ido bien o no estoy logeado volvemos a /
          if(data.result === "error"){
              alert("Error en fetch de amigos")
            router.push("/")
            return
          }
    
          // Llama al hook que almacena la información del usuario
          changeFriends(data.friends)
          changeNotifications(data.notifications)
        }
        getData()
      }, [])  // Llama al useState solo una vez usando []


    return (
    <>
        <div className="friendsBox">
            <FriendSearch/>
            <div className="friendsTitle">
                <div className="franken2">Tus amigos</div>
            </div>
            <div className="scrollBox">
                <FriendList/>
            </div>
            <div className="friendsTitle">
                <div className="franken2">Peticiones</div>
            </div>
            <div className="scrollBox h-auto">
                <RequestList/>
            </div>
        </div>
    </>
  )
}



