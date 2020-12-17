import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../styles/Home1.scss';

export default function Home(){
    return(
      <div className="page">
        <Link to="/join">
          <button>Join Game</button>
        </Link>
        <Link to="/settings">
          <button>Create Game</button>
        </Link>
      </div> 
    )
}

