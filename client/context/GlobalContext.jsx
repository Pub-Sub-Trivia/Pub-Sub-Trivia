import React, {useState, createContext} from 'react';


export const GlobalContext = createContext();

export const GlobalProvider = props =>{
    const [socket, setSocket] = useState("");
    const [gameID, setGameID] = useState("");
    const [players, setPlayers] = useState(0);
    const [name, setName] = useState('');
    const [question, setQuestion] = useState('');

    const value = {socket, setSocket, gameID, setGameID, players, setPlayers, name, setName, question, setQuestion}
    return(<GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>)
}