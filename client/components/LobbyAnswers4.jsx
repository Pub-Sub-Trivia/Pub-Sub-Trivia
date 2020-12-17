import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {GlobalContext} from '../context/GlobalContext.jsx'

export default function create(){
  const {gameID, setGameID, socket, setSocket, name, setName, question, setQuestion, players, setPlayers, answers, setAnswers, score, setScore, globalRedirect, setGlobalRedirect,  host, setHost} = useContext(GlobalContext)
  // const [redirect,setRedirect] = useState(false);


  useEffect(()=>{
    

    // socket.on("newQuestion",(data)=>{
    //   let insert = Math.floor(Math.random() * Math.floor(3));
    //   let answersArr = data.question.incorrect_answers
    //   answersArr.splice(insert,0, data.question.correct_answer)
    //   let question = {
    //     question: data.question.question,
    //     answers: answersArr,
    //     correctAnswer: insert
    //   }
    //   console.log(question)
    //   setQuestion(question);
    //   setRedirect(true);
    // })

  },[])
  function nextQuestion(){
    let data = {
      gameID:gameID,
    }
    socket.emit("nextQuestion",data);
    // setRedirect(true);
  }
  console.log(globalRedirect)

  if(globalRedirect===false){
    return(
      <div className="page">
        <Link to="/lobbyscore">
          <button>Overall Score</button>
        </Link>
        <div>
          <h3>Question: {question.question} </h3>
          {question.answers.map((el,index)=>{
            return <button style={{ color: question.correctAnswer === index ? 'green' : 'red' }} key={index} value={el}>{el}</button> 
          })}
        </div>
        {host &&
          <button onClick={()=>{nextQuestion()}}>Next Question</button>
        }
      </div>
    )

  }else{
    return(
      <Redirect to='/triviamain'></Redirect>
    )
  }

  
}