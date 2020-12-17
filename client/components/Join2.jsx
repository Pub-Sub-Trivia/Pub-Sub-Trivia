import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import {GlobalContext} from '../context/GlobalContext.jsx'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

export default function create(){
  const {gameID, setGameID, socket, setSocket, name, setName, question, setQuestion, players, setPlayers, score, setScore, globalRedirect, setGlobalRedirect, endGame, setEndGame} = useContext(GlobalContext)
  const [redirect, setRedirect] = useState(false);
  useEffect(()=>{
    const conSocket = socketIOClient(ENDPOINT);
    conSocket.on("connected", data => {
      console.log("Connected");
    });  
    conSocket.on("playerJoinedRoom", (data)=>{
      
      console.log(data)
    });

    conSocket.on("newQuestion",(data)=>{
      let insert = Math.floor(Math.random() * Math.floor(3));
      let answersArr = data.question.incorrect_answers
      answersArr.splice(insert,0, data.question.correct_answer)
      let question = {
        question: data.question.question,
        answers: answersArr,
        correctAnswer: insert
      }
      setQuestion(question);
      setGlobalRedirect(true);

      setRedirect(true);
    })

    conSocket.on("currentScores", (data)=>{
      let userID = Object.keys(data["scores"]) 
      let curScore = [];
      for(let i = 0; i < userID.length; i++){
        let nameIndividual = data["scores"][userID[i]].username
        let scoreIndividual = data["scores"][userID[i]].score
        curScore.push({[nameIndividual]:scoreIndividual})

      }
      setScore(curScore)
    })

    setSocket(conSocket);
  },[])

  function connectToSocket(){
    let data = {
      gameID: Number(gameID),
      playerName: name
    }
    socket.emit('joinGame', data);
  }
  
  if(redirect===false){

    return(
        <div className="page">
          <p>Name:</p>
          <input type="text" required="required" placeholder="Your Name" onChange={(event)=>{setName(event.target.value)}} value={name}></input>
          <p>Lobby ID:</p>
          <input type="text" required="required" placeholder="Input Lobby ID"  onChange={(event)=>{setGameID(event.target.value)}} value={gameID}></input>
          <div><button onClick={()=>{connectToSocket()}}>Join Game</button></div>
        </div>
      )

  }else{
    return <Redirect to="/triviamain"></Redirect>
  }

  }