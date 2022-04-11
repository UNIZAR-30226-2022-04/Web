import Image from 'next/image'

export default function Head({data}) {
    return(
        <div className='divHead'>
            <div className='franken' >
                Frankenstory
            </div>
            <Crates person={data} />
        </div>
    )
}

function Crates({person}){
    return(
        <div className='crateGroupHead'>
           
            <Crate image='/icons/star.png' text={person.stars}/>
            <Crate image='/icons/circle.png' text={person.coins}/>
            <Crate image='/icons/portrait.png' text={person.name}/>
            <div> <Image src='/icons/settings.png' width="38" height="38"/> </div>
            <div> <Image src='/icons/sign-out.png' width="38" height="38"/> </div>
        </div>
    )
}

function Crate({image, text}){
    return(
        <div className='crateHead'>
            <Image className='crateHeadPicture' src={image} width="25" height="25" />
            <p className='crateHeadText'>{text}</p>
        </div>
    )
}