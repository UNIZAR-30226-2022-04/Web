import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

const StoryVote = ({user}) => {
    const router = useRouter()
    const [vote, setVote] = useState(-1)
    const [story, setStory] = useState({title:"",paragraphs:[]})
    const [creator, setCreator] = useState("")
    const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        setCreator(queryParams.get("creator"))
        const getStory = async () => {
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
            const res = await fetch('http://localhost:3000/api/tale_mode/get_paragraphs', options)
            var data = await res.json()
  
            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data.result === "error"){
                router.push("/")
                return
            }
            // Llama al hook que almacena la información del usuario
            setStory(data)
        }
        getStory()

    },[])

    function Paragraph({body,turn,creator}) {
        const voteParagraph = (e) =>{
            e.preventDefault()
            if(creator != localStorage.getItem("username")){
                setVote(turn)
            }else{
                alert("No te puedes votar a ti mismo Jaime")
            }
        }
        /**/ 
        return(
            <div className="mb-2 w-full">
                <input className={`rounded-xl ${ vote == turn ? `bg-green-600` : `bg-green-800`}`} type="button" onClick={(voteParagraph)} value={body}/>
                { vote == turn ? <Image src="/icons/crown.png" width={20} height={20}/>: ""}
            </div>
        )
    }

    const trySend = async () => {
        const body = {
            username:user.username,
            password:user.password,
            id:parseInt(queryParams.get("id")),
            indexParagraph: vote
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body) 
        }
  
        // Llamada a la api
        const res = await fetch('http://localhost:3000/api/tale_mode/get_paragraphs', options)
        console.log(res)
        return res.json()
    }

    const sendVote = (e) => {
        e.preventDefault()
        trySend().then((res) =>{
            if(res.result !=  "success"){
                alert("Error al enviar voto")
            }
            router.push("/storyMode")
        })
    }

    return(
        <div className="friendsBox w-2/3">
            <div className="centered">Votaciones</div>
            <div className="centered">Elige el párrafo que más te guste</div>
            <div className="centered">Historia de {creator}</div>
            <div className="centered">Titulo:{story.title}</div>
            <div className="scrollBox h-auto text-center">
                <ul>
                    {story.paragraphs.map((paragraph) => 
                    <Paragraph body={paragraph.text} turn={paragraph.turn_number} creator={paragraph.username}/>
                    )}
                </ul>
            </div>
            <input className="clickableItem bg-green-800 rounded-xl" type="button" onClick={(sendVote)} value="Enviar voto"/>
        </div>
    )
}

export default StoryVote