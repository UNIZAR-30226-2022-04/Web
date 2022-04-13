import React, { useContext, useState } from 'react'

export const LoginContext = React.createContext({
    ctxUsername:"", 
    ctxPassword:"",
    ctxTimeLimit:"",
    ctxLogged: false,
    setctxUsername: async (ctxUsername) => null,
    setctxPassword: async (ctxPassword) => null,
    setctxTime: async (ctxTimeLimit) => null,
    setctxLogged: async (ctxLogged) => null
});

export const useLogin = () => useContext(LoginContext)

export const LoginProvider = ({ children }) => 
{
    const [ctxUsername, setctxUsername] = useState("")
    const [ctxPassword, setctxPassword] = useState("")
    const [ctxTimeLimit, setctxTime] = useState("")
    const [ctxLogged, setctxLogged] = useState(false)

    return (
        <LoginContext.Provider value={{ctxUsername, ctxPassword, ctxTimeLimit, ctxLogged, setctxUsername, setctxPassword, setctxTime, setctxLogged}} >
            {children}
        </LoginContext.Provider>
    )    
}
