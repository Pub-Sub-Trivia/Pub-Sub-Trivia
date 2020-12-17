import React, {useState, createContext} from 'react';


export const GlobalContext = createContext();

export const GlobalProvider = props =>{
    const [socket, setSocket] = useState("");
    const [gameID, setGameID] = useState("");
    const [players, setPlayers] = useState(0);
    const [name, setName] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState([]);
    const [globalRedirect, setGlobalRedirect] = useState(false);
    const [host, setHost] = useState(false);
    const [endGame, setEndGame] = useState(0);

    const value = {socket, setSocket, gameID, setGameID, players, setPlayers, name, setName, question, setQuestion, answers, setAnswers, score, setScore,  globalRedirect, setGlobalRedirect, host, setHost, endGame, setEndGame}
    return(<GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>)
}