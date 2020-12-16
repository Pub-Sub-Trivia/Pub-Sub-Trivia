import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {NameContext} from '../context/NameContext.jsx'

export default function create(){
  const [subcategories, setSubcategories] = useState(undefined);
  const [numQuestions, setNumQuestions] = useState(5);
  const [diffQuestions, setDiffQuestions] = useState('Any Difficulty');
  const [categoryQuestions, setCategoryQuestions] = useState('Any Category');
  // const [name, setName] = useState('');
  const [name, setName] =  useContext(NameContext);

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
  },[])

  console.log(name)
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
      <select name="Categories" value="Any Category" onChange={(event)=>{setCategoryQuestions(event.target.value);}} value={categoryQuestions}>
        <option>
          Any Category
        </option>
        {subcategories}
      </select>
      </div>
      <Link to="/create">
        <button onClick={()=>{}}>Game Lobby</button>
      </Link>
    </div>
  )
}