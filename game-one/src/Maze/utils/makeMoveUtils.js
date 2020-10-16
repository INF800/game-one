// Box boundary constraints and block collisions - all that code goes here.
// `makeMove` functions are excuted for every button press!
// ! make sure all important update are made before calling updateFunc 
// ! (Not using useEffect.. disadvantage is, changes wont be displayed until some related/unrelted component is updated)
// ===============================================================================================================
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// } 

function makeBotMove(e, curBotPos, updateBotPosFunc, block0Pos, block1Pos, pit0Pos) {

    if (
        (e.key === 'a') &&
        (curBotPos.x !== 0) &&
        !((curBotPos.x - 1 === block0Pos.x) && (curBotPos.y === block0Pos.y)) &&
        !((curBotPos.x - 1 === block1Pos.x) && (curBotPos.y === block1Pos.y))
    ) {
        window.newStates = { 
            curBotPos: {x: curBotPos.x - 1, y: curBotPos.y},
            curPlayerPos: window.newStates.curPlayerPos,
            block0Pos: block0Pos, block1Pos: block1Pos, pit0Pos: pit0Pos
        } 
        updateBotPosFunc({ x: curBotPos.x - 1, y: curBotPos.y })
    }
    else if (
        (e.key === 'd') &&
        (curBotPos.x !== 4) &&
        !((curBotPos.x + 1 === block0Pos.x) && ((curBotPos.y === block0Pos.y))) &&
        !((curBotPos.x + 1 === block1Pos.x) && ((curBotPos.y === block1Pos.y))) 
    ) {
        window.newStates = { 
            curBotPos: { x: curBotPos.x + 1, y: curBotPos.y },
            curPlayerPos: window.newStates.curPlayerPos,
            block0Pos: block0Pos, block1Pos: block1Pos, pit0Pos: pit0Pos
        }
        updateBotPosFunc({ x: curBotPos.x + 1, y: curBotPos.y })
    }
    else if ((
        e.key === 'w') &&
        (curBotPos.y !== 0) &&
        !((curBotPos.y - 1 === block0Pos.y) && (curBotPos.x === block0Pos.x)) &&
        !((curBotPos.y - 1 === block1Pos.y) && (curBotPos.x === block1Pos.x))
    ) {
        window.newStates = { 
            curBotPos: { x: curBotPos.x, y: curBotPos.y - 1 },
            curPlayerPos: window.newStates.curPlayerPos,
            block0Pos: block0Pos, block1Pos: block1Pos, pit0Pos: pit0Pos
        }
        updateBotPosFunc({ x: curBotPos.x, y: curBotPos.y - 1 })
    }
    else if (
        (e.key === 's') &&
        (curBotPos.y !== 4) &&
        !((curBotPos.y + 1 === block0Pos.y) && (curBotPos.x === block0Pos.x)) &&
        !((curBotPos.y + 1 === block1Pos.y) && (curBotPos.x === block1Pos.x))
    ) {
        window.newStates = { 
            curBotPos: { x: curBotPos.x, y: curBotPos.y + 1 },
            curPlayerPos: window.newStates.curPlayerPos,
            block0Pos: block0Pos, block1Pos: block1Pos, pit0Pos: pit0Pos
        }
        updateBotPosFunc({ x: curBotPos.x, y: curBotPos.y + 1 })
    }
}


async function makePayerMove(e, curPlayerPos, updatePlayerPosFunc, block0Pos, block1Pos, pit0Pos) {
    
    if (
        (e.key === 'ArrowLeft') &&
        (curPlayerPos.x !== 0) &&
        !((curPlayerPos.x - 1 === block0Pos.x) && (curPlayerPos.y === block0Pos.y)) &&
        !((curPlayerPos.x - 1 === block1Pos.x) && (curPlayerPos.y === block1Pos.y))
    ) {
        window.newStates = { 
            curPlayerPos: { x: curPlayerPos.x - 1, y: curPlayerPos.y },
            curBotPos: window.newStates.curBotPos,
            block0Pos: block0Pos, block1Pos: block1Pos, pit0Pos: pit0Pos
        }
        updatePlayerPosFunc({ x: curPlayerPos.x - 1, y: curPlayerPos.y })
    }
    else if ((
        e.key === 'ArrowRight') &&
        (curPlayerPos.x !== 4) &&
        !((curPlayerPos.x + 1 === block0Pos.x) && ((curPlayerPos.y === block0Pos.y))) &&
        !((curPlayerPos.x + 1 === block1Pos.x) && ((curPlayerPos.y === block1Pos.y)))
    ) {
        window.newStates = { 
            curPlayerPos: { x: curPlayerPos.x + 1, y: curPlayerPos.y },
            curBotPos: window.newStates.curBotPos,
            block0Pos: block0Pos, block1Pos: block1Pos, pit0Pos: pit0Pos
        }
        updatePlayerPosFunc({ x: curPlayerPos.x + 1, y: curPlayerPos.y })
    }
    else if (
        (e.key === 'ArrowUp') &&
        (curPlayerPos.y !== 0) &&
        !((curPlayerPos.y - 1 === block0Pos.y) && (curPlayerPos.x === block0Pos.x)) &&
        !((curPlayerPos.y - 1 === block1Pos.y) && (curPlayerPos.x === block1Pos.x))
    ) {
        window.newStates = { 
            curPlayerPos: { x: curPlayerPos.x, y: curPlayerPos.y - 1 },
            curBotPos: window.newStates.curBotPos,
            block0Pos: block0Pos, block1Pos: block1Pos, pit0Pos: pit0Pos
        }
        updatePlayerPosFunc({ x: curPlayerPos.x, y: curPlayerPos.y - 1 })
    }
    else if (
        (e.key === 'ArrowDown') &&
        (curPlayerPos.y !== 4) &&
        !((curPlayerPos.y + 1 === block0Pos.y) && (curPlayerPos.x === block0Pos.x)) &&
        !((curPlayerPos.y + 1 === block1Pos.y) && (curPlayerPos.x === block1Pos.x)) 
    ) {
        window.newStates = { 
            curPlayerPos: { x: curPlayerPos.x, y: curPlayerPos.y + 1 },
            curBotPos: window.newStates.curBotPos,
            block0Pos: block0Pos, block1Pos: block1Pos, pit0Pos: pit0Pos
        }
        updatePlayerPosFunc({ x: curPlayerPos.x, y: curPlayerPos.y + 1 })
    }
  }
  
  
export { makeBotMove, makePayerMove }