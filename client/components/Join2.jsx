import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {NameContext} from '../context/NameContext.jsx'
import {GlobalContext} from '../context/GlobalContext.jsx'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

export default function create(){
  const [name, setName] =  useContext(NameContext);
  const {gameID, setGameID, socket, setSocket} = useContext(GlobalContext)

  useEffect(()=>{
    const conSocket = socketIOClient(ENDPOINT);
    conSocket.on("connected", data => {
      console.log("Connected");
    });  
    conSocket.on("playerJoinedRoom", (data)=>{
      
      console.log(data)
    });
    setSocket(conSocket);
  },[])


  function connectToSocket(){
    let data = {
      gameID: Number(gameID),
      playerName: name
    }
    socket.emit('joinGame', data);
  }
  

  return(
      <div>
        <p>Name:</p>
        <input type="text" required="required" placeholder="Your Name" onChange={(event)=>{setName(event.target.value)}} value={name}></input>
        <p>Lobby ID:</p>
        <input type="text" required="required" placeholder="Input Lobby ID"  onChange={(event)=>{setGameID(event.target.value)}} value={gameID}></input>
        <div><button onClick={()=>{connectToSocket()}}>Join Game</button></div>
      </div>
    )
  }