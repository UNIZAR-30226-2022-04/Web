import { useState } from "react"

export default function Friend({name,isFriend,user}){

    const url = "http://localhost:3000/api/manage_friendship"
    
    var data = {
        username:user.username,
        password:user.password,
        targetUser: name,
        type: "add"
    }

    const manageFriend = async () => {
        console.log(data)
        var options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json' 
            },
            body: JSON.stringify(data)
          }
          console.log(options)
          var res = await fetch(url,options)
          return res.json()
    }

    const onClick = () => {
        if (addFriend){
            data.type = "add"
            console.log(data)
            manageFriend().then((res) =>{
                if(res.result == "success"){
                    setAdd(false)
                }else{
                    alert("Error enviando petición")
                }
            })
        }else{
            data.type = "delete"
            console.log(data)
            manageFriend().then((res) =>{
                console.log(res)
                if(res.result == "success"){
                    setAdd(true)
                }else{
                    alert("Error enviando petición")
                }
            })

        }
    }

    const [addFriend, setAdd] = useState(!isFriend)

    return(
        <div className="friend">
            <div>{name}</div>
            <button className="float-right" onClick={onClick}> {addFriend ? "+" : "-" } </button>
        </div>
    )
}