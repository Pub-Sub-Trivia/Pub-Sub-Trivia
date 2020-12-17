import React, {useState, createContext} from 'react';


export const GlobalContext = createContext();

export const GlobalProvider = props =>{
    const [socket, setSocket] = useState("");
    const [gameID, setGameID] = useState("");
    const [players, setPlayers] = useState(0);
    const value = {socket, setSocket, gameID, setGameID, players, setPlayers}
    return(<GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>)
}