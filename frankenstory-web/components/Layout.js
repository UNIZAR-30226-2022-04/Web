import Image from 'next/image'
import Link from 'next/link'

export default function Layout({children, data, inSettingsScreen}) {
    return(
        <div className='background'>            
            <div className='relative flex bg-slate-900 shadow-lg items-center p-3'>
                <Image src='/frankenstory.png' width="200" height="50"/>
                <Crates person={data} changeSettings={inSettingsScreen} />
            </div> 
            {children}
        </div>        
    )
}

function Crates({person, changeSettings}){
    const imageRoute = '/profPic/icon' + person.image_ID + '.png'
    return(
        <div className='absolute flex flex-row justify-end pr-5 pl-5 space-x-3 w-full'>            
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
        <div className='relative flex flex-row items-center rounded-lg h-10 w-56 pl-3 bg-gradient-to-r from-teal-600 to-green-400'>
            <Image src={image} width="30" height="30"/>
            <p className='absolute right-3 text-white text-xl text-center font-bold clickableItem'>{text}</p>
        </div>
    )
}