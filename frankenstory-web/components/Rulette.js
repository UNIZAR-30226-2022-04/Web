import Image from 'next/image'
import Link from 'next/link'

export default function Rulette({data, page}) {
    return(
        <div className='flex flex-col h-screen justify-center items-end pr-12 space-y-3'>
            {page=='stats'?(
                <Link href=''>
                    <div className='ruletteButton'>
                        <a><Image src='/rulette/home.png' width="60" height="60"/></a>     
                    </div>
                </Link>
            ):(
                <Link href=''>
                    <div className='ruletteButton'>
                        <a><Image src='/rulette/long_play.png' width="60" height="60"/></a>     
                    </div>
                </Link>
            )}
              
            <div className='pr-24'>
                <Link href=''>
                    <div className='ruletteButton'>
                        <a><Image src='/rulette/quick_play.png' width="60" height="60" /></a>
                    </div>  
                </Link>
            </div>                
            <div className='pr-24'>
                <Link href=''>
                    <div className='ruletteButton'>
                        <a><Image src='/rulette/your_stories.png' width="60" height="60" /> </a>
                    </div>  
                </Link>
            </div>
            <Link href='/profile/friends'>
                <div className='ruletteButton'>
                    <a><Image src='/rulette/friends.png' width="60" height="60" /></a>
                </div>  
            </Link> 
        </div>    
    )
}