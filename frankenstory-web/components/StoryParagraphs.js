import { useState } from "react"
import Image from "next/image";

export default function StoryParagraphs({story}){
    const [chosenStory, setChosenStory] = useState(0);

    return(
        <div className="flex flex-col items-center space-y-5 ">
            {story.paragraphs.map((paragraph, index) => (<Paragraph key={index} info={paragraph} chosen={0} index={index} stateFunc={setChosenStory} />))}
        </div>
    )
}

function Paragraph({info, chosen, index, stateFunc}){
    console.log("A:", info)
    const bgcolor = chosen == index ? "bg-green-400" : "bg-green-800"
    return(
        <div className={`flex flex-row w-72 ${bgcolor} rounded-lg px-5 py-2 justify-center`} onclick={stateFunc(index)}>
            <h1 className="">{info.text}</h1>
            <h1>{info.username}</h1>
            {chosen == index ? (
                <Image src='/icons/voting-box.png' width={20} height={20}/>
            ):(
                <></>
            )}
        </div>
    )
}