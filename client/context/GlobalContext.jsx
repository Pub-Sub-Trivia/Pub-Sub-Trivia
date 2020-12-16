import React, {useState, createContext} from 'react';


export const GlobalContext = createContext();

export const GlobalProvider = props =>{
    const [socket, setSocket] = useState(null);
    const [socketNum, setSocketNum] = useState(null);
    const value = {socket, setSocket, socketNum, setSocketNum}
    return(<GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>)
}