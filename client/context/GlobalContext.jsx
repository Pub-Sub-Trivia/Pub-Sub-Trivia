import React, {useState, createContext} from 'react';


export const GlobalContext = createContext();

export const GlobalProvider = props =>{
    const [socket, setSocket] = useState("");
    const [gameID, setGameID] = useState("");
    const value = {socket, setSocket, gameID, setGameID}
    return(<GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>)
}