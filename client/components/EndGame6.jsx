import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function create(){
    return(
      <div className="page">
        <div>Thanks for Playing</div>
        <div>
          
        </div>
        <Link to="/home">
          <button className="main-menu">Play Again?</button>
        </Link>
      </div>
    )
  }