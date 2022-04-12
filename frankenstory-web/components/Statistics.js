import Image from 'next/image'

export default function Stats({data}) {
    return(
        <div className='absolute h-screen flex flex-col justify-center pl-20 space-y-2'>
            <div className='relative flex flex-row h-auto w-auto'>
                <Image src='/icons/stats.png' width="40" height="25" />
                <h1 className='franken'>Statistics</h1>
            </div>
            
            <div className='flex flex-col bg-lime-900 bg-opacity-20 rounded-lg px-3 py-4 space-y-4'>
                {data.map((person) => ( <PersonInfo key={person.toString()} person={person} /> ) ) }
            </div>  
        </div>
    )

}

function PersonInfo({person}){
    return(
        <div className='flex flex-row items-center '>   
            <h1 className='w-auto franken clickableItem'>{person.username}</h1>
            <h1 className='pl-24 franken'>{person.stars}</h1>
            <Image src='/icons/star.png' width="38" height="38"/>
        </div>  
    )
}