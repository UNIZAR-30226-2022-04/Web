import Image from 'next/image'

export default function Stats({data}) {
    return(
        <div className='statsBox'>
            <div className='statsTitle'>
                <Image src='/icons/stats.png' width="40" height="25" />
                <h1 className='franken'>Statistics</h1>
            </div>
            
            <div className='statsFriends'>
                {data.map((person) => ( <PersonInfo key={person.toString()} person={person} /> ) ) }
            </div>  
        </div>
    )

}

function PersonInfo({person}){
    return(
        <div className='statsOneFriend'>   
            <h1 className='personNameStats clickableItem'>{person.username}</h1>
            <h1 className='starsStats'>{person.stars}</h1>
            <Image src='/icons/star.png' width="38" height="38"/>
        </div>  
    )
}