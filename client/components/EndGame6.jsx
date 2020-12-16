import React, {Component, useState, useEffect} from 'react';
//react-router-dom
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function create(){
    return(
      <div>
        <div>Thanks for Playing</div>
        <div>
          
        </div>
        <Link to="/home">
          <button>Play Again?</button>
        </Link>
      </div>
    )
  }