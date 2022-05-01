import Link from 'next/link'
import Image from 'next/image'

export default function StoryList({stories}){
    if(stories.length > 0){
        return(
            <div className='flex flex-col space-y-2'>
                {stories.map( (story, index) => { return <Story key={index} story={story} />} )}
            </div>
        ) 
    }
    return(<></>)
}

function Story({story}){
    return(
        <div className='commonCrate'>
            <p className='w-32 commonFont'>{story.title}</p>
            <p className='w-32 commonSubFont'>{story.creator}</p>
            <div className='relative flex flex-row items-center'>
                <div className='w-16 pr-2 text-indigo-700 text-sm font-bold'>{story.turn}/{story.maxTurns}</div>
                <Link href='/'>
                    <a><Image src="/icons/pencil.png" width="20" height="20"/></a>
                </Link>
            </div>                
        </div>
    )
    
}