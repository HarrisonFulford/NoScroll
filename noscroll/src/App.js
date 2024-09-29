// import logo from './logo.svg';
import './App.css';


/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to cum everywhere.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

import React from 'react';
import ScreenTimeGraph from './ScreenTimeGraph';

function App() {
  const screenTimeData = [
    { nonToxic: 2, toxic: 1 }, // Monday
    { nonToxic: 3, toxic: 2 }, // Tuesday
    { nonToxic: 4, toxic: 1 }, // Wednesday
    { nonToxic: 2, toxic: 3 }, // Thursday
    { nonToxic: 5, toxic: 1 }, // Friday
    { nonToxic: 2, toxic: 2 }, // Saturday
    { nonToxic: 3, toxic: 1 }, // Sunday
  ];

  return (
    <div className="App">
      <h1>Screen Time Dashboard</h1>
      <ScreenTimeGraph screenTimeData={screenTimeData} />
    </div>
  );
}

export default App;

