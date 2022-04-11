import Friend from "./Friend"

export default function FriendList({data}) {

    async function getFriends(e) {

      e.preventDefault()
      console.log(JSON.parse(data))
      const url ="http://localhost:3000/api/friends"
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(data)
      }
      var res = await fetch(url,options)
      //return res.json()
      console.log(res.json())
    }

    //var list = getFriends()

    return(
        <>
            <form onSubmit={getFriends}>
                <button type="submit">Dale</button>
            </form>

        </>
    )


}

/*            {list.map((friend) => 
            (<Friend name={friend.username} isFriend={true}/>)
            )}*/