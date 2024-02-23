// src/App.js
import React from 'react';
import './App.css';
import PlanetsList from './Components/Planetlist';

function App() {
  return (
    <div className="App">
      <h1>Star Wars Planets Directory</h1>
      <PlanetsList />
    </div>
  );
}

export default App;
