import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function create(){
  return(
    <div>
    <div>
      <h3>Questions Remaining: </h3>
      <h3>Your Score: </h3>
      <Link to="/lobbyanswers">
        <button>Round Results</button>
      </Link>
    </div>
    <div>
      <div> Team 1: Score</div>
      <div> Team 2: Score</div>
      <div> Team 3: Score</div>
      <div> Team 4: Score</div>
    </div>
  </div>
  )
}