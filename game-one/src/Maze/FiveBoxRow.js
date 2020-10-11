import React from 'react';
import './FiveBoxRow.css'

function FiveBoxRow({rowid, curPlayerPos, updatePlayerPosFunc, curBotPos, updateBotPosFunc}) {

  document.onkeydown = function(e) {    
    console.log(e.key)
    if ((e.key === 'ArrowLeft')&&(curPlayerPos.x !== 0)){
      updatePlayerPosFunc({x: curPlayerPos.x-1, y: curPlayerPos.y})
    }
    if ((e.key === 'ArrowRight')&&(curPlayerPos.x !== 4)){
      updatePlayerPosFunc({x: curPlayerPos.x+1, y: curPlayerPos.y})
    }
    if ((e.key === 'ArrowUp')&&(curPlayerPos.y !== 0)){
      updatePlayerPosFunc({x: curPlayerPos.x, y: curPlayerPos.y-1})
    }
    if ((e.key === 'ArrowDown')&&(curPlayerPos.y !== 4)){
      updatePlayerPosFunc({x: curPlayerPos.x, y: curPlayerPos.y+1})
    }  

    if ((e.key === 'a')&&(curBotPos.x !== 0)){
      updateBotPosFunc({x: curBotPos.x-1, y: curBotPos.y})
    }
    if ((e.key === 'd')&&(curBotPos.x !== 4)){
      updateBotPosFunc({x: curBotPos.x+1, y: curBotPos.y})
    }
    if ((e.key === 'w')&&(curBotPos.y !== 0)){
      updateBotPosFunc({x: curBotPos.x, y: curBotPos.y-1})
    }
    if ((e.key === 's')&&(curBotPos.y !== 4)){
      updateBotPosFunc({x: curBotPos.x, y: curBotPos.y+1})
    }  
  };
  
  function getBoxValue(curPlayerPos, curBoxPos){
    if ((curPlayerPos.x === curBotPos.x)&&(curPlayerPos.y === curBotPos.y)) {
      //console.log(curPlayerPos.x, curBotPos.x, curPlayerPos.y, curBotPos.y)
      alert('Player captured!')
      curPlayerPos.x = 0
      curPlayerPos.y = 0
      curBotPos.x = 4
      curBotPos.y = 4
    }
    // update player pos
    if ((curPlayerPos.x === curBoxPos.x) && (curPlayerPos.y === curBoxPos.y)) {
      return 'x'
    } 
    if ((curBotPos.x === curBoxPos.x) && (curBotPos.y === curBoxPos.y)) {
      return 'o'
    }
    // update bot pos
    else { 
      return '' //`${curBoxPos.x}, ${curBoxPos.y}` // return empty instead
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