import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function create(){
  const [categories, setCategories] = useState(undefined)
  const [options, setOptions] = useState(undefined)
  useEffect(()=>{
    let categories = undefined
    fetch('https://opentdb.com/api_category.php')
    .then(res => res.json())
    .then(data=>{
      categories = data.trivia_categories.map(category => category)
      console.log(categories);
      setCategories(categories);
      let optionItems = categories.map((el)=>{
        return <option key={el.id} value={el.name}>{el.name}</option> 
      })
      setOptions(optionItems);
      console.log(optionItems)
    })
  },[])
 
  return(
    
    <div>
      <Link to="/create">
          <button>Back to Lobby</button>
      </Link>
      <div>
        <h3>Number of Questions</h3>
      <select name="Number of Questions">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      </div>
      <div>
      <h3>Difficulty of Questions</h3>
      <select name="Difficulty">
        <option value="Any Difficulty">Any Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      </div>
      <div>
      <h3>Select Category</h3>
      <select name="Categories">
        <option value="Any Category">Any Category</option>
        {options}
      </select>
      </div>
    </div>
  )
}