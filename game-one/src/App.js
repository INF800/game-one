import React from 'react';
import Maze from './Maze/Maze.js'

// from api
const data = [
  // position of p1 - player
  {x: 0, y: 0},
  // posistion of p2 - bot
  {x: 4, y: 4},
  // similarly add moving / static blocks.
  // for eg, static block: (useState for dynamic)
  {x: 1, y: 1} 
]

function App() {

  return (
    <div>
      <Maze data={data}/>
    </div>
  )
}

export default App
