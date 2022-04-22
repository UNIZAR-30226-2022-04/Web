import Image from 'next/image'

let best = true

export default function Stats({data}) {
    return(
        <div className='absolute h-screen flex flex-col justify-center pl-20 space-y-2'>
            <div className='relative flex flex-row h-auto w-auto'>
                <Image src='/icons/stats.png' width="40" height="25" />
                <h1 className='franken'>Statistics</h1>
            </div>
            
            <div className='flex flex-col space-y-4'>
                {data.map((person, index) => ( <PersonInfo key={index} person={person} index={index} /> ) ) }
            </div>  
        </div>
    )

}

function PersonInfo({person, index}){
    return( 
        <div className='flex flex-row items-center bg-teal-200 p-1 rounded-lg'>
            
            <h1 className='w-auto xl:text-2xl text-sm text-emerald-600 font-bold'>{index+1}º</h1>
            {index == 0 ? (
                <div className='xl:w-20 w-10'>
                    <Image src='/icons/crown.png' width="38" height="38"/>
                </div>                
            ):(
                <div className='xl:w-20 w-10'/>
            )}
            <h1 className='xl:w-32 w-10 xl:text-2xl text-sm text-emerald-600 font-bold clickableItem'>{person.username}</h1>
            <h1 className='pl-24 xl:text-2xl text-sm text-emerald-600 font-bold'>{person.stars}</h1>
            <Image src='/icons/star.png' width="38" height="38" />
        </div>  
    )
}