import { useState } from "react"

const WriteStory = ({user,first}) => {

  const [currentTitle, setCurrentTitle] = useState("")
  const [currentText, setCurrentText] = useState("")

  const onSubmit = (e) => {
    console.log("Hey")
  }

  return (
      <div className="storyBox bg-gray-200">
        {first ? <div className="commonTitle">Empieza tu relato </div> : <h1>currentTitle</h1>}
        <form className="w-11/12 bg-blue-800"onSubmit={onSubmit}>
            {first ? <input className="titleWrite" type="text" maxLength={200} value={currentTitle} placeholder="Titulo del relato" onChange={(e) => setCurrentTitle(e.target.value)}/>
            :"" }
            <input className="storyWrite" type="text" maxLength={200} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
            <input type="button" value = "Enviar parrafo"/>
            { !first ? <input type="button" value = "Terminar relato"/> : ""}
        </form>
      </div>
  )
}

export default WriteStory