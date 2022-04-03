export default function FriendRequest({name}){
    const onClick = (isFriend,id) => {
        if (isFriend){
            console.log(`Borrando amigo ${id}`)
        }else{
            console.log(`Añadiendo amigo ${id}`)
        }
    }

    return(
        <div class="friend">
            <div>{name}</div>
            <button class="float-right">X</button>
            <button class="float-right">V</button>
        </div>
    )
}

FriendRequest.defaultProps = {
    name:"Camela",
}