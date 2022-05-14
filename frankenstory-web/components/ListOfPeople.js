import Image from 'next/image'

export default function ListOfPeople({data, showFaces}) {
    return(
        <div className='flex flex-col space-y-4'>
            {data.map((person, index) => ( <PersonInfo key={index} person={person} index={index} faces={showFaces} /> ) ) }
        </div> 
    )

}

function PersonInfo({person, index, faces}){
    const image = `/profPic/icon${person.picture}.png`
    return( 
        <div className='flex flex-row h-12 justify-between items-center bg-teal-200 p-2 rounded-lg'>
            <div className='flex flex-row'>
                {faces ? (
                    <>
                        <Image src={image} width="38" height="38"/>
                        <div className='w-5'/>
                    </>
                ):(
                    <>
                        <h1 className='w-auto xl:text-2xl text-sm text-emerald-600 font-bold'>{index+1}º</h1>
                        {index == 0 ? (
                            <>
                                <Image src='/icons/crown.png' width="38" height="38"/>
                                <div className='w-5'/>
                            </>            
                        ):(
                            <>
                                <div className='w-[38px]'/>
                                <div className='w-5'/>
                            </>
                            
                        )}
                    </>
                    
                )}
                <h1 className='xl:w-32 w-10 xl:text-2xl text-sm text-emerald-600 font-bold'>{person.username}</h1>
            </div>
            
            
            <div className='flex flex-row'>
                <h1 className='pl-24 xl:text-2xl text-sm text-emerald-600 font-bold text-right'>{person.stars}</h1>
                <Image src='/icons/star.png' width="38" height="38" />
            </div>
            
        </div>  
    )
}