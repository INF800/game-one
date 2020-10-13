import React from 'react';
import './FiveBoxRow.css'
import {makeBotMove, makePayerMove} from './makeMoveUtils'

var BLOCK = 'block'
var PLAYER = 'x'
var OPPONENT = 'o'
var EMPTY = ''

function FiveBoxRow({
  rowid, numCols,
  curPlayerPos, updatePlayerPosFunc, 
  curBotPos, updateBotPosFunc,
  block0Pos, // add more blocks
  upDateCurStatus,
  curStatus
}) {

  document.onkeydown = function(e) {  
    console.log(e.key) // log any key
    // update status and make moves
    // the only update inside n^2 (runs only once until gameover)
    if (
      ((curStatus === 'Game Over! Move to Start Game') || (curStatus === 'Move to Start Game')) && 
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
    // put blocks if any 
    if ((block0Pos.x === curBoxPos.x) && (block0Pos.y === curBoxPos.y)) {
      return BLOCK
    }       
    // update bot pos
    else if ((curBotPos.x === curBoxPos.x) && (curBotPos.y === curBoxPos.y)) {
      return OPPONENT
    }
    // update player pos
    else if ((curPlayerPos.x === curBoxPos.x) && (curPlayerPos.y === curBoxPos.y)) {
      return PLAYER
    } 
    else { 
      return EMPTY //`${curBoxPos.x}, ${curBoxPos.y}` // return EMPTY instead
    }
  }

  function renderBoxesInRow(numBoxes){
    var accumulator = []
    for(let box=0; box<numBoxes; box++){
      accumulator.push(
        <div className='box' key={box} >
          {getBoxValue({x: box, y: rowid})}
        </div>
      )
    }
    return accumulator
  }

  return (
    <div className='FiveBoxRowContainer'>
      {renderBoxesInRow(numCols)}
    </div>
  )
}

export default FiveBoxRow