export default function FriendRequest({name, user}){
    const Accept = (e) => {
        e.preventDefault()
        console.log(`${user.username} accepted ${name}`)
    }
    
    const Reject = (e) => {
        e.preventDefault()
        console.log(`${user.username} rejected ${name}`)
    }

    return(
        <div className="friend flex">
            <div>{name}</div>
            <button className="pl-2" onClick={Reject}>X</button>
            <button className="float-right" onClick={Accept}>V</button>
        </div>
    )
}