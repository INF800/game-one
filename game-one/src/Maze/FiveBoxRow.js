import React from 'react';
import './FiveBoxRow.css'


// beg: helpers -----------------------------------------------
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makePayerMove (e, curPlayerPos, updatePlayerPosFunc, block0Pos) {
    await sleep(100)
    console.log(block0Pos, curPlayerPos)
    if (
      (e.key === 'ArrowLeft')&&
      (curPlayerPos.x !== 0)&&
      !((curPlayerPos.x-1 === block0Pos.x) && (curPlayerPos.y === block0Pos.y))
      ){
        updatePlayerPosFunc({x: curPlayerPos.x-1, y: curPlayerPos.y})
    }
    if ((
      e.key === 'ArrowRight')&&
      (curPlayerPos.x !== 4)&&
      !((curPlayerPos.x+1 === block0Pos.x) && ((curPlayerPos.y === block0Pos.y)))
      ){
        updatePlayerPosFunc({x: curPlayerPos.x+1, y: curPlayerPos.y})
    }
    if (
      (e.key === 'ArrowUp')&&
      (curPlayerPos.y !== 0)&&
      !((curPlayerPos.y-1 === block0Pos.y) && (curPlayerPos.x === block0Pos.x))
      ){
        updatePlayerPosFunc({x: curPlayerPos.x, y: curPlayerPos.y-1})
    }
    if (
      (e.key === 'ArrowDown')&&
      (curPlayerPos.y !== 4)&&
      !((curPlayerPos.y+1 === block0Pos.y) && (curPlayerPos.x === block0Pos.x))
      ){
        updatePlayerPosFunc({x: curPlayerPos.x, y: curPlayerPos.y+1})
  }
}

function makeBotMove (e, curBotPos, updateBotPosFunc, block0Pos) {
  if (
    (e.key === 'a')&&
    (curBotPos.x !== 0)&&
    !((curBotPos.x-1 === block0Pos.x) && (curBotPos.y === block0Pos.y))
    ){
    updateBotPosFunc({x: curBotPos.x-1, y: curBotPos.y})
  }
  if (
    (e.key === 'd')&&
    (curBotPos.x !== 4)&&
    !((curBotPos.x+1 === block0Pos.x) && ((curBotPos.y === block0Pos.y)))
    ){
    updateBotPosFunc({x: curBotPos.x+1, y: curBotPos.y})
  }
  if ((
    e.key === 'w')&&
    (curBotPos.y !== 0)&&
    !((curBotPos.y-1 === block0Pos.y) && (curBotPos.x === block0Pos.x))
    ){
    updateBotPosFunc({x: curBotPos.x, y: curBotPos.y-1})
  }
  if (
    (e.key === 's')&&
    (curBotPos.y !== 4)&&
    !((curBotPos.y+1 === block0Pos.y) && (curBotPos.x === block0Pos.x))
    ){
    updateBotPosFunc({x: curBotPos.x, y: curBotPos.y+1})
  }  
}
// end: helpers -----------------------------------------------


//  React component Component =====================================================================
function FiveBoxRow({
  rowid, 
  curPlayerPos, updatePlayerPosFunc, 
  curBotPos, updateBotPosFunc,
  block0Pos, // add more blocks
  upDateCurStatus,
  curStatus
}) {

  document.onkeydown = function(e) {  
    console.log(e.key)
    // update status and make moves

    if (
      ((curStatus === 'Game Over. Move to Start Game') || (curStatus === 'Move to Start Game')) && 
      ((curPlayerPos.x === 0) && (curPlayerPos.y === 0)) // add bot if game is reversed
      ){
        upDateCurStatus('Game Started')
    }

    makeBotMove(e, curBotPos, updateBotPosFunc, block0Pos)
    makePayerMove(e, curPlayerPos, updatePlayerPosFunc, block0Pos)
  };


  // simple function: has nothing to d w/ collision
  // renders into boxes based on: box position in n^2 loop
  function getBoxValue(curBoxPos){
    if ((curPlayerPos.x === curBotPos.x)&&(curPlayerPos.y === curBotPos.y)) {
      return 'over' // !Note: not using it for now.
    }
    // put blocks if any
    if ((block0Pos.x === curBoxPos.x) && (block0Pos.y === curBoxPos.y)) {
      return 'block'
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
    var val = getBoxValue({x: box, y: rowid})
    // reset if game over
    if (val === 'over') {
      // ! Note: not using it for now.
      // these state funcs will re-render the whole component
      // that to (num_rows) times! 'over' is never returned.
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
// end: React component Component =====================================================================
