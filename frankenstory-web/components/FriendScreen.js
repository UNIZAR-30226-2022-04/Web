import FriendSearch from "./FriendSearch"
import FriendList from "./FriendList"
import RequestList from "./RequestList"

export default function FriendScreen({friendInfo, user}) {
    return (
    <>
        <div className="friendsBox">
            <FriendSearch user={user}/>
            <div className="friendsTitle">
                <div className="franken2">Tus amigos</div>
            </div>
            <div className="scrollBox">
                <FriendList friends={friendInfo.friends} user={user}/>
            </div>
            <div className="friendsTitle">
                <div className="franken2">Peticiones</div>
            </div>
            <div className="scrollBox h-auto">
                <RequestList notifications={friendInfo.notifications} user={user}/>
            </div>
        </div>
    </>
  )
}



