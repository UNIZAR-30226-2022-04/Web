import FriendList from "./FriendList"
import RequestList from "./RequestList"
import Friend from "./Friend"

export default function FriendScreen({info}) {
    const requests=[
        {username: "Benito"},
        {username: "Camela"}
    ]

    const friends= [
        { username: 'Mercu',
          id: 4
        },
        {
          username: 'Amiga',
          id: 3 
        },
        {
          username: 'Tú',
          id: 2
        },
        {
          username: 'Amigo',
          id: 1
        },
      ]
    return (
    <>
        <httpProtocol>
        <customHeaders>
                <add name="Access-Control-Allow-Origin" value="*" />
            </customHeaders>
        </httpProtocol>
        <div class="friendsBox">
            <div class="friendsTitle">
                <div class="franken2">Buscar amigos</div>
            </div>
            <input class="friendsSearch" type="text" placeholder="Introduce nombre"/>
            <Friend isFriend={false}/>
            <div class="friendsTitle">
                <div class="franken2">Tus amigos</div>
            </div>
            <div class="scrollBox">
                <FriendList data={friends}/>
            </div>
            <div class="friendsTitle">
                <div class="franken2">Peticiones</div>
            </div>
            <div class="scrollBox h-auto">
                <RequestList data={requests}/>
            </div>
            
        </div>
    </>
  )
}
