import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { LoginProvider } from 'contexts/LoginContext'


function MyApp({ Component, pageProps }) {
  return (
    <LoginProvider>
      <Component {...pageProps} />
    </LoginProvider>      
  ) 
}

export default MyApp
