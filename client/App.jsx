import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import styles
import './styles/styling.scss'
import Home from './components/Home1.jsx'
import Create from './components/Create2a.jsx'
import Join from './components/Join2.jsx'
import Settings from './components/Settings2'
import TriviaMain from './components/TriviaMain3'
import LobbyAnswers from './components/LobbyAnswers4.jsx'
import LobbyScore from './components/LobbyScore5.jsx'
import EndGame from './components/EndGame6.jsx'
import {NameProvider} from './context/NameContext.jsx'

//render home

export default function App(){
    return(
        
        <div>
        <h1>Pub Sub Trivia</h1>
        <Router>
            <Switch>

                <Route path="/join">
                    <Join/>
                </Route>
                
                <Route path="/create">
                    <NameProvider>
                        <Create/>
                    </NameProvider>
                </Route>

                <Route path="/settings">
                    <NameProvider>
                        <Settings />
                    </NameProvider>
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


