import FriendRequest from "./FriendRequest"

export default function FriendList({notifications, user}) {
    return(
        <>
            {notifications.map((request) => 
            (<FriendRequest name={request.username} user={user}/>)
            )}
        </>
    )
}
