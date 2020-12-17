import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



export default function create(){
  const[timer, setTimer] = useState(45);
  setTimeout(() => setTimer(timer-1), 1000);
  if(timer<=0){
    
  }
  
  return(
    <div>
      <div>
        <h3>Question #: </h3>
        <h3>Time Remaining: </h3>
        <p>timer:{timer}</p>
      </div>
      <div>
        <button> A. placeholder</button>
        <button> B. placeholder</button>
        <button> C. placeholder</button>
        <button> D. placeholder</button>
      </div>
    </div>
  )
}