export default function FriendRequest({name}){
    const onClick = (isFriend,id) => {
        if (isFriend){
            console.log(`Borrando amigo ${id}`)
        }else{
            console.log(`Añadiendo amigo ${id}`)
        }
    }

    return(
        <div className="friend flex">
            <div>{name}</div>
            <button className="pl-2">X</button>
            <button className="float-right">V</button>
        </div>
    )
}

FriendRequest.defaultProps = {
    name:"Camela",
}