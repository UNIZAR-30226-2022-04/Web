import Layout from 'components/Layout'
import QuickWrite from 'components/QuickWrite'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import Image from "next/Image"

export default function Continue() {

  var url
  var filtradas

  const participantes = [
    {
      username:"Uno",
      picture: 1,
      stars: 111
    },{
      username:"Trio",
      picture: 3,
      stars: 333
    },{
      username:"Quintus",
      picture: 5,
      stars: 555
    },{
      username:"Septem",
      picture: 7,
      stars: 777
    }]

  const router = useRouter()
  const [windowUser, setWindowUser] = useState({}) 

  const [punyetasM, setPunyetasM] = useState("")
  const [punyeta, setPunyeta] = useState("")
  const [punyetasCompradas, setPunyetasCompradas] = useState([])
  const [monedas, setMonedas] = useState(1000)
  const [currentTitle, setCurrentTitle] = useState("")
  const [previous, setPrevious] = useState("")
  const [currentText, setCurrentText] = useState("")
  const [maxChar, setMaxChar ] = useState(200)
  const [handicap, setHandicap] = useState("")
  const [mode, setMode] = useState("aleatorio")
  const [topic, setTopic] = useState("Topicazo")
  const [randomWords, setWords] = useState(["Rayo","Fuego","Hielo"])
  const [time, setTime] = useState(20000)
  const [clock, setClock] = useState(0)
  var queryParams
  var isLast
  var first = true

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

  useEffect(()=>{
    queryParams = new URLSearchParams(window.location.search);
    isLast = (queryParams.get("lastTurn")!=0)
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
    }else{
      router.push("/")
    }
  }, [])

  // Si tadavía no hoy usuario, esperamos a que lo haya
  if(!windowUser){
    return <Spinner />
  }

  const layoutInfo = {
    username: windowUser.username,
    stars:    windowUser.stars,
    coins:    windowUser.coins,
    image_ID: windowUser.picture
  }  

  const add_quick_game_paragraph = async () => {
    url = "http://localhost:3000/api/tale_mode/add_tale_paragraph"
    var data = {
      username:windowUser.username,
      password:windowUser.password,
      id:1,
      body:currentText,
      turn:1,
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
    var res = await fetch(url,options)
    return res.json()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    add_quick_game_paragraph().then((res) =>{
      if(res.result == "error"){
        alert("Error al crear historia")
      }
    })
  }

  const openClose = (e) => {
    e.preventDefault()
    if(punyetasM == ""){
      setPunyetasM("punyeta")
    }else{
      setPunyetasM("")
      setPunyeta("")
    }
  }

  function MenuPunyeta(){

    function ButtonPunyeta({img,name,text,price}){
      const choosePunyeta = (e) => {
        e.preventDefault()
        setPunyetasM("objetivo")
        setPunyeta(name)
      }
      return (
        <button className="bg-white rounded m-2 flex w-40" onClick={choosePunyeta}>
          <Image src={`/quick-game/punyetas.png`} width={40} height={40}/>
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
          <ButtonPunyeta img={1} name={"reves"} text={"Letras al revés"} price={150} />
        </li>
        <li>
          <ButtonPunyeta img={2} name={"ciego"} text={"Escribe a ciegas"} price={300} />
        </li>
        <li>
          <ButtonPunyeta img={3} name={"desorden"} text={"Desorden total"} price={500} />
        </li>
      </ul>
    )
  }



  function DestinoPunyeta(){

    function Rival({username,picture,stars}){
      const chooseTarget = (e) => {
        e.preventDefault()
        var precio
        //Comprobamos precio de puñeta
        switch(punyeta){
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
        var dupla = {puneta:punyeta,username:username}
        //Comprobamos si ya hay una puñeta dirigida a ese jugador
        filtradas = (punyetasCompradas.filter((compra) => compra.username == username))
        if (filtradas.length == 0){
          //Si no hya putadas dirigidas al jugador y nos llegan las monedas añadimos la puñeta a la lista
          if(monedas-precio < 0){
            alert("Monedas no suficientes")
            return
          }
          setPunyetasCompradas([...punyetasCompradas, dupla])
          setMonedas(monedas-precio)
        }else{
          //Si hay putada anterior comprobamos que sea de diferente tipo
          var anterior = filtradas[0].puneta
          if (anterior == punyeta){
            return
          }
          //Si es de diferente tipo devolvemos monedas o comprobamos que tengamos
          //las suficientes para cubrir la diferencia

          switch(punyeta){
            case "reves":
              if(anterior == "ciego"){
                if(monedas >= 150){
                  setMonedas(monedas-150)
                }else{
                  alert("Monedas no suficientes")
                  return
                }
              }else if(anterior == "desorden"){
                if(monedas >= 350){
                  setMonedas(monedas-350)
                }else{
                  alert("Monedas no suficientes")
                  return
                }
              }
              break
            case "ciego":
              if(anterior == "reves"){
                setMonedas(monedas+150)
              }else if(anterior == "desorden"){
                if(monedas >= 200){
                  setMonedas(monedas-200)
                }else{
                  alert("Monedas no suficientes")
                  return
                }
              }
              break
            default :
            if(anterior == "reves"){
              setMonedas(monedas+350)
            }else if(anterior == "ciego"){
              setMonedas(monedas+200)
            }
          }
          //Obtenemos una lista con todas las puñetas excepto la antigua dirigida
          //al mismo usuario y añadimos la nueva
          filtradas = (punyetasCompradas.filter((compra) => compra.username != username))
          setPunyetasCompradas([...filtradas, dupla])
        }
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
          {participantes.map((rival) => 
          <li> 
            <Rival username={rival.username} picture={rival.picture}/>
          </li>
          )}
      </ul>
    )
  }

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
          <div className="flex flex-row flex-wrap justify-center space-x-2 w-full">
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
      <div className="storyWrite text-2xl font-arial inline-flex flex-col h-48 w-8/12 bg-white">
        <SpecialText/>
      </div>
    )
  }

  function DisplayPalabraClave({palabra}){
    var incluida = currentText.includes(palabra)
    return(
      <div className={`px-1 mx-2 ${ incluida ? "bg-green-800 text-white" : "bg-green-600"}`}>{palabra}</div>
    )
  }

  return (
    <>
        <Layout data={layoutInfo}>
        <div className="relative storyBox">
          <form onSubmit={onSubmit}>

            <div className="centered">
              <div className="commonTitle h-auto">{first ? <>Comienza la historia</> : <>Párrafo anterior</> } </div>
            </div>

            <div className='centered text-lg'>
              { !first ? <div></div>:"" }
            </div>

            <div className="">
              { mode == "twitter" ? 
                <div className="centered">
                  <div>Tema de la historia</div>
                  <div className="rounded bg-blue-400 ml-4">
                  #{topic}
                  <Image className="ml-4" src="/quick-game/twitter_trend.png" width={30} height={30}/>
                  </div>
                </div>
                :
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
              }
            </div>

            <div className="centered">
              <Image className="ml-4" src="/quick-game/clock.png" width={30} height={30}/>{parseInt(clock/60)}min:{clock % 60}seg
            </div>

            <div className="centered font-blank bg-transparent">
              
            </div>

            <div className="centered">
              { mode=="aleatorio" ? 
              <>
                <SpecialInputBox/>
                <input className ="absolute w-8/12 h-48 bg-transparent font-blank" required={true} maxLength={maxChar} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
              </> 
              :
              <textarea className={`storyWrite text-2xl font-arial inline-flex flex-col h-48 w-8/12 ${ handicap== "reves" ? "font-reverse" : ""}${ handicap == "ciego" ? "font-blank" : ""}`} type="password" required={true} maxLength={maxChar} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
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
        </Layout> 
    </>
  )
}