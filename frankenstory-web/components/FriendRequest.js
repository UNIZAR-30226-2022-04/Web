export default function FriendRequest({name, user}){

    const url = "http://localhost:3000/api/answer_petition"

    var data = {
        username:user.username,
        password:user.password,
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
            }
        })
    }

    const Accept = () => {
        data.answer = 0
        answerPetition()
    }

    const Reject = () => {
        data.answer = 1
        answerPetition()
    }


    return(
        <div className="friend flex">
            <div>{name}</div>
                <button className="pl-2" onClick={Accept}>X</button>
                <button className="float-right" onClick={Reject}>V</button>
        </div>
    )
}