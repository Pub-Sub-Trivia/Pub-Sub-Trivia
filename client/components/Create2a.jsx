import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {GlobalContext} from '../context/GlobalContext.jsx'

export default function create(){
  const {gameID, setGameID, socket, setSocket, name, setName, question, setQuestion, players, setPlayers, score, setScore, globalRedirect, setGlobalRedirect, host, setHost} = useContext(GlobalContext)

  useEffect(()=>{
    if(socket){
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
        console.log("test next ques")
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