import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <Board width="10" height="10" mines="8" />
    </div>
  );
}

export default App;
