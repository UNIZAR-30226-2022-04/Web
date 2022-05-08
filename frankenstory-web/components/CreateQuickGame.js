import { useState } from "react"
import { useRouter } from 'next/router'

const CreateQuickGame = () => {

    const url = "http://localhost:3000/api/quick_game/create_room"

    const router = useRouter()

    const [publicGame, setPublicGame] = useState(true)
    const [gameMode, setGameMode] = useState("random")
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

    const timeUp = (e) => {
        e.preventDefault()
        setTime(time + 5)
    }

    const timeDown = (e) => {
        e.preventDefault()
        setTime(time - 5)
    }

    const create = async () =>{
        const data = {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            time: time,
            isPrivate: publicGame,
            mode: gameMode
        }
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
        }
        const res = await fetch(url,options)
        return res.json()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        create().then((res) =>{
            console.log(res)
            if (res.result != "success"){
                alert("Error al crear sala")
                router.push("/quickGame")
            }else{
                router.push(`/quickGame/lobby?code=${res.id}`)
            }
        })
    }
 
  return (
      <form className ="m-auto justify-center p-6 align-middle" onSubmit={onSubmit}>
          <div className="centered">
            <p>Tiempo de escritura</p>
          </div>
          <div className="flex">
              <div>
                <p className="text-2xl float-left text-white">{parseInt(time/60)}min:{time % 60}seg</p>
                <div className="absolute ml-36 text-2xl text-white">
                    <button onClick={timeDown}>-</button>
                    <button className="ml-2" onClick={timeUp}>+</button>
                </div>
              </div>
          </div>
          <div className="centered" >
            <p>Tipo de partida</p>
          </div>
          <div className="centered">
            <input className={`py-1 px-2 text-white ${ publicGame ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="PUBLICA" onClick={setPublic}/>
            <input className={`py-1 px-2 text-white ${ !publicGame ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="PRIVADA" onClick={setPrivate}/>
          </div>
          <div className = "centered ">
                <>Modo de juego</>
          </div>
          <div className = "centered">
            <input className={`py-1 px-2 text-white ${ gameMode=="random" ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="ALEATORIAS" onClick={setModeRandom}/><> </>
            <input className={`py-1 px-2 text-white ${ gameMode=="twitter" ? 'bg-green-800' : 'bg-green-600'}`} type="button" value="TWITTER" onClick={setModeTwitter}/><> </>
          </div>
          <div className = "centered">
            <input className="clickableItem"type="submit" value="Crear partida"/>
          </div>
      </form>
  )
}

export default CreateQuickGame