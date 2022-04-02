import Image from 'next/image'

export default function Stats({data}) {
    return(
        <>
            <div class='statsBox'>
                <div class='statsTitle'>
                    <Image src='/icons/stats.png' width="40" height="25" />
                    <h1 class='franken'>Statistics</h1>
                </div>
                
                <div class='statsFriends'>
                    {data.map((person) => ( <PersonInfo person={person} /> ) ) }
                </div>  
            </div>
        </>
    )

}

function PersonInfo({person}){
    return(
        <div class='statsOneFriend'>   
            <h1 class='personNameStats clickableItem'>{person.username}</h1>
            <h1 class='starsStats'>{person.stars}</h1>
            <Image src='/icons/star.png' width="38" height="38"/>
        </div>  
    )
}