export default function Friend({name,isFriend}){
    const onClick = (isFriend) => {
        if (isFriend){
            console.log(`Borrando amigo ${name}`)
        }else{
            console.log(`Añadiendo amigo ${name}`)
        }
    }

    return(
        <div className="friend">
            <div>{name}</div>
            <button className="float-right"> {isFriend ? "-" : "+" } </button>
        </div>
    )
}

Friend.defaultProps = {
    name:"Benito",
    isFriend: true
}