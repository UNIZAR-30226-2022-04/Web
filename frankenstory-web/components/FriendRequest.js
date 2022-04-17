import { useFriends ,useFriendsUpdate } from "../contexts/FriendsContext"
import { useLogin } from "../contexts/LoginContext"

export default function FriendRequest({name}){

    const { ctxFriends, ctxNotifications } = useFriends()
    const { ctxUsername, ctxPassword } = useLogin()

    const { changeFriends, changeNotifications } = useFriendsUpdate()

    const url = "http://localhost:3000/api/answer_petition"

    var data = {
        username:ctxUsername,
        password:ctxPassword,
        targetUser: name,
        answer: 0
    }

    const sendAnswer = async () => {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json' 
            },
            body: JSON.stringify(data)
          }
        const res = await fetch(url, options)
        return res.json()
    }

    const answerPetition = () => {
        sendAnswer().then((res) =>{
            if(res.result != "success"){
                alert("Error al responder a la solicitud")
            }else{
                var updatedNotifications = (ctxNotifications.filter((friend) => friend.username !== data.targetUser))
                changeNotifications(updatedNotifications)
                if(data.answer == 1){
                    changeFriends([...ctxFriends, data.targetUser])
                }
            }
        })
    }

    const Accept = () => {
        data.answer = 1
        answerPetition()
    }

    const Reject = () => {
        data.answer = 0
        answerPetition()
    }


    return(
        <div className="friend flex">
            <div>{name}</div>
                <button className="pl-2" onClick={Reject}>X</button>
                <button className="float-right" onClick={Accept}>V</button>
        </div>
    )
}