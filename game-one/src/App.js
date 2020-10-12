import React from 'react';
import Maze from './Maze/Maze.js'

// from api ===============================================================================================
const data = [
  // 0: position of p1 - player
  {x: 0, y: 0},
  // 1: posistion of p2 - bot
  {x: 4, y: 4},
  // 2: similarly add moving / static blocks.
  // for eg, static block: (useState for dynamic)
  {x: 1, y: 1},
  // 3: cur status
  {status: 'Move to Start Game'},
  // 4: extra information
  {
    numRows: 5,
    numCols: 5,
    intervalAfterPlayerClick: 100, // ? todo: make it 'before'
    intervalBeforeBotMove: 200,
    // toggle to stop random mover and use w-a-s-d keys only.
    makeRandomMovesOrWASDOnly: 'random' // 'random' (or) 'WASD' 
  }
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

      // !todo: STRICLY mention w-a-s-d for both 'random' and 'WASD'
      if (data[4].makeRandomMovesOrWASDOnly === 'random'){
        document.dispatchEvent(e)
      } else if (data[4].makeRandomMovesOrWASDOnly === 'WASD') { 
        // pass
      }
    }
  }
  , data[4].intervalBeforeBotMove
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
