import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {NameContext} from '../context/NameContext.jsx'
import {GlobalContext} from '../context/GlobalContext.jsx'
import {QuestionContext} from '../context/QuestionContext.jsx'

export default function create(){
  const [name, setName] =  useContext(NameContext);
  const {socket, setSocket, gameID, setGameID, players, setPlayers}= useContext(GlobalContext)
  const [question, setQuestion] = useContext(QuestionContext)
  
  useEffect(()=>{
    if(socket){
      socket.on("playerJoinedRoom", (data)=>{
        console.log(data)
        setPlayers(players+1)
      });
      socket.on("newQuestion",(data)=>{
        setQuestion(data);
      })
    }
  },[])

  function startGame(){
    if(gameID){
      let data = {
        gameID:gameID
      }
      socket.emit('startGame', data);
    }
  }

  return(
    <div>
      <p>Name:</p>
      <p>{name}</p>
      <p>Lobby ID:</p>
      <p>{gameID}</p>
      <div>
        <Link to="/triviamain">
          <button onClick={()=>{startGame()}}>Start Game</button>
        </Link>
      </div>
    </div> 
  )
}