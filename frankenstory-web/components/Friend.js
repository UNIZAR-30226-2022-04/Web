import { useState } from "react"
import { useFriends, useFriendsUpdate } from "../contexts/FriendsContext"

export default function Friend({name,isFriend,type}){

    const { ctxFriends, ctxNotifications } = useFriends()
    const [friendState, setFriendState] = useState(isFriend)

    const { changeFriends, changeNotifications } = useFriendsUpdate()

    const url = "http://localhost:3000/api/manage_friendship"
    
    var data = {
        username:localStorage.getItem("username"),
        password:localStorage.getItem("password"),
        targetUser: name,
        type: "add"
    }

    const manageFriend = async () => {
        var options = {
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

    const onClick = () => {
        if (!friendState){
            data.type = "add"
            manageFriend().then((res) =>{
                if(res.result == "success"){
                    var petition = (ctxNotifications.filter((friend) => friend.username == data.targetUser))
                    if((petition.length) != 0 ){
                        changeFriends([...ctxFriends, data.targetUser])
                        var updatedNotifications = (ctxNotifications.filter((friend) => friend.username !== data.targetUser))
                        changeNotifications(updatedNotifications)
                    }
                    if(type == "Search"){
                        setFriendState(!friendState)
                    }
                }else{
                    alert("Error enviando petición")
                }
            })
        }else{
            data.type = "delete"
            manageFriend().then((res) =>{
                if(res.result == "success"){
                    var updatedFriends = (ctxFriends.filter((friend) => friend !== data.targetUser))
                    changeFriends(updatedFriends)
                    if(type == "Search"){
                        setFriendState(!friendState)
                    }
                }else{
                    alert("Error enviando petición")
                }
            })
        }
    }



    return(
        <div className="friend">
            <div>{name}</div>
            <button className="float-right" onClick={onClick}> {friendState ? "-" : "+" } </button>
        </div>
    )
}