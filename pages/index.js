import Link from 'next/link'

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