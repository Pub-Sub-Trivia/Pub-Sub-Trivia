import React, {Component, useState, useEffect, useContext} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {NameContext} from '../context/NameContext.jsx'

export default function create(){
  const [name, setName] =  useContext(NameContext);

  return(
    <div>
      <p>Name:</p>
      <p>{name}</p>
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