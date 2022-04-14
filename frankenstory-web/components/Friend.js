export default function Friend({name,isFriend,user}){
    const onClick = (e) => {
        e.preventDefault()
        if (isFriend){
            console.log(`${user.username} borra como amigo a ${name}`)
        }else{
            console.log(`${user.username} añade como amigo ${name}`)
        }
    }

    return(
        <div className="friend">
            <div>{name}</div>
            <button className="float-right" onClick={onClick}> {isFriend ? "-" : "+" } </button>
        </div>
    )
}