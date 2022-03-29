import styles from './Head.module.css'

const info = {
        star: 3350,
        coins: 1750,
        name: 'Mr. Painete'
}


export default function Head() {
    return(
    <div class='container'>
        <div>
            <p class='px-4 py-2 text-sm text-purple-600  font-bold' >
                Frankenstory
            </p>
            <Crate person={info}>
                
            </Crate>
        </div>
    </div>
    )
}

function Crate({person}){
    return(
        <div className={styles.crate}>
            {person.name}
        </div>
    )
}