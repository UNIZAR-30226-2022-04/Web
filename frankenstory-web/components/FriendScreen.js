import FriendList from "./FriendList"
import RequestList from "./RequestList"
import Friend from "./Friend"

export default function FriendScreen({info}) {
    return (
    <>
        <div className="friendsBox">
            <div className="friendsTitle">
                <div className="franken2">Buscar amigos</div>
            </div>
            <input className="friendsSearch" type="text" placeholder="Introduce nombre"/>
            <Friend isFriend={false}/>
            <div className="friendsTitle">
                <div className="franken2">Tus amigos</div>
            </div>
            <div className="scrollBox">
                <FriendList data={info}/>
            </div>
            <div className="friendsTitle">
                <div className="franken2">Peticiones</div>
            </div>

            
        </div>
    </>
  )
}

/*            <div className="scrollBox h-auto">
                <RequestList data={info}/>
            </div>
*/