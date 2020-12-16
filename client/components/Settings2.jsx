import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {NameContext} from '../context/NameContext.jsx'
import {GlobalContext} from '../context/GlobalContext.jsx'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";


export default function create(){
  const [subcategories, setSubcategories] = useState(undefined);
  const [numQuestions, setNumQuestions] = useState(5);
  const [diffQuestions, setDiffQuestions] = useState('Any Difficulty');
  const [categoryQuestions, setCategoryQuestions] = useState('Any Category');
  const [categoryID, setCategoryID] = useState(null);
  // const [name, setName] = useState('');
  const [name, setName] =  useContext(NameContext);
  const {socketNum, setSocketNum} = useContext(GlobalContext)

  useEffect(()=>{
    let categories = undefined
    fetch('https://opentdb.com/api_category.php')
    .then(res => res.json())
    .then(data=>{
      categories = data.trivia_categories.map(category => category)
      let subcategoryItems = categories.map((el)=>{
        return <option key={el.id} value={el.name}>{el.name}</option> 
      })
      setSubcategories(subcategoryItems);
    })
    const socket = socketIOClient(ENDPOINT);
    socket.on("connected", data => {
      console.log("Connected");
    });  
  },[])

  function grabIDCatergory(category){
    let id = subcategories.filter(item=>{
      return item.props.value === category;
    })
    setCategoryID(id[0].key)
  }

  function fetchSocketNum(){
    let sendData = {
      amount: numQuestions,
      category: categoryID,
      difficulty: diffQuestions,
      type: "multiple",
      timeLimit:"n/a" 
    }
    fetch('/api/newGame',{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data.gameID);
      setSocketNum(data.gameID);
    }) 
  }

  return(
    <div>
        <h3>Name:</h3>
        <input type="text" required="required" placeholder="Your Name" onChange={(event)=>{setName(event.target.value)}} value={name}></input>
      <div>
        <h3>Number of Questions</h3>
      <select name="Number of Questions" onChange={(event)=>{setNumQuestions(event.target.value);}} value={numQuestions }>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      </div>
      <div>
      <h3>Difficulty of Questions</h3>
      <select name="Difficulty" onChange={(event)=>{setDiffQuestions(event.target.value);}} value={diffQuestions }>
        <option value="Any Difficulty">Any Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      </div>
      <div>
      <h3>Select Category</h3>
      <select name="Categories" value="Any Category" onChange={(event)=>{setCategoryQuestions(event.target.value);grabIDCatergory(event.target.value)}} value={categoryQuestions}>
        <option>
          Any Category
        </option>
        {subcategories}
      </select>
      </div>
      <Link to="/create">
        <button onClick={()=>{fetchSocketNum()}}>Game Lobby</button>
      </Link>
    </div>
  )
}