import React from 'react';
import Maze from './Maze/Maze.js'

// from api ===============================================================================================
const data = [
  // position of p1 - player
  {x: 0, y: 0},
  // posistion of p2 - bot
  {x: 4, y: 4},
  // similarly add moving / static blocks.
  // for eg, static block: (useState for dynamic)
  {x: 1, y: 1} 
]
// end: from api ==========================================================================================

// automate bot key event =================================================================================
const mapRandIdx = {
  "0": 'w',
  "1": 'a',
  "2": 's',
  "3": 'd',
  "4": '<donothing>', // wait - new state in MDP
}
let timerId = setInterval( // use timerId in future to teminate
  () => {
    var random_idx = (Math.random() * 3).toFixed(0) // [0, 4]
    // if not `<donothing>`, press the key randomly
    if (mapRandIdx[random_idx] !== '<do-nothing>'){
      var e = new KeyboardEvent("keydown", {
        key  : mapRandIdx[random_idx], 
        char : mapRandIdx[random_idx]
      })
      //document.dispatchEvent(e)
    }
    
  }
  , 200
);
// end: automate bot key event =============================================================================



function App() {

  return (
    <div>
      <Maze data={data}/>
    </div>
  )
}

export default App
