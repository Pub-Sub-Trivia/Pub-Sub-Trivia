import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
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
  if(globalRedirect===false){
    return(
      <div className="page">
      <div>
        {/* <h3>Questions Remaining: </h3> */}
        {/* <h3>Your Score: </h3> */}
        <Link to="/lobbyanswers">
          <button>Round Results</button>
        </Link>
      </div>
      <div>
      {score.map((el,index)=>{
            return <p key={index} value={el}>{Object.keys(el)} {el[Object.keys(el)]}</p>
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