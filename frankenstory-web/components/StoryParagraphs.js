export default function StoryParagraphs({story, chosenStory, setChosenStory}){
    

    return(
        <div className="flex flex-col items-center space-y-5 ">
            {story.paragraphs.map((paragraph, index) => (<Paragraph key={index} info={paragraph} chosen={chosenStory} index={index} stateFunc={setChosenStory} />))}
        </div>
    )
}

function Paragraph({info, chosen, index, stateFunc}){
    const bgcolor = chosen == index ? "bg-green-400" : "bg-green-800"
    return(
        <button className={`flex flex-row w-96 ${bgcolor} rounded-lg px-5 py-2 justify-between space-x-3`} onClick={() => stateFunc(index)}>
            <h1 className="">{info.text}</h1>
            <div className="w-20"></div>
            <h1>{info.username}</h1>
            
        </button>        
    )
}