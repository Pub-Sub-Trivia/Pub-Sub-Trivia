import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function create(){
  return(
    <div>
    <div>
      <h3>Question #: </h3>
      <h3>Your Score: </h3>
      <Link to="/lobbyscore">
        <button>Overall Score</button>
      </Link>
    </div>
    <div>
      <div> A. %</div>
      <div> B. %</div>
      <div> C. %</div>
      <div> D. %</div>
    </div>
  </div>
  )
}