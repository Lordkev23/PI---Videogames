import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import styled from 'styled-components';
import React from 'react';

const H1Card = styled.h1`
margin-top: 3%;
background-color: white;
border-radius: 10px;
border: solid 0px;
display: inline-block;
`


function App() {
  return ( 

  <BrowserRouter>
    <div className="App" style={{ padding: '25px' }}>
      <H1Card>Hello, you are in App.js</H1Card>
      <Switch>
        <Route exact path='/' component = {LandingPage}/>
        <Route path='/home' component={Home}/>
      </Switch>
  
    </div>
  </BrowserRouter>
  );
}

export default App;
