import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {GlobalContext} from '../context/GlobalContext.jsx'

export default function create(){
  const {gameID, setGameID, socket, setSocket, name, setName, question, setQuestion, players, setPlayers, answers, setAnswers, score, setScore, globalRedirect, setGlobalRedirect,  host, setHost, endGame, setEndGame} = useContext(GlobalContext)
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
  console.log(endGame)
  // if(endGame === 0){
  //   return <Redirect to='/endgame'></Redirect>
  // }
  if(globalRedirect===false){
    return(
      <div className="page">
        <Link to="/lobbyscore">
          <button>Overall Score</button>
        </Link>
        <div>
          <h3>Question: {question.question} </h3>
          {question.answers.map((el,index)=>{
            return <button style={
              { 
              backgroundColor: question.correctAnswer === index ? '#006400' : '#c20c06', 
              borderColor: question.correctAnswer === index ? '#0c2d1c' : '#600000',
              }
            } 
            key={index} value={el}>{el}</button> 
          })}
        </div>
        {host && endGame !==0 &&
          <button onClick={()=>{nextQuestion()}}>Next Question</button>
        }
        {
          endGame === 0 && <Link to="/endgame"><button>End Game</button></Link>
        }
        {
          endGame === -5 && <Link to="/endgame"><button>End Game</button></Link>
        }
        {
          endGame === -10 && <Link to="/endgame"><button>End Game</button></Link>
        }
        {
          endGame === -15 && <Link to="/endgame"><button>End Game</button></Link>
        }
        {
          endGame === -20 && <Link to="/endgame"><button>End Game</button></Link>
        }
      </div>
    )

  }else{
    return(
      <Redirect to='/triviamain'></Redirect>
    )
  }

  
}