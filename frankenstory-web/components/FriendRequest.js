export default function FriendRequest({name}){
    const onClick = (isFriend,id) => {
        if (isFriend){
            console.log(`Borrando amigo ${id}`)
        }else{
            console.log(`Añadiendo amigo ${id}`)
        }
    }

    return(
        <div class="friend flex">
            <div>{name}</div>
            <button class="pl-2">X</button>
            <button class="float-right">V</button>
        </div>
    )
}

FriendRequest.defaultProps = {
    name:"Camela",
}