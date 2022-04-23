import Friend from "./Friend"
import { useFriends } from "../contexts/FriendsContext"

export default function FriendList() {

    const{ ctxFriends } = useFriends()
    return(
        <ul>
            {ctxFriends.map((friend) => 
            <Friend name={friend} isFriend={true} type={"List"}/>
            )}
        </ul>
    )
}
