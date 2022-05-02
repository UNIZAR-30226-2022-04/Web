import { useState, useEffect } from "react"
import Link from "next/link"
import {useRouter} from 'next/router'

const CreateQuickGame = () => {

    const url = "http://localhost:3000/api/quick_game/create_room"
  
    const [publicGame, setPublicGame] = useState(true)
    const [gameMode, setGameMode] = useState("normal")
    const [time, setTime ] = useState(120)

    const setPublic = () => {
        setPublicGame(true)
    }

    const setPrivate = () => {
        setPublicGame(false)
    }

    const setModeRandom = () => {
        setGameMode("random")
    }

    const setModeTwitter = () => {
        setGameMode("twitter")
    }

    const setModeNormal = () => {
        setGameMode("normal")
    }

    const timeUp = (e) => {
        e.preventDefault()
        setTime(time + 5)
    }

    const timeDown = (e) => {
        e.preventDefault()
        setTime(time - 5)
    }

    const create = async () =>{

    }

    const onSubmit = () => {
        console.log()
        create.then((res) =>{
            console.log(res)
        })
    }
 
  return (
      <form className ="m-auto justify-center p-6 align-middle" onSubmit={onSubmit}>
          <div>
            <p>Tiempo de escritura</p>
            <text>{parseInt(time/60)} : {time % 60}</text>
            <button onClick={timeUp}>+</button>
            <button onClick={timeDown}>-</button>
          </div>
          <div>
            <p>Tipo de partida</p>
            <input className={ publicGame ? "bg-green-800" : "bg-green-600"} type="button" value="publica" onClick={setPublic}/><> </>
            <input className={ !publicGame ? "bg-green-800" : "bg-green-600"} type="button" value="privada" onClick={setPrivate}/>
          </div>
          <div>
            <p>Modo de juego</p>
            <input className={ gameMode == "random" ? "bg-green-800" : "bg-green-600"} type="button" value="aleatorio" onClick={setModeRandom}/><> </>
            <input className={ gameMode == "twitter" ? "bg-green-800" : "bg-green-600"} type="button" value="twitter" onClick={setModeTwitter}/><> </>
            <input className={ gameMode == "normal" ? "bg-green-800" : "bg-green-600"} type="button" value="normal" onClick={setModeNormal}/>
          </div>
          <div>
            <input className="clickableItem"type="submit" value="Crear partida"/>
          </div>
      </form>
  )
}

export default CreateQuickGame