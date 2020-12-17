import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Home(){
    return(
      <div className="page">
        <Link to="/join">
          <button className="main-menu">Join Game</button>
        </Link>
        <Link to="/settings">
          <button className="main-menu">Create Game</button>
        </Link>
      </div> 
    )
}

