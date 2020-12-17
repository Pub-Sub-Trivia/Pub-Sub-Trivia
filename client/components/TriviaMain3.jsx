import React, {Component, useState, useEffect, useContext, useRef} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {GlobalContext} from '../context/GlobalContext.jsx'


export default function create(){
  const {gameID, setGameID, socket, setSocket, name, setName, question, setQuestion, players, setPlayers, setGlobalRedirect, endGame, setEndGame} = useContext(GlobalContext)
  const[redirect, setRedirect] = useState(false);
  const[timer, setTimer] = useState(45);
  // const _isMounted = useRef(true);

  // setTimeout(() => setTimer(timer-1), 1000);
  // if(timer<=0){
  //   sendAnswer('wrong')
  // }

  // useEffect(() => {
  //   return () => { // ComponentWillUnmount in Class Component
  //       _isMounted.current = false;
  //   }
  // }, []);

  function sendAnswer(answer){
    // console.log(answer)
    let data = {
      gameID:gameID,
      answer:answer
    }
    socket.emit("answerQuestion", data);
    setRedirect(true);
    setEndGame(endGame-1)
  }

  useEffect(()=>{
    setGlobalRedirect(false);
  })
  

  if(redirect){
    return <Redirect to="/lobbyanswers"></Redirect>
  }
  else if(!question){
    // console.log("wait")
    return(

    <div className="page">
        <div>
          <h3>Question #: </h3>
          <h3>Time Remaining: </h3>
          {/* <p>timer:{timer}</p> */}
        </div>
        <div>
          <button> A. placeholder</button>
          <button> B. placeholder</button>
          <button> C. placeholder</button>
          <button> D. placeholder</button>
        </div>
      </div>

    )
  }else{
    // console.log("working")
    return(
      <div className="page">
        <div>
          <p>timer:{timer}</p>
        </div>
        <div>
          <h3>Question: {question.question} </h3>
          {question.answers.map((el,index)=>{
            return <button key={index} onClick={(event)=>{sendAnswer(event.target.value)}} value={el}>{el}</button>
          })}
        </div>
      </div>
    )
  }
  
}