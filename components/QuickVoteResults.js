import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

const QuickVoteResults = ({user}) => {
    const router = useRouter()
    const [story, setStory] = useState({title:"",paragraphs:[],winner:-1})
    const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const getResults = async () => {
            // Opciones para llamar a la api
            const body = {
                username:user.username,
                password:user.password,
                id:parseInt(queryParams.get("id")),
            }
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(body) 
            }
      
            // Llamada a la api
            const res = await fetch('http://localhost:3000/api/quick_game/resume_voted_quick_game', options)
            var data = await res.json()
  
            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data.result === "error"){
          router.push("/login")
                return
            }
            // Llama al hook que almacena la información del usuario
            setStory(data)
        }
        getResults()

    },[])

    function Paragraph({body,turn,creator}) {
        return(
            <div className="mb-2 w-full">
                <div>Historia de {creator}</div>
                <div className={`rounded-xl ${ story.winner == turn ? `bg-green-600` : `bg-green-800`}`}> {body} </div>
                { vote == turn ? <Image src="/icons/crown.png" width={20} height={20}/>: ""}
            </div>
        )
    }

    return(
        <div className="friendsBox w-2/3">
            <div className="centered">Votaciones</div>
            <div className="centered">Historia de {creator}</div>
            <div className="scrollBox h-auto text-center">
                <ul>
                    {story.paragraphs.map((paragraph, num) => 
                    <Paragraph body={paragraph.body} turn={num} creator={paragraph.username}/>,
                    )}
                </ul>
            </div>
        </div>
    )
}

export default QuickVoteResults