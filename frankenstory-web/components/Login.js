import { useState } from "react"
import Link from "next/link"

const tryLogin = async (user,pass) => {
  var url = "https://mooncode-frankenstory-dev.herokuapp.com/api/login"

  var data = {
    username:user,
    password:pass
  }
  data = JSON.stringify(data)

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.satus == 200){
      var response = JSON.parse(xhttp.responseText)
      console.log(response)
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json")
  xhttp.setRequestHeader("Accept", "application/json")
  xhttp.setRequestHeader()
  xhttp.send();



}

const Login = () => {

  const onSubmit = (e) => {
    e.preventDefault()
    if(name == ""){
      alert("Introduce un nombre de usuario")
    }else if(password == ""){
      alert("Introduce una contraseña")
    }else{
      setName("")
      setPassword("")
      console.log(name)
      console.log(password)
      tryLogin(name,password)
    }
  }

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const goTo = '/' + name + '/friends'

  return (
      <form className ="m-auto justify-center p-6 bg-white align-middle" onSubmit={onSubmit}>
          <h1 className="pb-3 pt-6 px-10 text-4xl text-blue-800 font-bold">Iniciar sesión</h1>
          <div>Usuario</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={name} placeholder="Usuario" onChange={(e) => setName(e.target.value)}/>
          <div>Contraseña</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={password} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
          <div className="py-2 font-bold text-blue-800"><Link  href="/">Crear Cuenta</Link></div>
          <button className="ml-20 bg-center text-white justify-self-center bg-blue-900 rounded-md px-4 py-2" type="submit">Iniciar sesión</button>
      </form>
  )
}

export default Login