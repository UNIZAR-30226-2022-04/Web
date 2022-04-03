export default function Friend({name,isFriend,id}){
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
            <button class="float-right"> {isFriend ? "-" : "+" } </button>
        </div>
    )
}

Friend.defaultProps = {
    name:"Benito",
    isFriend: true
}