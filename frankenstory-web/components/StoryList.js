import Link from 'next/link'
import Image from 'next/image'

export default function StoryList({stories}){
    if(stories.length > 0){
        return(
            <div className='flex flex-col space-y-2 w-[100]'>
                {stories.map( (story) => { return <Story key={story.toString()} story={story} />} )}
            </div>
        ) 
    }
    return(<></>)
}

function Story({story}){
    return(
        <div className='taleCrate'>
            <p className='taleTitle'>{story.title}</p>
            <p className='taleCreator'>{story.creator}</p>
            <div className='relative flex flex-row items-center'>
                <div className='taleTurns'>{story.turn}/{story.maxTurns}</div>
                <Link href='/'>
                    <a><Image src="/icons/pencil.png" width="20" height="20"/></a>
                </Link>
            </div>                
        </div>
    )
    
}