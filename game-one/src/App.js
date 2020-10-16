import React from 'react';
import Maze from './Maze/Maze.js'
import './App.css'
import {startAIGame, storedInitialData} from './api'



function App() {

  startAIGame()  
  
  return (
    <div>
      <Maze data={storedInitialData}/>
    </div>
  )
}

export default App