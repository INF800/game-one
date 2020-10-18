import React, {useState} from 'react';
import FiveBoxRow from './FiveBoxRow.js'
import './Maze.css'


function Maze({data}) {
  // generate use states here...
  var [curPlayerPos, updatePlayerPosFunc] = useState(data[0])
  var [curBotPos, updateBotPosFunc] = useState(data[1])
  var block0Pos = data[2][0]
  var block1Pos = data[2][1]
  var pit0Pos = data[3][0]
  var numRows = data[4].numRows
  var numCols = data[4].numCols
  var isRandomMoves = data[4].isRandomMoves

// ! useEffect is good but not suitable for real-time animation
// ! (Not using useEffect.. disadvantage is, changes wont be displayed 
// ! until some related/unrelated component is updated)
//   React.useEffect(() => {
//       //console.log('From uesef:', curPlayerPos, curBotPos) // send it to api (doesn't update for blocks and boundaries)
//       window.mostRecentState = {
//         block0Pos: block0Pos,
//         curPlayerPos: curPlayerPos, 
//         curBotPos: curBotPos
//       }
//       
//       // reset display status (@bottom of maze if game is over)
//       if ((curPlayerPos.x === curBotPos.x)&&(curPlayerPos.y === curBotPos.y)) {
//         updateBotPosFunc({x: 4, y: 4})
//         updatePlayerPosFunc({x: 0, y: 0})
//         upDateCurStatus('Game Over! Move to Start Game')
//         console.log('Game over')
//       }
// 
// 
//     }, 
//     [curPlayerPos, curBotPos, block0Pos]
//   );
  

  function rederGrid(){
    
    function renderRows(numRows) {
      var accumulator = []
      for (let row=0; row<numRows; row++) {
        accumulator.push(
          <FiveBoxRow 
            key={row} 
            rowid={row} 
            numCols={numCols}
            block0Pos={block0Pos} // add more blocks 
            block1Pos={block1Pos} // add more blocks 
            pit0Pos={pit0Pos}
            // ---
            curPlayerPos={curPlayerPos}
            updatePlayerPosFunc={updatePlayerPosFunc} 
            // ---
            curBotPos={curBotPos}
            updateBotPosFunc={updateBotPosFunc} 
          />
        )
      }
      return accumulator
    }
    // Note: This executes for every box 
    // when the component us updated by `useState`
    // Any code inside it (for r..., for c... loop)
    // will be exectuted (r*c) times
    return (
      <div>
        {renderRows(numRows)}
      </div>
    )    
  }


  // return Maze
  return (
    <div>
      <div className="mazeHead">
        Reach the destination
      </div>
      <div className='Extra'>
        Reinforcement Learning with Q-Table
      </div>
      <div className='mazeContainer'>
        {rederGrid()}
      </div>
      <div className='curStatus'>
        Best moves will be made after<br/> the end of training
      </div>
    </div>
  )
}

export default Maze