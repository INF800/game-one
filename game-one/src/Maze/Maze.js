import React from 'react';
import './Maze.css'
import FiveBoxRow from './FiveBoxRow.js'

function Maze() {

  return (
    <div className='mazeContainer'>
      <div>
        <FiveBoxRow />
        <FiveBoxRow />
        <FiveBoxRow />
        <FiveBoxRow />
        <FiveBoxRow />
      </div>
    </div>
  )
}

export default Maze