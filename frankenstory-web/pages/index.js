import Link from 'next/link'

export default function Home() {
  return (
      <>
        <div class='background'>
          <Link href='/login'>
            <h1 class='franken'>Inicio de Sesión</h1>
          </Link>
        </div>
      </>
  )
}