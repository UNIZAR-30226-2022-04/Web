const title = "Titulo"
const story = "Tremenda historia /n colega"
export default function SeeTale() {
    return(
        <div className="storyBox">
            <div className="titleWrite franken">{title}</div>
            <div className="savedStory max-h-full">{story}</div>
        </div>
    )
}