import React, {useState} from 'react';
import FiveBoxRow from './FiveBoxRow.js'
import './Maze.css'

function Maze({data}) {
  // generate use states here...
  var [curPlayerPos, updatePlayerPosFunc] = useState(data[0])
  var [curBotPos, updateBotPosFunc] = useState(data[1])
  var [curStatus, upDateCurStatus] = useState(data[3].status)
  var numRows = data[4].numRows
  var numCols = data[4].numCols
  var randomOrWASD = data[4].makeRandomMovesOrWASDOnly


  React.useEffect(() => {
      console.log('From uesef:', curPlayerPos, curBotPos) // send it to api
      if ((curPlayerPos.x === curBotPos.x)&&(curPlayerPos.y === curBotPos.y)) {
        // reset: will update use effect too
        updateBotPosFunc({x: 4, y: 4})
        updatePlayerPosFunc({x: 0, y: 0})
        upDateCurStatus('Game Over! Move to Start Game')
        console.log('Game over')
      }

    }, 
    [curPlayerPos, curBotPos]
  );
  

  function rederGrid(){
    
    function renderRows(numRows) {
      var accumulator = []
      for (let row=0; row<numRows; row++) {
        accumulator.push(
          <FiveBoxRow 
            key={row} 
            rowid={row} 
            numCols={numCols}
            block0Pos={data[2]} // add more blocks 
            // ---
            curPlayerPos={curPlayerPos}
            updatePlayerPosFunc={updatePlayerPosFunc} 
            // ---
            curBotPos={curBotPos}
            updateBotPosFunc={updateBotPosFunc} 
            // ----
            curStatus={curStatus}
            upDateCurStatus={upDateCurStatus}
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
        Catch The Opponent
      </div>
      <div className='Extra'>
        How to move opponent?
        <span><input disabled={true} type="checkbox" defaultChecked={randomOrWASD === 'random'} /> Random </span>
        <span><input disabled={true} type="checkbox" defaultChecked={false} /> Bot </span>
        <br/>Play as 
        <span><input disabled={true} type="checkbox" defaultChecked={false} /> Opponent </span>
        <span><input disabled={true} type="checkbox" defaultChecked={true} /> Catcher </span>
      </div>
      <div className='mazeContainer'>
        {rederGrid()}
      </div>
      <div className='curStatus'>
        {curStatus}
      </div>
      <div style={{textAlign:"center", fontSize: 'x-small'}}>
        <br/>
        (Swipes for touchscreen not yet added)<br/>
        Use arrow keys to move player.
      </div>
    </div>
  )
}

export default Maze