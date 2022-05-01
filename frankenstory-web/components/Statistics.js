import Image from 'next/image'

import ListOfPeople from './ListOfPeople'

export default function Stats({data}) {
    return(
        <div className='pl-20 flex flex-col justify-center space-y-2 absolute left-0'>
            <div className='relative flex flex-row h-auto w-auto'>
                <Image src='/icons/stats.png' width="40" height="25" />
                <h1 className='franken'>Statistics</h1>
            </div>  
            <ListOfPeople data={data} />
        </div>
    )
}