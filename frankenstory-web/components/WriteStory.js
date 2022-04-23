import { useState } from "react"
import React from "react"

const currentTitle = "Placeholder"

const WriteStory = ({user,first}) => {

  const [currentTitle, setCurrentTitle] = useState("")
  const [currentText, setCurrentText] = useState("")

  const onSubmit = (e) => {
    console.log("Hey")
  }

 


  return (
      <div className="storyBox">
        {first ? <div className="commonTitle text-center bg-red-200 h-10">Empieza tu relato </div> : <h1>{currentTitle}</h1>}
        <form className="bg-blue-200" onSubmit={onSubmit}>
            <div>
              {first ? <input className="titleWrite mx-20 w-full ml-0 bg-green-600" type="text" maxLength={200} value={currentTitle} placeholder="Titulo del relato" onChange={(e) => setCurrentTitle(e.target.value)}/>
              :"" }
            </div>
            <div className="text-center">
              <input className="storyWrite ml-10 h-auto w-10/12" type="text" maxLength={200} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
            </div>
            <div className="text-center">
              <input className="bg-red-800" type="submit" value="Enviar parrafo"/>
            </div>
            { !first ? <div><input type="button" value = "Terminar relato"/></div>
            : ""}
        </form>
      </div>
  )
}

export default WriteStory