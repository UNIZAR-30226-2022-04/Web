import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const maxChars = 200

const WriteStory = ({first,creator,id}) => {

  var url
  const router = useRouter()
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentText, setCurrentText] = useState("")
  var maxChar
  var title = "Titulaco"
  var body = "Parrafo por defecto"
  var user
  var password
  var isLast

  useEffect(()=>{
    user = localStorage.getItem("username")
    password = localStorage.getItem("password")
  }, [])

  useEffect(()=>{
    const getPrevious = async () =>{
      if(!first){
        url="https://mooncode-frankenstory-dev.herokuapp.com/api/tale_mode/resume_tale"  
        var data = {
          username: user,
          password: password,
          id: 1,
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
        res = await res.json()
        maxChar = res.maxCharacters
        title = res.title
        body = res.paragraphs[res.paragraphs.lenght()].text
      }
    }
    getPrevious()
  }, [user])

  const create_tale = async () => {
    url = "https://mooncode-frankenstory-dev.herokuapp.com/api/tale_mode/create_tale"
    var data = {
      username: user,
      password: password,
      title:currentTitle,
      maxTurns:1,
      maxCharacters:maxChars,
      privacy:1,
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
    var res = await fetch(url,options)
    return res.json()
  }

  const add_tale_paragraph = async () => {
    url = "https://mooncode-frankenstory-dev.herokuapp.com/api/tale_mode/add_tale_paragraph"
    var data = {
      username:localStorage.getItem("username"),
      password:localStorage.getItem("password"),
      id:id_historia,
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
    var res = await fetch(url,options)
    return res.json()
  }

  const onSubmit = () => {
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

  const notLast = () => {
    isLast = false
  }

  return (
      <div className="storyBox">
        <form onSubmit={onSubmit}>
            <div className="centered">
              <div className="commonTitle h-auto">{first ? <>Empieza tu relato</> : <>{title}</> } </div>
            </div>
            <div className="centered text-lg">
              {first ? <input className="titleWrite w-6/12 mx-0 bg-gray-200" type="text" required="true" maxLength={100} value={currentTitle} placeholder="Titulo del relato" onChange={(e) => setCurrentTitle(e.target.value)}/>
              :<div className="mb-10">{body}</div> }
            </div>
            <div className="centered">
              <textarea className="storyWrite inline-flex text-lg flex-col h-48 w-6/12" type="text" required="true" maxLength={maxChar} value={currentText} placeholder="Escribe tu parrafo" onChange={(e) => setCurrentText(e.target.value)}/>
            </div>
            <div className="clickable-item centered">
              <input className="bg-blue-400 w-32 rounded-xl" type="submit" value="Enviar parrafo" onClick={notLast}/>
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