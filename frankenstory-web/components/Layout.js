import Image from 'next/image'
import Link from 'next/link'

export default function Head({children, data}) {
    return(
        <div class='background'>            
            <div class='divHead'>
                <div class='franken' >
                    Frankenstory
                </div>
                <Crates person={data} />
            </div> 
            {children}
        </div>        
    )
}

function Crates({person}){
    const imageRoute = '/profPic/icon' + person.image_ID + '.png'
    console.log(imageRoute)

    return(
        <div className='crateGroupHead absolute'>            
            <Crate image='/icons/star.png' text={person.stars}/>
            <Crate image='/icons/circle.png' text={person.coins}/>
            <Crate image={imageRoute} text={person.username}/>
            <div>
                <Link href='/profile/settings'>
                    <Image className='clickableItem' src='/icons/settings.png' width="38" height="38"/> 
                </Link> 
            </div>
            <div> 
                <Link href='/login'>
                    <Image className='clickableItem' src='/icons/sign-out.png' width="38" height="38"/> 
                </Link> 
            </div>
        </div>
    )
}

function Crate({image, text}){
    return(
        <div className='crateHead'>
            <Image className='crateHeadPicture' src={image} width="25" height="25"/>
            <p className='crateHeadText clickableItem'>{text}</p>
        </div>
    )
}