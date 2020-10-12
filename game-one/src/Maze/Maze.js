import React, {useState} from 'react';
import FiveBoxRow from './FiveBoxRow.js'
import './Maze.css'

function Maze({data}) {
  var [curPlayerPos, updatePlayerPosFunc] = useState(data[0])
  var [curBotPos, updateBotPosFunc] = useState(data[1])
  var [curStatus, upDateCurStatus] = useState(data[3].status)

  function rederGrid(){
    
    function renderRows(numRows) {
      var accumulator = []
      for (let row=0; row<numRows; row++) {
        accumulator.push(
          <FiveBoxRow 
            key={row} 
            rowid={row} 
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
        {renderRows(5)}
      </div>
    )    
  }

  // post back to api (executed for any updateState (change is state))
  // Because of 2 if - if - conditions on keydown event, 2 updates:
  // chanage in state happens 2 times so, executed 2 times.
  console.log(`${curPlayerPos.x},${curPlayerPos.y} ${curBotPos.x},${curBotPos.y} block: ${data[2].x},${data[2].y}`)
  if ((curPlayerPos.x === curBotPos.x)&&(curPlayerPos.y === curBotPos.y)) {
    updateBotPosFunc({x: 4, y: 4})
    updatePlayerPosFunc({x: 0, y: 0})
    upDateCurStatus('Game Over! Move to Start Game')
  }


  console.log(curStatus)
  // return Maze
  return (
    <div>
      <div className="mazeHead">
        Catch The Opponent
      </div>
      <div className='Extra'>
        How to move opponent?
        <span><input disabled={true} type="checkbox" defaultChecked={true} /> Random </span>
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
    </div>
  )
}

export default Maze