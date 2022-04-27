import { useState, useEffect } from "react"
import Link from "next/link"
import {useRouter} from 'next/router'

const CreateQuickGame = () => {
  
    const [publicGame, setPublicGame] = useState(true)
    const [gameMode, setGameMode] = useState("mandatory")

    const setPublic = () => {
        setPublicGame(true)
    }

    const setPrivate = () => {
        setPublicGame(false)
    }

    const setModeMandatory = () => {
        setGameMode("mandatory")
    }

    const setModeTwitter = () => {
        setGameMode("twitter")
    }
 
  return (
      <form className ="m-auto justify-center p-6 align-middle">
          <p>Tiempo de escritura</p>
          <input type="number" min="0" max="300" />
          <p>Tipo de partida</p>
          <input className={ publicGame ? "bg-green-800" : "bg-green-600"} type="button" value="publica" onClick={setPublic}/>
          <input className={ !publicGame ? "bg-green-800" : "bg-green-600"} type="button" value="privada" onClick={setPrivate}/>
          <p>Modo de juego</p>
          <input className={ gameMode == "mandatory" ? "bg-green-800" : "bg-green-600"} type="button" value="obligatorias" onClick={setModeMandatory}/>
          <input className={ gameMode == "twitter" ? "bg-green-800" : "bg-green-600"} type="button" value="twitter" onClick={setModeTwitter}/>
          <div>
            <input type="submit" value="Crear partida"/>
          </div>
      </form>
  )
}

export default CreateQuickGame