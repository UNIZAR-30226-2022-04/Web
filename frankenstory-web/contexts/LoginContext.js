import React, { useContext, useState } from 'react'

const LoginContext = React.createContext();
const LoginContextUpdate = React.createContext();

// Hook que devuelve el contexto de almacenaje de usuarios 
export function useLogin (){ return useContext(LoginContext) }

// Hook que devuelve el contexto de modificación de usuarios 
export function useLoginUpdate (){ return useContext(LoginContextUpdate) }

// Wrapper que permite a todas lás páginas acceder a esta información y modificarla
export const LoginProvider = ({ children }) => 
{
    // Hooks que permiten guardar información de los usuarios
    const [ctxUsername, setctxUsername] = useState("")
    const [ctxPassword, setctxPassword] = useState("")
    const [ctxLogged, setctxLogged] = useState(false)

    //Funciones que modifican los valores de los useState Hooks
    function logInUser(user, pass){
        setctxUsername(user)
        setctxPassword(pass)
        setctxLogged(true)
    }

    function logOutUser(){
        setctxLogged(false)
    }

    // Wrapper
    // LoginContext.Provider            -> value: varibles (en un futuro puede que sean funciones) que dan información sobre el usuario
    //   LoginContextUpdate.Provider    -> value: funciones que permiten modificar la información de los usuarios 
    return (
        <LoginContext.Provider value={{ctxUsername, ctxPassword, ctxLogged}} >
            <LoginContextUpdate.Provider value={{logInUser, logOutUser}}>
                {children}
            </LoginContextUpdate.Provider>            
        </LoginContext.Provider>
    )    
}
