import Image from 'next/image'

export default function ListOfPeople({data}) {
    return(
        <div className='flex flex-col space-y-4'>
            {data.map((person, index) => ( <PersonInfo key={index} person={person} index={index} /> ) ) }
        </div> 
    )

}

function PersonInfo({person, index}){
    return( 
        <div className='flex flex-row h-12 items-center bg-teal-200 p-1 rounded-lg'>
            
            <h1 className='w-auto xl:text-2xl text-sm text-emerald-600 font-bold'>{index+1}º</h1>
            {index == 0 ? (
                <div className='xl:w-20 w-10'>
                    <Image src='/icons/crown.png' width="38" height="38"/>
                </div>                
            ):(
                <div className='xl:w-20 w-10'/>
            )}
            <h1 className='xl:w-32 w-10 xl:text-2xl text-sm text-emerald-600 font-bold clickableItem'>{person.username}</h1>
            <h1 className='w-44 pl-24 xl:text-2xl text-sm text-emerald-600 font-bold text-right'>{person.stars}</h1>
            <Image src='/icons/star.png' width="38" height="38" />
        </div>  
    )
}