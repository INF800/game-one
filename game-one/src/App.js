import React from 'react';
import Maze from './Maze/Maze.js'

// from api
const data = [
  // position of p
  {x: 2, y: 3}
]

function App() {

  return (
    <div>
      <Maze data={data}/>
    </div>
  )
}

export default App
