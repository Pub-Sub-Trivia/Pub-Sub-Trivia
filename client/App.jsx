import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import styles
import './styles/styling.scss'
import Home from './components/Home1.jsx'
import Create from './components/Create2.jsx'
import Join from './components/Join2.jsx'
import Settings from './components/Settings2a'
import TriviaMain from './components/TriviaMain3'
import LobbyAnswers from './components/LobbyAnswers4.jsx'
import LobbyScore from './components/LobbyScore5.jsx'
import EndGame from './components/EndGame6.jsx'

//render home

export default function App(){
    return(
        <div>
        <h1>Pub Sub</h1>
        <Router>
            <Switch>
                <Route path="/create">
                    <Create/>
                </Route>

                <Route path="/join">
                    <Join/>
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


