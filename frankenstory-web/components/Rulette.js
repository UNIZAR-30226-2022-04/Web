import Image from 'next/image'
import Link from 'next/link'

export default function Rulette({page}) {
    return(
        <div className='absolute flex flex-col right-0 justify-center h-full w-auto items-end pr-12 space-y-3'>            
            <RuletteButton page={page} thisPage='story' icon='/rulette/long_play.png' reference='/storyMode'/>
            
            <div className='pr-24'>
                <RuletteButton page={page} thisPage='quickGame' icon='/rulette/quick_play.png' reference='/quickGame'/>
            </div>
            
            <div className='pr-24'>
                <RuletteButton page={page} thisPage='yourStories' icon='/rulette/your_stories.png' reference='/'/>              
            </div>

            <RuletteButton page={page} thisPage='friends' icon='/rulette/friends.png' reference='/profile/friends'/>

        </div>    
    )
}

function RuletteButton({page, thisPage, icon, reference}){
    return(
        <>
            {page == thisPage?(
                <Link href='/profile/stats'>
                    <div className='ruletteButton'>
                        <a><Image src='/icons/home.png' width="60" height="60"/></a>     
                    </div>
                </Link>
            ):(
                <Link href={reference}>
                    <div className='ruletteButton'>
                        <a><Image src={icon} width="60" height="60" /> </a>
                    </div>  
                </Link>
            )}
        </>
    )    
}