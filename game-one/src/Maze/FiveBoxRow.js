import React from 'react';
import './FiveBoxRow.css'
import {makeBotMove, makePayerMove} from './utils/makeMoveUtils'


import { Icon, InlineIcon } from '@iconify/react';
import bxBot from '@iconify/icons-bx/bx-bot';
import bxsHeart from '@iconify/icons-bx/bxs-heart';

var PIT = 'hole'
var BLOCK = 'block'
var PLAYER = <Icon fontSize={20} color="blue" icon={bxBot} />
var OPPONENT = <Icon fontSize={20} color="red" icon={bxsHeart} />
var EMPTY = ''

function FiveBoxRow({
  rowid, numCols,
  curPlayerPos, updatePlayerPosFunc, 
  curBotPos, updateBotPosFunc,
  block0Pos, block1Pos, // add more blocks
  pit0Pos // add more pits
}) {

  document.onkeydown = function(e) {  
    // console.log(e.key) // log any key
    // update status and make moves (The only upddate)
    // (runs only once until gameover)
    // if (
    //   ((curStatus === 'Game Over! Move to Start Game') || (curStatus === 'Move to Start Game')) && 
    //   ((curPlayerPos.x === 0) && (curPlayerPos.y === 0)) // add bot if game is reversed
    //   ){
    //     upDateCurStatus('Game Started')
    // }

    makeBotMove(e, curBotPos, updateBotPosFunc, block0Pos, block1Pos, pit0Pos)
    makePayerMove(e, curPlayerPos, updatePlayerPosFunc, block0Pos, block1Pos, pit0Pos)
  };

  // simple function: has nothing to d w/ collision
  // renders into boxes based on: box position in n^2 loop
  function getBoxValue(curBoxPos){
    // put blocks if any 
    if (
      ((block0Pos.x === curBoxPos.x) && (block0Pos.y === curBoxPos.y)) ||
      ((block1Pos.x === curBoxPos.x) && (block1Pos.y === curBoxPos.y))
      ) {
      return BLOCK
    }
    if ((pit0Pos.x === curBoxPos.x) && (pit0Pos.y === curBoxPos.y)) {
      return PIT
    }
    // update player pos
    else if ((curPlayerPos.x === curBoxPos.x) && (curPlayerPos.y === curBoxPos.y)) {
      return PLAYER
    }        
    // update bot pos
    else if ((curBotPos.x === curBoxPos.x) && (curBotPos.y === curBoxPos.y)) {
      return OPPONENT
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