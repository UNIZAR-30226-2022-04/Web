import Link from "next/Link"

const InicioSesion = () => {
  return (
    <form>
        <h1>Iniciar Sesión</h1>
        <div>
            <label>Usuario</label>
            <input type="text" placeholder="Usuario" onChange={(e) => setText(e.target.value)}/>
        </div>
        <div>
            <label>Contraseña</label>
            <input type="text" placeholder="Usuario" onChange={(e) => setText(e.target.value)}/>
        </div>
        <div>
            <Link href="/">Crear Cuenta</Link>
        </div>
        <input type="submit" value="Iniciar sesión"/>
    </form>
  )
}

export default InicioSesion