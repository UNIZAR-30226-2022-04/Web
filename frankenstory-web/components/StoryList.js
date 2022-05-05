import Link from 'next/link'
import Image from 'next/image'

export default function StoryList({stories, isVoteStory}){
    if(stories.length > 0){
        return(
            <div className='flex flex-col space-y-2'>
                {stories.map( (story, isVoteStory, index) => { return <Story key={index} story={story} isVoteStory={isVoteStory}/>} )}
            </div>
        ) 
    }
    return(<></>)
}

function Story({story, isVoteStory}){
    const lastTurn = (story.turn == story.max_turns - 1) ? 1 : 0;
    return(
        <div className='commonCrate'>
            <p className='w-32 commonFont'>{story.title}</p>
            <p className='w-32 commonSubFont'>{story.creator}</p>
            <div className='relative flex flex-row items-center'>
                <div className='w-16 pr-2 text-indigo-700 text-sm font-bold'>{story.turn}/{story.max_turns}</div>
                {isVoteStory ? (
                    <Link href={`/storyMode/continue?id=${story.story_id}&lastTurn=${lastTurn}&creator=${story.creator}`}>
                        <a><Image src="/icons/pencil.png" width="20" height="20"/></a>
                    </Link>
                ):(
                    <Link href={`/storyMode/vote?id=${story.story_id}&creator=${story.creator}`}>
                        <a><Image src="/icons/pencil.png" width="20" height="20"/></a>
                    </Link>
                )}
                
            </div>                
        </div>
    )
    
}