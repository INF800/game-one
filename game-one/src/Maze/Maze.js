import React, {useState} from 'react';
import FiveBoxRow from './FiveBoxRow.js'
import './Maze.css'

function Maze({data}) {

  var [curPlayerPos, updatePlayerPosFunc] = useState(data[0])

  function rederGrid(data){
    
    function renderRows(numRows) {
      var accumulator = []
      for (let row=0; row<numRows; row++) {
        accumulator.push(
          <FiveBoxRow 
            key={row} 
            rowid={row} 
            curPlayerPos={curPlayerPos}
            updatePlayerPosFunc={updatePlayerPosFunc} 
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