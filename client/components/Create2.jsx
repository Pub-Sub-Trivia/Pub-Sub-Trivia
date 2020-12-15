import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function create(){
  return(
    <div>
      <Link to="/settings">
        <button>*</button>
      </Link>
      <p>Name:</p>
        <input type="text" required="required" placeholder="Your Name"></input>
      <p>Lobby ID:</p>
        <input type="text" required="required" placeholder="Lobby ID: X76Y"></input>
      <div>
        <Link to="/triviamain">
          <button>Start Game</button>
        </Link>
      </div>
    </div> 
  )
}