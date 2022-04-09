import Image from 'next/image'
import Link from 'next/link'
import Rulette from './Rulette'

export default function Head({children, data}) {
    return(
        <div class='background'>

            {children}   
            <div class='divHead'>
                <div class='franken' >
                    Frankenstory
                </div>
                <Crates person={data} />
            </div> 
                    
        </div>
        
    )
}

//<Crates person={data} />

function Crates({person}){
    const settingsRef = '/' + person.username + '/settings'
    return(
        <div class='crateGroupHead absolute'>            
            <Crate image='/icons/star.png' text={person.stars}/>
            <Crate image='/icons/circle.png' text={person.coins}/>
            <Crate image='/icons/portrait.png' text={person.username}/>
            <div>
                <Link href={settingsRef}>
                    <Image class='clickableItem' src='/icons/settings.png' width="38" height="38"/> 
                </Link> 
            </div>
            <div> 
                <Link href='/login'>
                    <Image class='clickableItem' src='/icons/sign-out.png' width="38" height="38"/> 
                </Link> 
            </div>
        </div>
    )
}

function Crate({image, text}){
    return(
        <div class='crateHead'>
            <Image class='crateHeadPicture' src={image} width="25" height="25" />
            <p class='crateHeadText clickableItem'>{text}</p>
        </div>
    )
}