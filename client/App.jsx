import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import styles
import Home from './components/Home1.jsx'
import Create from './components/Create2a.jsx'
import Join from './components/Join2.jsx'
import Settings from './components/Settings2'
import TriviaMain from './components/TriviaMain3'
import LobbyAnswers from './components/LobbyAnswers4.jsx'
import LobbyScore from './components/LobbyScore5.jsx'
import EndGame from './components/EndGame6.jsx'
import './styles/App.scss'
import icon from './media/IconThreeQuarters.png';


//render home

export default function App(){
    return(
        
        <div id="app">
        <h1 id="title">Pub Sub Trivia</h1>
        <img id='icon' src={icon}></img>
        <Router>
            <Switch>

                <Route path="/join">
                    
                        <Join/>
                   
                </Route>
                
                <Route path="/create">
                            <Create/>
                </Route>

                <Route path="/settings">

                        <Settings />
      
                </Route>

                <Route path="/triviamain">
                    <TriviaMain/>
                </Route>

                <Route path="/lobbyanswers">
                    <LobbyAnswers/>
                </Route>

                <Route path="/lobbyscore">
                    <LobbyScore/>
                </Route>
                
                <Route path="/endgame">
                    <EndGame/>
                </Route>
                

                <Route path="/">
                    <Home></Home>
                </Route>
            </Switch>
        </Router>
        </div>
        
    )
}


