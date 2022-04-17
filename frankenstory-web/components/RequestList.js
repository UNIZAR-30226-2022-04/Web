import FriendRequest from "./FriendRequest"
import { useFriends } from "../contexts/FriendsContext"

export default function RequestList() {

    const { ctxNotifications } = useFriends()
    return(
        <ul>
            {ctxNotifications.map((request) => 
            (<FriendRequest name={request.username} />)
            )}
        </ul>
    )
}
