import Link from 'next/link'
var sha512 = require(`sha512`)
var SecureRandom = require('securerandom');

export default function Home() {

    return (
      <>
        <div className='background'>
          <Link href='/login'>
            <h1 className='franken'>Inicio de Sesión</h1>
          </Link>
        </div>
      </>
  )
}