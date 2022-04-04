import Request from "./FriendRequest"

export default function RequestList({data}) {
    return(
        <>
            {data.map((request) => 
            (<Request name={request.username}/>)
            )}
        </>
    )
}