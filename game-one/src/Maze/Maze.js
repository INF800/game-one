import React, {useState} from 'react';
import FiveBoxRow from './FiveBoxRow.js'
import './Maze.css'


function Maze({data}) {
  
  var [curPlayerPos, updatePlayerPosFunc] = useState(data[0])
  var [curBotPos, updateBotPosFunc] = useState(data[1])

  function rederGrid(){
    function renderRows(numRows) {
      var accumulator = []
      for (let row=0; row<numRows; row++) {
        accumulator.push(
          <FiveBoxRow 
            key={row} 
            rowid={row} 
            curPlayerPos={curPlayerPos}
            updatePlayerPosFunc={updatePlayerPosFunc} 
            curBotPos={curBotPos}
            updateBotPosFunc={updateBotPosFunc} 
          />
        )
      }
      return accumulator
    }

    return (
      <div>
        {renderRows(5)}
      </div>
    )    
  }

  // return Maze
  return (
    <div className='mazeContainer'>
      {rederGrid()}
    </div>
  )
}

export default Maze