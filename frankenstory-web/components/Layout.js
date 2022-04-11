import Image from 'next/image'
import Link from 'next/link'

export default function Layout({children, data, inSettingsScreen}) {
    return(
        <div className='background'>            
            <div className='divHead'>
                <Image src='/frankenstory.png' width="200" height="50"/>
                <Crates person={data} changeSettings={inSettingsScreen} />
            </div> 
            {children}
        </div>        
    )
}

function Crates({person, changeSettings}){
    const imageRoute = '/profPic/icon' + person.image_ID + '.png'
    console.log(imageRoute)
    return(
        <div className='crateGroupHead absolute'>            
            <Crate image='/icons/star.png' text={person.stars}/>
            <Crate image='/icons/mooncoin.png' text={person.coins}/>
            <Crate image={imageRoute} text={person.username}/>            
            
            {changeSettings ? (
                <Link href='/profile/stats'>
                    <a> <Image className='clickableItem' src='/icons/home.png' width="38" height="38"/> </a>                    
                </Link> 
            ):(
                <Link href='/profile/settings'>
                <a> <Image className='clickableItem' src='/icons/settings.png' width="38" height="38"/> </a>                    
                </Link> 
            )}

            <Link href='/login'>
                <a> <Image className='clickableItem' src='/icons/sign-out.png' width="38" height="38"/> </a>
            </Link>
        </div>
    )
}

function Crate({image, text}){
    return(
        <div className='crateHead'>
            <Image className='crateHeadPicture' src={image} width="30" height="30"/>
            <p className='crateHeadText clickableItem'>{text}</p>
        </div>
    )
}