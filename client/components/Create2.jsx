import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function create(){
  return(
    <div>
        <Link to="/settings">
          <button>*</button>
        </Link>
        <Link to="/triviamain">
          <button>Start Game</button>
        </Link>
      </div> 
  )
}