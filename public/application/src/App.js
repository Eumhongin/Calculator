import React from 'react';
import Total from './components/Total'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="/helloworld"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Total></Total>
    </div>
  );
}

export default App;
