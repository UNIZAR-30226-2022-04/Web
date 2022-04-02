/*import Image from 'next/image'

export default function Head({data}) {
    return(
        <div class='divHead'>
            <div class='franken' >
                Frankenstory
            </div>
            <Crates person={data} />
        </div>
    )
}

function Crates({person}){
    return(
        <div class='crateGroupHead'>
           
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
        <div class='crateHead'>
            <Image class='crateHeadPicture' src={image} width="25" height="25" />
            <p class='crateHeadText'>{text}</p>
        </div>
    )
}*/