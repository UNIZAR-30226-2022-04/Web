export default function StoryParagraphs({story, chosenStory, setChosenStory}){
    

    return(
        <div className="flex flex-col flex-warp items-center space-y-5 ">
            {story.paragraphs.map((paragraph, index) => (<Paragraph key={index} info={paragraph} chosen={chosenStory} index={index} stateFunc={setChosenStory} />))}
        </div>
    )
}

function Paragraph({info, chosen, index, stateFunc}){
    const bgcolor = chosen == index ? "bg-green-400" : "bg-green-800"
    
    return(
        <button className={`flex flex-row text-left w-96 ${bgcolor} rounded-lg px-5 py-2 justify-between space-x-3`} onClick={() => stateFunc(index)}>
            {info.words ?  (
                <SpecialText info={info} selected={chosen == index}/>
            ):(
                <p>{info.text}</p>
            )}
            
            {info.username != undefined ? (
                <h1>{info.username}</h1>
            ):(
                <></>
            )}
            
            
        </button>        
    )
}

function SpecialText({info, selected}){
    var fullText = info.text
    const txt_color = selected ? "" : "text-red-500"

    info.words.map((palabraClave) => {
        const textSplit = fullText.split(palabraClave)
        textSplit.map((trozo, index) => {
            if(index == 0){
                fullText = trozo
            }else{
                fullText += ";" + palabraClave + ";" + trozo
            }
        });
        
    });

    return(
        <div className="flex flex-row flex-wrap space-x-2 w-full">
            {fullText.split(";").map(
                (trozo, index) => (
                    <>
                        {index % 2 == 0 ? (
                            <div key={index} className='text-white'>
                                {trozo}
                            </div>
                        ):(
                            <div key={index} className={`${txt_color}`}>
                                {trozo}
                            </div>
                        )}
                    </>
                )
            )}
        </div>
    )
}