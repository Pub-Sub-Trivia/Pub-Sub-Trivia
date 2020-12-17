import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {GlobalContext} from '../context/GlobalContext.jsx'

export default function create(){
  const {gameID, setGameID, socket, setSocket, name, setName, question, setQuestion, players, setPlayers} = useContext(GlobalContext)

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