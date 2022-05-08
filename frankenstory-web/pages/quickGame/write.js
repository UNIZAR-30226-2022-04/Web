import Layout from 'components/Layout'
import QuickWrite from 'components/QuickWrite'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import Image from "next/Image"

export default function Continue() {

  var url

  const router = useRouter()
  const [windowUser, setWindowUser] = useState({}) 

  const [currentTitle, setCurrentTitle] = useState("")
  const [previous, setPrevious] = useState("")
  const [currentText, setCurrentText] = useState("")
  const [maxChar, setMaxChar ] = useState(200)
  const [handicap, setHandicap] = useState("")
  const [mode, setMode] = useState("aleatorio")
  const [topic, setTopic] = useState("Topicazo")
  const [randomWords, setWords] = useState(["Rayo","Fuego","Hielo"])
  const [time, setTime] = useState(10)
  const [clock, setClock] = useState(0)
  const queryParams = new URLSearchParams(window.location.search);
  var isLast = (queryParams.get("lastTurn")!=0)
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
      console.log("SACO DATOS")
    }else{
      console.log("VOY A LOGIN")
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

  const create_tale = async () => {
    url = "http://localhost:3000/api/tale_mode/create_tale"
    var data = {
      username: user,
      password: password,
      title:currentTitle,
      maxTurns: parseInt(queryParams.get("turns")),
      maxCharacters:maxChar,
      privacy: (queryParams.get("privacy")==1),
      first_paragraph:currentText
    }
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
    }
    console.log(options)
    var res = await fetch(url,options)
    console.log(res)
    return res.json()
  }

  const add_tale_paragraph = async () => {
    url = "http://localhost:3000/api/tale_mode/add_tale_paragraph"
    var data = {
      username:localStorage.getItem("username"),
      password:localStorage.getItem("password"),
      id:parseInt(queryParams.get("id")),
      body:currentText,
      isLast:isLast
    }
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
    }
    console.log(options)
    var res = await fetch(url,options)
    console.log (res)
    return res.json()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(first){
    create_tale().then((res) =>{
      if(res.result == "error"){
        alert("Error al crear historia")
      }
    })
    }else{
      add_tale_paragraph().then((res) =>{
        if(res.result == "error"){
          alert("Error al continuar historia")
        }
      })
    }
    router.push("/storyMode")
  }

  return (
    <>
        <Layout data={layoutInfo}>
        <div className="storyBox">
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
                    <div className="bg-green-600 px-1">{randomWords[0]}</div>
                    <div className="bg-green-600 px-1 mx-2">{randomWords[1]}</div>
                    <div className="bg-green-600 px-1">{randomWords[2]}</div>
                  </div>
                </>
              }
            </div>

            <div className="centered">
              <Image className="ml-4" src="/quick-game/clock.png" width={30} height={30}/>{parseInt(clock/60)}min:{clock % 60}seg
            </div>

            <div className="centered">
              <textarea className={`storyWrite text-2xl font-arial inline-flex flex-col h-48 w-6/12 ${ handicap== "reves" ? "font-reverse" : ""}${ handicap == "ciego" ? "font-blank" : ""}`} type="password" required={true} maxLength={maxChar} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
            </div>

            <div className="clickable-item centered">
              <input className="bg-blue-400 w-32 rounded-xl" type="submit" value="Enviar parrafo"/>
            </div>

          </form>
        </div>
        </Layout> 
    </>
  )
}