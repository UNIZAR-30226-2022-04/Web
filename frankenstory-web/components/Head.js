import styles from '../styles/Head.module.css'
import Image from 'next/image'

const info = {
        stars: 3350,
        coins: 1750,
        name: 'Mr. Painete'
}


export default function Head() {
    return(
        <div class='divHead'>
                <div class='franken' >
                    Frankenstory
                </div>
                <Crate person={info} />
        </div>
    )
}

function Crate({person}){
    return(
        <div class='crateGroupHead'>
            <div class='crateHead'>
                <Image class='crateHeadPicture' src='/icons/portrait.png' width="25" height="25" />
                <p class='crateHeadText'>{person.name}</p>
            </div>
            <div class='crateHead'>
                <Image class='crateHeadPicture' src='/icons/star.png' width="25" height="25" />
                <p class='crateHeadText'>{person.stars}</p>
            </div>
            <div class='crateHead'>
                <Image class='crateHeadPicture' src='/icons/circle.png' width="25" height="25" />
                <p class='crateHeadText'>{person.coins}</p>
            </div>
            <div>
                <Image src='/icons/settings.png' width="38" height="38"/>
            </div>
            <div>
                <Image src='/icons/sign-out.png' width="38" height="38"/>
            </div>
        </div>
    )
}