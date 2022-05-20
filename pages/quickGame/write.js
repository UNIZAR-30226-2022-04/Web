import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from "next/Image"

import Layout from 'components/Layout'
import Spinner from 'components/Spinner'

export default function Write() {

  const router = useRouter()
  const [windowUser, setWindowUser] = useState({}) 
  const [userCoins, setUserCoins] = useState() 

  const [punyetasMenu, setPunyetasMenu] = useState(false)
  const [punyetaCarro, setPunyetaCarro] = useState("")
  const [punyetasCompradas, setPunyetasCompradas] = useState([])
  const [currentText, setCurrentText] = useState("")
  
  const [clock, setClock] = useState(0)
  const [dots, setDots] = useState("")

  const [refresh, setRefresh] = useState(false)

  // Info de una partida
  const [turn, setTurn] = useState(0)
  const [rivals, setRivals] = useState([])
  const [roomID, setRoomID] = useState()

  const [game, setGame] = useState({
    state: "",
    time: 20,
    topic: "",
    randomWords: [],
    lastParagraph: "",
    last: false,
    turn: 0,
    punyeta: ""
  })

  // Saca la información del usuario de la pantalla
  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){
      const queryParams = new URLSearchParams(window.location.search);
      setRoomID("#"+queryParams.get("id"))

      const username = localStorage.getItem("username")
      const password = localStorage.getItem("password")
      const picture = localStorage.getItem("picture")
      const coins = localStorage.getItem("coins")
      const stars = localStorage.getItem("stars")

      setWindowUser({
        username: username, 
        password: password,
        picture: picture,
        stars: stars
      })

      setUserCoins(coins)

    }else{
      router.push("/login")
    }
  }, [])

  
  // Obtiene los datos de la sala
  useEffect(() => {
    const getData = async () => {
      if(!windowUser.username){
        return
      }
      
      // Información que necesitan las apis
      const infoRoom = {
        username: windowUser.username,
        password: windowUser.password,
        id: roomID
      }

      const infoTurn = {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        turn: turn,
        id: roomID
      }

      // Opciones para la realización de la llamada HTTP
      const optionsRoom = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(infoRoom)
      }

      const optionsTurn = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(infoTurn)
      }

      // Llamadas a las apis
      const resRoom = await fetch("http://localhost:3000/api/quick_game/get_room", optionsRoom)
      const dataRoom = await resRoom.json()

      const resTurn = await fetch("http://localhost:3000/api/quick_game/play_quick_game", optionsTurn)
      const dataTurn = await resTurn.json()
      
      ///*
      if(dataRoom.result != "error" && dataTurn.result != "error"){     
        setGame({
          state: dataTurn.result,
          time: dataTurn.s,
          topic: dataTurn.topic,
          randomWords: dataTurn.randWords,
          lastParagraph: dataTurn.lastParagraph,
          last: dataTurn.isLast,
          turn: dataTurn.turn,
          punyeta: dataTurn.puneta          
        })

        setRivals(dataRoom.participants)
      }else{
        router.push("/quickGame")
      }
      //*/

      //HARCODEADO STILL TO TEST
      /* 
      setGame({
        state: "success",
        time: 300,
        topic: "",
        randomWords: ["word1","word2","word3"],
        lastParagraph: "Último párrafo si no es la primera",
        last: true,
        turn: 1,
        punyeta: "",
      })

      setRivals(
        [
          {
            username:"nombre",
            picture: 1,
            stars: 124
          },
          {
            username:"pepino",
            picture: 3,
            stars: 124
          },
          {
            username:"jamon",
            picture: 2,
            stars: 124
          },
        ]
      )
      */
    }

    getData()
    
  }, [windowUser])
  
  
  //Temporizador
  useEffect(() => {
    const start = new Date();

    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - start.getTime();

      const s = Math.floor(difference/1000);
      setClock(game.time-s);

      if (game.time < s) {
        submitParagraph(windowUser, roomID, currentText, turn, setTurn, game)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  

  //Esperamos 3 segundos antes de volver a pedir el estado de la partida
  useEffect(()=>{
    if(game.state=="waiting_players"){
      const sleep = async (ms) => {
        await new Promise(r => setTimeout(r, ms));
      }

      sleep(3000).then(()=>{
        setRefresh(!refresh)  // Refrescamos los datos
        if(dots.length==3){
          setDots("")
        }else{
          setDots(dots+".")
        }
      })
    }
  }, [])

  // Si tadavía no hoy usuario o sala, esperamos a que lo haya
  if(!windowUser || game.turn == 0){
    return <Spinner />
  }

  const layoutInfo = {
    username: windowUser.username,
    stars:    windowUser.stars,
    coins:    userCoins,
    image_ID: windowUser.picture
  }  

  // Página principal
  return (
    <Layout data={layoutInfo}>
      <div className='flex flex-row w-full mb-20'>
        <form className='flex flex-col items-center align-middle justify-center w-full h-full space-y-2' onSubmit={() => (submitParagraph(windowUser, roomID, currentText, turn, setTurn, game))}>
          <div className="commonTitle h-auto">{turn==0 ? "Comienza la historia" : "Párrafo anterior" } </div>
          <div>{game.previous}</div>
          <div className="">
            { game.topic != "" && turn==0 ?(
              <div className="flex flex-row space-x-2 items-center">
                <div>Tema de la historia</div>
                <div className="rounded bg-blue-400 p-1">#{game.topic}</div>
                <Image className="" src="/quick-game/twitter_trend.png" width={30} height={30}/>
              </div>
            ):(
              <></>
            )}
            {game.topic == "" ?(
              <div className='flex flex-col items-center'>
                <div className="">Palabras a introducir</div>
                <div className="flex flex-row space-x-2 items-center">
                  <DisplayPalabraClave palabra={game.randomWords[0]} currentText={currentText}/>
                  <DisplayPalabraClave palabra={game.randomWords[1]} currentText={currentText}/>
                  <DisplayPalabraClave palabra={game.randomWords[2]} currentText={currentText}/>
                </div>
              </div>
            ):(
              <></> 
            )}
          </div>

          <div className="flex flex-row items-center">
            <Image className="" src="/quick-game/clock.png" width={30} height={30}/>
            <div>{parseInt(clock/60)}min:{clock % 60}seg</div>
          </div>

          <textarea className={`text-2xl font-arial h-2/5 w-2/5 p-3 rounded-lg ${ game.punyeta == "reves" ? "font-reverse" : ""} ${ game.punyeta == "ciego" ? "font-blank bg-black" : ""}`} type="password" required={true} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
          <button className="commonButton bg-verde_top" type="submit">Enviar parrafo</button>

        </form>
        <div className="bg-green-800 flex flex-col align-middle w-1/4 items-center">
          <div className="flex-row">
            {game.last ? (
              <div className='flex flex-row items-center space-x-2 text-center w-full p-4'>
                <div className='text-white text-xl'>Mercado de Puñetas Cerrado</div>
                <Image src={`/quick-game/punyetas.png`} width={60} height={60}/>
              </div>
            ):(
              <button type="button" className="text-xl text-white m-2" onClick={() => (openClose(punyetasMenu, setPunyetasMenu, setPunyetaCarro))} >
                {punyetasMenu == "objetivo"  ? (
                  "¿A quien le envias la puñeta?"
                ):(
                  <div className='flex flex-row items-center space-x-2'>
                    <div>Comprar puñetas</div>
                    <Image src={`/quick-game/punyetas.png`} width={60} height={60}/>
                  </div>
                )}
              </button>
            )}
            
          </div>
          
          { punyetasMenu == "punyeta" ? (
            <div className='flex flex-col space-y-2 2'>
              <ButtonPunyeta img={"letras_reves"} name={"reves"} text={"Letras al revés"} price={150} setPunyetasMenu={setPunyetasMenu}  setPunyetaCarro={setPunyetaCarro} />
              <ButtonPunyeta img={"escribe_ciegas"} name={"ciego"} text={"Escribe a ciegas"} price={300} setPunyetasMenu={setPunyetasMenu}  setPunyetaCarro={setPunyetaCarro}/>
              <ButtonPunyeta img={"desorden_total"} name={"desorden"} text={"Desorden total"} price={500} setPunyetasMenu={setPunyetasMenu}  setPunyetaCarro={setPunyetaCarro}/>
            </div>

          ):(
            <></>
          )}
          
          { punyetasMenu == "objetivo" ?
          (
            <div className='flex flex-col space-y-2'>
              {rivals.map((rival, index) => 
                (
                  <Rival key={index} coins={userCoins} setCoins={setUserCoins} rivalName={rival.username} picture={rival.picture} punyetaCarro={punyetaCarro} setPunyetasMenu={setPunyetasMenu} punyetasCompradas={punyetasCompradas} setPunyetasCompradas={setPunyetasCompradas} rivals={rivals} setRivals={setRivals}/>
                )
              )}
              <button type="button" className='bg-white flex flex-row space-x-2 p-2 rounded items-center text-center' onClick={() => (setPunyetasMenu(""))}>{"<-"} A Nadie</button>
            </div>
          ):(
            <></>
          )}
        </div>
      </div>
      
      { game.state == "waiting_players" ?(
        <div className="absolute w-screen h-screen flex bg-opacity-75 bg-black text-6xl justify-center pt-60 text-white" >Esperando al resto de jugadores{dots}</div>
      ):(
        <></>
      )}
    </Layout> 
  )
}
/*
  FUNCIONES QUE SOLO EJECUTAN JS
*/

// te redirecciona a votación
async function submitParagraph(windowUser, roomID, currentText, turn, setTurn, game) {
  const res = await addParagraph(windowUser, roomID, currentText, turn, game.punyetas)

  if(res.result == "error"){
    alert("Error al enviar parrafo")
    //router.push("/quickGame")
  }

  if(game.last){
    //router.push(`/quickGame/vote?id=${roomID}`)
  }

  setTurn(turn+1)
}

// Añade un párrafo
async function addParagraph (windowUser, roomID, currentText, turn, punyetas) {
  const info = {
    username:windowUser.username,
    password:windowUser.password,
    id:roomID,
    body:currentText,
    turn:turn,
    punetas:punyetas
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    },
    body: JSON.stringify(info)
  }
  const res = await fetch("http://localhost:3000/api/quick_game/add_quick_game_paragraph", options)
  const data = await res.json()
  return data
}

// Abre o cierra el menú de la puñetas
// No hace falta una función para esto 
function openClose(punyetasMenu, setPunyetasMenu, setPunyetaCarro) {
  if(punyetasMenu == ""){
    setPunyetasMenu("punyeta")
  }else{
    setPunyetasMenu("")
    setPunyetaCarro("")
  }
}

function chooseTarget(coins, setCoins, rivalName, punyetaCarro, setPunyetasMenu, punyetasCompradas, setPunyetasCompradas, rivals, setRivals) {
  var precio
  //Comprobamos precio de puñeta
  switch(punyetaCarro){
    case "reves":
      precio = 150
      break
    case "ciego":
      precio = 300
      break
    default :
      precio = 500
  }

  setPunyetasMenu("punyeta")
  
  const dupla = {
    puneta:punyetaCarro,
    username:rivalName
  }

  if(coins-precio < 0){
    alert("Monedas no suficientes")
    return
  }
  
  setCoins(coins-precio)

  setPunyetasCompradas([...punyetasCompradas, dupla])

  setRivals( rivals.filter(rival => rival.username != rivalName) )
  setPunyetasCompradas([...punyetasCompradas, dupla])
  return
}

/*
  FUNCIONES QUE MUESTRAN HTML
*/
// Muesta una plabra clave?
function DisplayPalabraClave({currentText, palabra}){
  const style = currentText.includes(palabra) ? "bg-green-800 text-white" : "bg-green-600"
  return(
    <div className={`${style} px-2 rounded-md text-center`}>{palabra}</div>
  )
}


// Muesta a quién va a dirigida la puñeta
function Rival({coins, setCoins, rivalName, picture, punyetaCarro, setPunyetasMenu, punyetasCompradas, setPunyetasCompradas, rivals, setRivals}){
  return (
    <button type="button" className="bg-white flex flex-row space-x-2 p-2 rounded items-center" onClick={() => (chooseTarget(coins, setCoins, rivalName, punyetaCarro, setPunyetasMenu, punyetasCompradas, setPunyetasCompradas, rivals, setRivals))}>
      <Image src={`/profPic/icon${picture}.png`} width={50} height={50} />
      <div className='text-xl'>{rivalName}</div>
    </button>
  )
}

// Devuelve un solo botón de las puñetas
function ButtonPunyeta({img, name, text, price, setPunyetasMenu, setPunyetaCarro}){
  return (
    <button type="button" className="bg-white rounded flex flex-row justify-around items-center px-6" onClick={()=>(setPunyetasMenu("objetivo"), setPunyetaCarro(name))}>
      <Image src={`/quick-game/${img}.png`} width={60} height={60}/>
      <div className = "flex flex-col py-1">
        <div>{text}</div>
        <div className='flex flex-row items-center justify-center'>
          <div>{price}</div>
          <Image src={`/icons/mooncoin.png`} width={50} height={50}/>
        </div>
      </div>
    </button>
  )
}