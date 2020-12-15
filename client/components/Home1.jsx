import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Create from './Create2.jsx'
import Join from './Join2.jsx'

export default function Home(){
    return(
      <div>
        <Link to="/join">
          <button>Join Game</button>
        </Link>
        <Link to="/create">
          <button>Create Game</button>
        </Link>
      </div> 
    )
}

