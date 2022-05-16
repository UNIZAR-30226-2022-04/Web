import Link from 'next/link'
var sha512 = require(`sha512`)
var SecureRandom = require('securerandom');

export default function Home() {

    const funcion = () =>{
      var hash = sha512("adios")
      console.log(hash.toString('hex'))
      alert("1")
      var salt = SecureRandom.hex(16)
      hash = sha512("adios"+ salt )
      console.log(hash.toString('hex'))
      alert("Ya")
    }

    return (
      <>
        <div className='background'>
          <Link href='/login'>
            <h1 className='franken'>Inicio de Sesión</h1>
          </Link>
          <input type="button" value={"boton"} onClick={() => funcion()}/>
        </div>
      </>
  )
}