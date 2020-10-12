import React from 'react';
import './FiveBoxRow.css'


// beg: helpers -----------------------------------------------
function makePayerMove (e, curPlayerPos, updatePlayerPosFunc) {
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
}

function makeBotMove (e, curBotPos, updateBotPosFunc) {
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
}

function makeRandomBotMove(curBotPos, updateBotPosFunc){
  const mapRandIdx = {
    "0": {key: 'w'},
    "1": {key: 'a'},
    "2": {key: 's'},
    "3": {key: 'd'},
    "4": {key: '<donothing>'}, // wait - new state in MDP
  } 

  var random_idx = (Math.random() * 4).toFixed(0) // [0, 4]
  console.log(random_idx, mapRandIdx[random_idx])
  makeBotMove(mapRandIdx[random_idx], curBotPos, updateBotPosFunc)
}
// end: helpers -----------------------------------------------

//  React component Component
function FiveBoxRow({
  rowid, 
  curPlayerPos, updatePlayerPosFunc, 
  curBotPos, updateBotPosFunc,
  block0Pos
}) {

  document.onkeydown = function(e) {  
    // TODO: Collision effect w/ block
    // TODO: Speed control
    console.log(e.key)
    makePayerMove(e, curPlayerPos, updatePlayerPosFunc)
    //makeBotMove(e, curBotPos, updateBotPosFunc) // using keyboard
    makeRandomBotMove(curBotPos, updateBotPosFunc) // automate random moves
  };
  
  function getBoxValue(curPlayerPos, curBoxPos){
    if ((curPlayerPos.x === curBotPos.x)&&(curPlayerPos.y === curBotPos.y)) {
      return 'over'
    }
    // put blocks if any
    if ((block0Pos.x === curBoxPos.x) && (block0Pos.y === curBoxPos.y)) {
      return 'hide'
    }       
    // update bot pos
    if ((curBotPos.x === curBoxPos.x) && (curBotPos.y === curBoxPos.y)) {
      return 'o'
    }
    // update player pos
    if ((curPlayerPos.x === curBoxPos.x) && (curPlayerPos.y === curBoxPos.y)) {
      return 'x'
    } 
    else { 
      return '' //`${curBoxPos.x}, ${curBoxPos.y}` // return empty instead
    }
  }

  function getBoxValueAndResetIsGameOver(box) {
    var val = getBoxValue(curPlayerPos, {x: box, y: rowid})
    // reset if game over
    if (val === 'over') {
      // ! Note:
      // these state funcs will re-render the whole component
      // 'over' is never returned.
      // updateBotPosFunc({x: 4, y: 4})
      // updatePlayerPosFunc({x: 0, y: 0})
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