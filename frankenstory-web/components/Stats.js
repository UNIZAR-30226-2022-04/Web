import Image from 'next/image'

export default function Stats({data}) {
    return(<></>)
    /* Esto no va, buscando solucion...
    return(
        <>
            <ol>
                data.map(peson => {return (<></>)})
            </ol>
        </>
    )
    */
}

function PersonInfo({person}){
    return(
        <li>
            <div>{person.name}</div>
            <div><Image src='/icons/star.png' width="38" height="38"/></div>
        </li>
    )
}