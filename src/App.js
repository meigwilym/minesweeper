import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <Game width="9" height="9" mines="10" />
    </div>
  );
}

export default App;
