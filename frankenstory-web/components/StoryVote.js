import { useState, useEffect } from "react"
import Image from "next/image"

const StoryVote = ({user}) => {
    const [vote, setVote] = useState(-1)
    const [story, setStory] = useState({title:"",paragraphs:[]})
    const [creator, setCreator] = useState("Creador")
    const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
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
  
            console.log(data)
  
            // Si no ha ido bien o no estoy logeado volvemos a /
            if(data.result === "error"){
                router.push("/")
                return
            }
            data = {
                title:"Titulo",
                paragraphs:[{
                    text:"Cuerpo 1",
                    username:"Pepe",
                    turn_number:1
                },{
                    text:"Cuerpo 2",
                    username:"Pepe",
                    turn_number:2
                },{
                    text:"Cuerpo 3",
                    username:"Pepe",
                    turn_number:3
                },{
                    text:"Cuerpo 4",
                    username:"Pepe",
                    turn_number:4
                },]
            }
            // Llama al hook que almacena la información del usuario
            console.log("Aqui")
            console.log(data)
            setStory(data)
        }
        getStory()

    },[])

    function Paragraph({body,turn}) {
        const voteParagraph = (e) =>{
            e.preventDefault()
            setVote(turn)
        }
        return(
            <div className="mb-2 w-full">
                <input className={`rounded-xl ${ vote == turn ? `bg-green-600` : `bg-green-800`}`} type="button" onClick={(voteParagraph)} value={body}/>
                { vote == turn ? <Image src="/icons/crown.png" width={20} height={20}/>: ""}
            </div>
        )
    }

    const sendVote = (e) => {
        e.preventDefault()
        console.log(vote)
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
                    <Paragraph body={paragraph.text} turn={paragraph.turn_number}/>
                    )}
                </ul>
            </div>
            <input className="clickableItem bg-green-800 rounded-xl w-30" type="button" onClick={(sendVote)} value="Enviar voto"/>
        </div>
    )
}

export default StoryVote