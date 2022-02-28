import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LmyWallet from "../src/Components/LMY_Wallet/Lmywallet";
import Register from './Components/Register/Register';
import Header from './Components/Header/Header';
import Leaderboard from './Components/Leaderboard/Leaderboard';

import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {


  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Header></Header>

        <Route exact path="/" component={LmyWallet}></Route>
        <Route exact path="/Leader" component={Leaderboard}></Route>


    

    
      </Router>
    </div>
  );
}

export default App;
