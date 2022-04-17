import React, { useContext, useState } from 'react'

const FriendsContext = React.createContext();
const FriendsContextUpdate = React.createContext();

// Hook que devuelve el contexto de almacenaje de usuarios 
export function useFriends (){ return useContext(FriendsContext) }

// Hook que devuelve el contexto de modificación de usuarios 
export function useFriendsUpdate (){ return useContext(FriendsContextUpdate) }

// Wrapper que permite a todas lás páginas acceder a esta información y modificarla
export const FriendsProvider = ({ children }) => {

    const [ctxFriends, setctxFriends] = useState([])
    const [ctxNotifications, setctxNotifications] = useState([])

    function changeFriends(friends){
        setctxFriends(friends)
    }

    function changeNotifications(notifications){
        setctxNotifications(notifications)
    }

    // Wrapper
    // LoginContext.Provider            -> value: varibles (en un futuro puede que sean funciones) que dan información sobre el usuario
    //   LoginContextUpdate.Provider    -> value: funciones que permiten modificar la información de los usuarios 
    return (
        <FriendsContext.Provider value={{ctxFriends, ctxNotifications}} >
            <FriendsContextUpdate.Provider value={{changeFriends, changeNotifications}}>
                {children}
            </FriendsContextUpdate.Provider>            
        </FriendsContext.Provider>
    )    
}
