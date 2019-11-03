import React from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
            <div className="topnav">
                <a className="navlink" href="/home">Home</a>
                <a className="navlink" href="/home_mentor">My Mentors</a>
                <a className="navlink" href="/home_mentee">My Mentees</a>
                <a className="navlink" href="/login">Login</a>
            </div>
          <Main/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
