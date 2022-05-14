import Image from "next/image"

export default function Spinner(){
    return(
        <div className="flex flex-col background w-screen h-screen items-center justify-center align-middle">
            <h1 className="commonTitle">LOADING</h1>
            <Image src="/mooncodeLoading.gif" width={500} height={500}/>
        </div>
    )
}