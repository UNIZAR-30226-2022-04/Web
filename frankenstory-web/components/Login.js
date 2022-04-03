import { useState } from "react"
import Link from "next/link"

const checkLogin = async ({user},{pass}) => {
  var req
  var res
  let data = {
    username:user,
    password:pass
  }
  req = await fetch(
    `https://mooncode-frankenstory-dev.herokuapp.com/api/login?username=${user}_password=${pass}`,
    {method:"POST",
    Accept:"json",
    headers:{'Content-Type': 'application/json'},
    body : JSON.stringify(data)})
  res = await req.json()
  console.log(res)
}

const Login = () => {
  var res
  var res2
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  var send
  const onSubmit = (e)=>{
    e.preventDefault()
    if(name == ""){
      alert("Introduce un nombre de usuario")
    }else if(password == ""){
      alert("Introduce una contraseña")
    }else{
      setName("")
      setPassword("")
      checkLogin(name,password)
    }
  }

  const goTo = '/' + name + '/friends'

  return (
      <form className ="m-auto justify-center p-6 bg-white align-middle" onSubmit={onSubmit}>
          <h1 className="pb-3 pt-6 px-10 text-4xl text-blue-800 font-bold">Iniciar sesión</h1>
          <div>Usuario</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={name} placeholder="Usuario" onChange={(e) => setName(e.target.value)}/>
          <div>Contraseña</div>
          <input className="p-2 w-full bg-blue-100 text-blue-400" type="text" value={password} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
          <div className="py-2 font-bold text-blue-800"><Link  href="/">Crear Cuenta</Link></div>
          <Link href={goTo}>
            <input className="ml-20 bg-center text-white justify-self-center bg-blue-900 rounded-md px-4 py-2" type="submit" value="Iniciar sesión"/>
          </Link>          
      </form>
  )
}

export default Login