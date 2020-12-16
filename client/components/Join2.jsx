import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function create(){
    return(
      <div>
        <p>Name:</p>
        <input type="text" required="required" placeholder="Your Name"></input>
        <p>Lobby ID:</p>
        <input type="text" required="required" placeholder="Input Lobby ID"></input>
        <div><button>Join Game</button></div>
      </div>
    )
  }