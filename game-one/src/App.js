import React from 'react';
import Maze from './Maze/Maze.js'

// from api
const data = [
  // position of p
  {x: 0, y: 0},
  // posistion of p2
  {x: 4, y: 4}
]

function App() {

  return (
    <div>
      <Maze data={data}/>
    </div>
  )
}

export default App
