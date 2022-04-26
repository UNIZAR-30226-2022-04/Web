import { useState } from "react"

const WriteStory = ({user,first}) => {

  const [currentTitle, setCurrentTitle] = useState("")
  const [currentText, setCurrentText] = useState("")
  const title = "Titulaco"
  const body = "Tremendo parrafaco de increible y profunda prosa"

  const onSubmit = (e) => {
    console.log("Hey")
  }

  return (
      <div className="storyBox">
        <form onSubmit={onSubmit}>
            <div className="centered">
              <div className="commonTitle h-auto">{first ? <>Empieza tu relato</> : <>{title}</> } </div>
            </div>
            <div className="centered">
              {first ? <input className="titleWrite w-6/12 mx-0 bg-gray-200" type="text" maxLength={200} value={currentTitle} placeholder="Titulo del relato" onChange={(e) => setCurrentTitle(e.target.value)}/>
              :<div className="mb-10">{body}</div> }
            </div>
            <div className="centered">
              <textarea className="storyWrite h-48 w-8/12" type="text" maxLength={200} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
            </div>
            <div className="clickable-item centered">
              <input className="bg-blue-400 w-32 rounded-xl" type="submit" value="Enviar parrafo"/>
            </div>
            { !first ? 
            <div className="clickable-item centered">
              <input className ="bg-red-400 w-32 rounded-xl" type="submit" value = "Terminar relato"/>
            </div>
            : ""}
        </form>
      </div>
  )
}

export default WriteStory