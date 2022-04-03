import Friend from "./Friend"

export default function FriendScreen({name}) {
  return (
    <>
        <div class="friendsBox">
            <div class="friendsTitle">
                <div class="franken2">Buscar amigos</div>
            </div>
            <input class="friendsSearch" type="text" placeholder="Introduce nombre"/>
            <div class="friendsTitle">
                <div class="franken2">Tus amigos</div>
            </div>
            <Friend />
            <div class="friendsTitle">
                <div class="franken2">Peticiones</div>
            </div>
        </div>
    </>
  )
}