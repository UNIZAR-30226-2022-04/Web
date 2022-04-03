import Friend from "./Friend"

export default function FriendList({data,isFriend}) {
    return(
        <>
            {data.map((friend) => 
            (<Friend name={friend.username} isFriend={isFriend} id={friend.id}/>)
            )}
        </>
    )
}