// coods (x, y) correspond to:
//    
//      y: 0 + --- + --- + ----+
//           |     |     |     |  
//      y: 1 + --- + --- + ----+ 
//           |     |     |     | 
//      y: 2 + --- + --- + ----+ 
//           |     |     |     |
//      y: ..+ --- + --- + ----+ 
//         x: 0     1    2     3 
//   
//
// use deepcopied new/oldGameStates or window.newStates
// {
//     curBotPos:        { x: int, y: int },
//     curPlayerPos:     { x: int, y: int },
//     block0Pos:        { x: int, y: int }, 
//     block1Pos:        { x: int, y: int }, 
//     pit0Pos:          { x: int, y: int }
// }
//

function processGameStaus () {
    // todo: add logic
    let status = 'playing'
    let reward = 0

    if (isSameCood(window.newStates.curPlayerPos, window.newStates.curBotPos)){
        status = 'gameover' // game won actually as we caught it
        reward = 1
    }
    if (isSameCood(window.newStates.curPlayerPos, window.newStates.pit0Pos)){
        status = 'player pitfall'
        reward = -1
    }
    // !currently not using
    if (isSameCood(window.newStates.curBotPos, window.newStates.pit0Pos)){
        status = 'bot pitfall'
        reward = -1
    }

    return [status, reward]
}



function isSameCood(xy1, xy2){
    if ((xy1.x === xy2.x) && ((xy1.y === xy2.y))){
        return true
    } else {
        return false
    }
}


export {processGameStaus}