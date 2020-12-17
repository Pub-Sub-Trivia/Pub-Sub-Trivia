import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {GlobalContext} from '../context/GlobalContext.jsx'

export default function create(){
  const {gameID, setGameID, socket, setSocket, name, setName, question, setQuestion, players, setPlayers, score, setScore, globalRedirect, setGlobalRedirect, host, setHost, endGame, setEndGame} = useContext(GlobalContext)

  useEffect(()=>{
    if(socket){
      console.log('itsa me')
      socket.on("playerJoinedRoom", (data)=>{
        console.log(data)
        setPlayers(players+1)
      });
      socket.on("newQuestion",(data)=>{
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
      })

      socket.on("currentScores", (data)=>{
        let userID = Object.keys(data["scores"]) 
        let curScore = [];
        for(let i = 0; i < userID.length; i++){
          let nameIndividual = data["scores"][userID[i]].username
          let scoreIndividual = data["scores"][userID[i]].score
          curScore.push({[nameIndividual]:scoreIndividual})
          
        }
        setScore(curScore)
      })
      setHost(true);
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
    <div className="page">
      <div className="config">
      <p>Name:</p>
      <p>{name}</p>
      </div>
      <div className="config">
      <p>Lobby ID:</p>
      <p>{gameID}</p>
      </div>
      <div>
        <Link to="/triviamain">
          <button className="main-menu" onClick={()=>{startGame()}}>Start Game</button>
        </Link>
      </div>
    </div> 
  )
}