import Friend from "./Friend"

export default function FriendList({friends,user}) {

    return(
        <ul>
            {friends.map((friend) => 
            <Friend key={friend} name={friend} isFriend={true} user={user}/>
            )}
        </ul>
    )
}
