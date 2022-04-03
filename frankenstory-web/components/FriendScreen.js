import FriendList from "./FriendList"
import FriendRequest from "./FriendRequest"
import Friend from "./Friend"

export default function FriendScreen({info}) {

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
                <FriendRequest/>
                <FriendRequest/>
                <FriendRequest/>
                <FriendRequest/>
            </div>
            
        </div>
    </>
  )
}
