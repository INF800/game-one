import React from 'react';
import './FiveBoxRow.css'

function FiveBoxRow({curPlayerPos, rowid, updatePlayerPosFunc}) {


  document.onkeydown = function(e) {
    console.log(e.key)
    if (e.key === 'ArrowLeft'){
      updatePlayerPosFunc({x: curPlayerPos.x-1, y: curPlayerPos.y})
    }
    if (e.key === 'ArrowRight'){
      updatePlayerPosFunc({x: curPlayerPos.x+1, y: curPlayerPos.y})
    }
    if (e.key === 'ArrowUp'){
      updatePlayerPosFunc({x: curPlayerPos.x, y: curPlayerPos.y-1})
    }
    if (e.key === 'ArrowDown'){
      updatePlayerPosFunc({x: curPlayerPos.x, y: curPlayerPos.y+1})
    }
  };
  
  function getBoxValue(curPlayerPos, curBoxPos){
    if ((curPlayerPos.x === curBoxPos.x) && (curPlayerPos.y === curBoxPos.y)) {
      return 'x'
    }
    else { 
      return '' 
    }
  }

  function renderBoxesInRow(numBoxes){
    var accumulator = []
    for(let box=0; box<numBoxes; box++){
      accumulator.push(
        <div className='box' key={box} >
          {getBoxValue(curPlayerPos, {x: box, y: rowid})}
        </div>
      )
    }
    return accumulator
  }

  return (
    <div className='FiveBoxRowContainer'>
      {renderBoxesInRow(5)}
    </div>
  )
}

export default FiveBoxRow