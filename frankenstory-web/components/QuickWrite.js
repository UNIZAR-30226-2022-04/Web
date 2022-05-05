import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const WriteStory = ({first,type}) => {

  var url
  const router = useRouter()
  const [currentTitle, setCurrentTitle] = useState("")
  const [previous, setPrevious] = useState("")
  const [currentText, setCurrentText] = useState("")
  const [maxChar, setMaxChar ] = useState(200)
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const queryParams = new URLSearchParams(window.location.search);
  var isLast = (queryParams.get("lastTurn")!=0)
  const creator = queryParams.get("creator")

  useEffect(()=>{
    setUser(localStorage.getItem("username"))
    setPassword(localStorage.getItem("password"))
    const getPrevious = async () =>{
      if(!first){
        url="http://localhost:3000/api/tale_mode/resume_tale"
        var data = {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          id: parseInt(queryParams.get("id")),
        }
        var options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
          },
          body: JSON.stringify(data)
        }
        console.log("Hola")
        console.log(options)
        var res = await fetch(url,options)
        res = await res.json()
        console.log(res)
        if(res.result != "error"){
          setMaxChar(res.maxCharacters)
          setCurrentTitle (res.title)
          setPrevious(res.paragraphs[(res.paragraphs.length)-1].text)
        }else{
          alert("No se ha encontrado la historia")
          router.push("/storyMode")
        }
      }else{
        setMaxChar(parseInt(queryParams.get("characters")))
      }
    }
    getPrevious()
  }, [])

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

  const setLast = () => {
    isLast = true
  }

  return (
      <div className="storyBox">
        <form onSubmit={onSubmit}>
            <div className="centered">
              <div className="commonTitle h-auto">{first ? <>Comienza la historia</> : <>{currentTitle}</> } </div>
            </div>
            <div className="centered text-lg">
              {first ? <input className="titleWrite w-6/12 mx-0 bg-gray-200" type="text" required={true} maxLength={100} value={currentTitle} placeholder="Titulo del relato" onChange={(e) => setCurrentTitle(e.target.value)}/>
              :<div className="mb-10">{previous}</div> }
            </div>
            <div className="centered">
              <textarea className="storyWrite inline-flex text-lg flex-col h-48 w-6/12" type="text" required={true} maxLength={maxChar} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
            </div>
            <div className="clickable-item centered">
              <input className="bg-blue-400 w-32 rounded-xl" type="submit" value="Enviar parrafo"/>
            </div>
            { (!first && (creator == user) ) ? 
            <div className="clickable-item centered">
              <input className ="bg-red-400 w-32 rounded-xl" type="submit" value = "Terminar relato" onClick={setLast}/>
            </div>
            : ""}
        </form>
      </div>
  )
}

export default WriteStory