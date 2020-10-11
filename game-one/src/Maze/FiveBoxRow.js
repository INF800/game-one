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

    // must be @end. not begining of
    // key press 
    // But `await sleep(1500)` will not work!
    // becasue the useState functions will rerender
    // so, use before, `useStae` function @top level

  };
  
  function getBoxValue(curPlayerPos, curBoxPos){
    if ((curPlayerPos.x === curBotPos.x)&&(curPlayerPos.y === curBotPos.y)) {
      return 'over'
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

  function getBoxValueAndResetIsGameOver(box) {
    var val = getBoxValue(curPlayerPos, {x: box, y: rowid})
    // reset if game over
    if (val === 'over') {
      // these state funcs will re-render the whole component
      // 'over' is never returned.
      updateBotPosFunc({x: 4, y: 4})
      updatePlayerPosFunc({x: 0, y: 0})
    }
    return val
  }

  function renderBoxesInRow(numBoxes){
    var accumulator = []
    for(let box=0; box<numBoxes; box++){
      accumulator.push(
        <div className='box' key={box} >
          {getBoxValueAndResetIsGameOver(box)}
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