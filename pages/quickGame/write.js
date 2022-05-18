import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import Image from "next/Image"

import Layout from 'components/Layout'
import Spinner from 'components/Spinner'

export default function Write() {

  const router = useRouter()
  const [windowUser, setWindowUser] = useState({}) 

  const [punyetasM, setPunyetasM] = useState("")
  const [punyetaCarro, setPunyetaCarro] = useState("")
  const [punyetasCompradas, setPunyetasCompradas] = useState([])
  const [previous, setPrevious] = useState("")
  const [currentText, setCurrentText] = useState("")
  const [punyeta, setPunyeta] = useState("ciego")
  const [topic, setTopic] = useState("")
  const [randomWords, setWords] = useState(["Rayo","Fuego","Hielo"])
  const [time, setTime] = useState(1000000)
  const [clock, setClock] = useState(0)
  const [rivals, setRivals] = useState([])
  const [last, setLast ] = useState(false)
  const [turn, setTurn ] = useState(0)
  const [state, setState ] = useState("waiting_players")
  const [tick, setTick ] = useState(true)
  const [dots, setDots ] = useState("")


  //Temporizador
  useEffect(() => {
    const start = new Date();
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - start.getTime();

      const s = Math.floor(difference/1000);
      setClock(time-s);

      if (time < s) {
        alert("Timer terminado");
        router.push("/quickGame")
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Obtiene los datos de la sala y 
  const getData = async () =>{
    const queryParams = new URLSearchParams(window.location.search);
    var data = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
      id: ("#"+queryParams.get("id"))
    }
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
    }
    var res = await fetch("http://localhost:3000/api/quick_game/get_room",options)
    res = await res.json()
    setRivals(res.participants.filter((rival) => rival.username != windowUser.username))
    data = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
      turn: turn,
      id: ("#"+queryParams.get("id"))
    }
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
    }
    res = await fetch("http://localhost:3000/api/quick_game/play_quick_game",options)
    res = await res.json()
    console.log(res)
    if(res.result != "error"){
      setState(res.result)
      setTime(res.s)
      setTopic(res.topic)
      setWords(res.randomWords)
      setPrevious(res.lastParagraph)
      setLast(res.isLast)
      setPunyeta(res.puneta)
      setTurn(res.turn)
    }else{
      //alert("Error al acceder a partida")
      setState("waiting_players")
      //router.push("/quickGame")
    }
    setTick(!tick)
  }
  
  // cada ¿¡¿¡¿¡segundo!?!?!? llama a la base de datos 
  useEffect(()=>{
    if(state=="waiting_players"){
      //Esperamos medio segundo antes de volver a pedir el estado de la partida
    
        const sleep = async (ms) => {
          await new Promise(r => setTimeout(r, ms));
        }
        sleep(1000).then(()=>{
          getData()
          setTick(!tick)
          if(dots.length==3){
            setDots("")
          }else{
            setDots(dots+".")
          }
        })
      
    }
  },[tick])

  // Saca la información del usuario de la pantalla
  // Porqué está aquí?
  useEffect(()=>{
    if(localStorage.getItem("logged") == "si"){

      const username = localStorage.getItem("username")
      const password = localStorage.getItem("password")
      const picture = localStorage.getItem("picture")
      const coins = localStorage.getItem("coins")
      const stars = localStorage.getItem("stars")

      setWindowUser({
        username: username, 
        password: password,
        picture: picture,
        coins: coins,
        stars: stars
      })
      getData()
    }else{
router.push("/login")
    }
  },[])

  // Si tadavía no hoy usuario, esperamos a que lo haya
  // Solo usuario? Y si no hay sala?
  if(!windowUser){
    return <Spinner />
  }

  const layoutInfo = {
    username: windowUser.username,
    stars:    windowUser.stars,
    coins:    windowUser.coins,
    image_ID: windowUser.picture
  }  

  // Añade un párrafo a ¿¡¿¡¿TALE?!?!?
  // Esto está mal, debe llamar a las apis de quick
  const add_quick_game_paragraph = async () => {
    var data = {
      username:windowUser.username,
      password:windowUser.password,
      id:localStorage.getItem("id"),
      body:currentText,
      turn:turn,
      punetas:punyetasCompradas
    }
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
    }
    var res = await fetch("http://localhost:3000/api/tale_mode/add_tale_paragraph",options)
    return res.json()
  }

  // te redirecciona a votación
  // Porque on submit, porqué no toVotePage
  const onSubmit = (e) => {
    e.preventDefault()
    add_quick_game_paragraph().then((res) =>{
      if(res.result == "error"){
        alert("Error al enviar parrafo")
        router.push("/quickGame")
      }
      if(last){
        router.push(`/quickGame/vote?id=${queryParams.get("id")}`)
      }
    })
    getData()
    setTurn(turn+1)
    setTick(!tick)
  }

  // Abre o cierra el menú de la puñetas
  // No hace falta una función para esto 
  const openClose = (e) => {
    e.preventDefault()
    if(punyetasM == ""){
      setPunyetasM("punyeta")
    }else{
      setPunyetasM("")
      setPunyetaCarro("")
    }
  }

  // Devuelve lo visual del menú de puñetas 
  function MenuPunyeta(){

    // Devuelve un solo botón de las puñetas
    function ButtonPunyeta({img,name,text,price}){
      const choosePunyeta = (e) => {
        e.preventDefault()
        setPunyetasM("objetivo")
        setPunyetaCarro(name)
      }
      return (
        <button className="bg-white rounded m-2 flex w-40" onClick={choosePunyeta}>
          <Image src={`/quick-game/${img}.png`} width={40} height={40}/>
          <div className = "text-right">
            <>{text}</>
            <div>
              <>{price}</>
              <Image src={`/icons/mooncoin.png`} width={24} height={24}/>
            </div>
          </div>
        </button>
      )
    }

    return(
      <ul>
        <li>
          <ButtonPunyeta img={"letras_reves"} name={"reves"} text={"Letras al revés"} price={150} />
        </li>
        <li>
          <ButtonPunyeta img={"escribe_ciegas"} name={"ciego"} text={"Escribe a ciegas"} price={300} />
        </li>
        <li>
          <ButtonPunyeta img={"desorden_total"} name={"desorden"} text={"Desorden total"} price={500} />
        </li>
      </ul>
    )
  }

  // Muesta a quién va a dirigida la puñeta
  // Porqué llama a hooks y a la vez muesta cosas?!?!?!
  function DestinoPunyeta(){

    function Rival({username,picture}){
      const chooseTarget = (e) => {
        e.preventDefault()
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
            precio=500
        }
        setPunyetasM("punyeta")
        var dupla = {puneta:punyetaCarro,username:username}
        if(windowUser.coins-precio < 0){
          alert("Monedas no suficientes")
          return
        }
        setWindowUser({
          username: windowUser.username, 
          password: windowUser.password,
          picture: windowUser.picture,
          coins: windowUser.coins-precio,
          stars: windowUser.stars})
        setPunyetasCompradas([...punyetasCompradas, dupla])

        setRivals(rivals.filter((rival) => rival.username != username))
        setPunyetasCompradas([...punyetasCompradas, dupla])
        return
      }

      return (
        <button className="bg-white rounded m-2 px-2" onClick={chooseTarget}>
          <Image src={`/profPic/icon${picture}.png`} width={20} height={20} /><>{username}</>
        </button>
      )
    }

    return(
      <ul>
          {rivals.map((rival, index) => 
            (
              <li key={index}> 
                <Rival username={rival.username} picture={rival.picture}/>
              </li>
            )
          )}
      </ul>
    )
  }

   // Muestra un texto con las palabras obligatorias coloreadas
  function SpecialInputBox(){

    function SpecialText(){
      var fullText = currentText
      randomWords.map((palabraClave) => {
          const textSplit = fullText.split(palabraClave)
          textSplit.map((trozo, index) => {
              if(index == 0){
                  fullText = trozo
              }else{
                  fullText += ";" + palabraClave + ";" + trozo
              }
          });
          
      });
  
      return(
          <div className={`${ punyeta == "reves" ? "font-reverse" : ""} ${ punyeta == "ciego" ? "font-blank" : ""} flex flex-row flex-wrap justify-center space-x-2 w-full`}>
              {fullText.split(";").map(
                  (trozo, index) => (
                      <>
                          {index % 2 == 0 ? (
                              <div key={index}>
                                  {trozo}
                              </div>
                          ):(
                              <div key={index} className="text-green-600 font-bold">
                                  {trozo}
                              </div>
                          )}
                      </>
                  )
              )}
          </div>
      )
    }
    return(
      <div className={`storyWrite border-green-800 text-2xl font-arial inline-flex flex-col h-48 w-8/12 ${ punyeta == "ciego" ? "bg-black" : "bg-white"}`}>
        <SpecialText/>
      </div>
    )
  }

  // Muesta una plabra clave?
  function DisplayPalabraClave({palabra}){
    var incluida = currentText.includes(palabra)
    return(
      <div className={`px-1 mx-2 ${ incluida ? "bg-green-800 text-white" : "bg-green-600"}`}>{palabra}</div>
    )
  }

  // Página principal
  return (
    <>
      <Layout data={layoutInfo}>
        <div className="relative storyBox">
          <form onSubmit={onSubmit}>

            <div className="centered">
              <div className="commonTitle h-auto">{turn==0 ? <>Comienza la historia</> : <>Párrafo anterior</> } </div>
            </div>

            <div className='centered text-lg'>
              { turn != 0 ? <div>{previous}</div>:"" }
            </div>

            <div className="">
              { (topic != "")&&(turn==0) ? 
                <div className="centered">
                  <div>Tema de la historia</div>
                  <div className="rounded bg-blue-400 ml-4">
                  #{topic}
                  <Image className="ml-4" src="/quick-game/twitter_trend.png" width={30} height={30}/>
                  </div>
                </div>
              :
                ""
              }
              {topic == "" ?
                <>
                  <div className="centered">
                    Palabras a introducir
                  </div>
                  <div className="centered">
                    <DisplayPalabraClave palabra={randomWords[0]}/>
                    <DisplayPalabraClave palabra={randomWords[1]}/>
                    <DisplayPalabraClave palabra={randomWords[2]}/>
                  </div>
                </>
              : 
                ""  
              }
            </div>

            <div className="centered">
              <Image className="ml-4" src="/quick-game/clock.png" width={30} height={30}/>{parseInt(clock/60)}min:{clock % 60}seg
            </div>

            <div className="centered">
              { topic =="" ? 
              <>
                <SpecialInputBox/>
                <input className ="absolute rounded-2xl w-8/12 h-48 bg-transparent font-blank" required={true} maxLength={200} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
              </> 
              :

              <textarea className={`storyWrite border-green-800 text-2xl font-arial inline-flex flex-col h-48 w-8/12 ${ punyeta == "reves" ? "font-reverse" : ""} ${ punyeta == "ciego" ? "font-blank bg-black" : ""}`} type="password" required={true} maxLength={200} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
              }
            </div>

            <div className="clickable-item centered">
              <input className="bg-blue-400 w-32 rounded-xl" type="submit" value="Enviar parrafo"/>
            </div>

          </form>
        </div>
        <div className="bg-green-800 flex flex-col w-60 mr-40">
          <div className="flex-row">
            <button onClick={openClose} className="text-xl text-white p-2">{ punyetasM == "objetivo"  ? "¿A quien le envias la puñeta?" : <>Comprar puñetas <Image src={`/quick-game/punyetas.png`} width={40} height={40}/></>}</button>
          </div>
          { punyetasM == "punyeta" ? <MenuPunyeta/> : ""}
          { punyetasM == "objetivo" ? <DestinoPunyeta/> : ""}
        </div>
        { state == "waiting_players" ? <div className="absolute w-screen h-screen flex bg-opacity-75 bg-black text-6xl justify-center pt-60 text-white" >Esperando al resto de jugadores{dots}</div> : ""}
      </Layout> 
    </>
  )
}
//        { state == "waiting_players" ? <div className="absolute w-screen h-screen" ><Image src="/quick-game/wait.png" height={500} width={1000}/></div> : ""}