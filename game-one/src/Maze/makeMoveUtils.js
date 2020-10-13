// Box boundary constraints and block collisions - all that code goes here.
// `makeMove` functions are excuted for every button press!

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeBotMove(e, curBotPos, updateBotPosFunc, block0Pos) {
    if (
        (e.key === 'a') &&
        (curBotPos.x !== 0) &&
        !((curBotPos.x - 1 === block0Pos.x) && (curBotPos.y === block0Pos.y))
    ) {
        updateBotPosFunc({ x: curBotPos.x - 1, y: curBotPos.y })
    }
    else if (
        (e.key === 'd') &&
        (curBotPos.x !== 4) &&
        !((curBotPos.x + 1 === block0Pos.x) && ((curBotPos.y === block0Pos.y)))
    ) {
        updateBotPosFunc({ x: curBotPos.x + 1, y: curBotPos.y })
    }
    else if ((
        e.key === 'w') &&
        (curBotPos.y !== 0) &&
        !((curBotPos.y - 1 === block0Pos.y) && (curBotPos.x === block0Pos.x))
    ) {
        updateBotPosFunc({ x: curBotPos.x, y: curBotPos.y - 1 })
    }
    else if (
        (e.key === 's') &&
        (curBotPos.y !== 4) &&
        !((curBotPos.y + 1 === block0Pos.y) && (curBotPos.x === block0Pos.x))
    ) {
        updateBotPosFunc({ x: curBotPos.x, y: curBotPos.y + 1 })
    }
}



async function makePayerMove(e, curPlayerPos, updatePlayerPosFunc, block0Pos) {
    //await sleep(100) // ? Make it after
    
    if (
        (e.key === 'ArrowLeft') &&
        (curPlayerPos.x !== 0) &&
        !((curPlayerPos.x - 1 === block0Pos.x) && (curPlayerPos.y === block0Pos.y))
    ) {
        updatePlayerPosFunc({ x: curPlayerPos.x - 1, y: curPlayerPos.y })
    }
    else if ((
        e.key === 'ArrowRight') &&
        (curPlayerPos.x !== 4) &&
        !((curPlayerPos.x + 1 === block0Pos.x) && ((curPlayerPos.y === block0Pos.y)))
    ) {
        
        updatePlayerPosFunc({ x: curPlayerPos.x + 1, y: curPlayerPos.y })
        // updatePlayerPosFunc({ x: curPlayerPos.x + 1, y: curPlayerPos.y }, async (n) => {
        //     //console.log(n.x) // curPlayerPos.x
        //     await sleep(1000)
        // })

    }
    else if (
        (e.key === 'ArrowUp') &&
        (curPlayerPos.y !== 0) &&
        !((curPlayerPos.y - 1 === block0Pos.y) && (curPlayerPos.x === block0Pos.x))
    ) {
        updatePlayerPosFunc({ x: curPlayerPos.x, y: curPlayerPos.y - 1 })
    }
    else if (
        (e.key === 'ArrowDown') &&
        (curPlayerPos.y !== 4) &&
        !((curPlayerPos.y + 1 === block0Pos.y) && (curPlayerPos.x === block0Pos.x))
    ) {
        updatePlayerPosFunc({ x: curPlayerPos.x, y: curPlayerPos.y + 1 })
    }
  }
  
  
export { makeBotMove, makePayerMove }