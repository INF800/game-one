import axios from 'axios'
import {pressKey, deepCopy} from './Maze/utils/keyPressController'
import {processGameStaus} from './Maze/utils/processGameStatus'

// ! note: must be same as initial conditions
// simply removes error: of returning maze in
// App component even if `startClick` is `false`
const storedInitialData = [
       // 0: position of p1 - player
       {x: 0, y: 0},
       // 1: posistion of p2 - bot
       {x: 4, y: 4},
       // 2: similarly add moving / static blocks.
       // for eg, static block: (useState for dynamic)
       [
         {x: 1, y: 2},
         {x: 2, y: 1}
       ],
       // 3: pits
       [
         {x: 3, y: 3},
       ],
       // 4: extra information
       {
         numRows: 5,
         numCols: 5,
         //playerMoveInterval: 10000,
         //botMoveInterval: 10000,
         playInterval: 3000,
         // toggle to stop random mover and use w-a-s-d keys only.
         isRandomMoves: true, // or `false`
       }
     ]


async function startAIGame() {

    // initialData 
    const data = deepCopy(storedInitialData)
    

    // ========================================================================================================
    // there are no "independant" moves =======================================================================

    // initially,
    window.newStates = {
    curPlayerPos: data[0], 
    curBotPos: data[1],
    block0Pos: data[2][0],
    block1Pos: data[2][1],
    pit0Pos: data[3][0]
    }

    if (data[4].isRandomMoves) {
    
    var botAndPlayerMovetimerId = setInterval( async ()=>{

        // 1. Player:
        // ==============================================
        // get what `action` to perfrom and perform action. 
        // after performing action,
        // send `reward` and `obeservation` i.e new bot position 
        //console.log(window.newStates.curBotPos, window.newStates.curPlayerPos)
        var oldGameStates0 = deepCopy(window.newStates) // new becomes old
        var action0 = await axios.post('http://127.0.0.1:8000/player/', {
        status: 'get player move' 
        })
        pressKey(action0.data.key)
        var newGameSates0 = deepCopy(window.newStates) // updated when move is made
        var [gameStatus0, curReward0] = processGameStaus()
        await axios.post('http://127.0.0.1:8000/player/', {
        status: 'sending cur reward and obsvn on given move',
        reward: curReward0,
        gameStatus: gameStatus0,
        newPlayerState: newGameSates0.curPlayerPos
        })

        if ((gameStatus0 === 'gameover') || (gameStatus0 === 'player pitfall')){
        window.location.reload()
        }

        // (some disavantages as not using useEffect)
        console.log('player @', oldGameStates0.curPlayerPos, 'to', newGameSates0.curPlayerPos, 'on', action0.data.key)

        
        // 2. Bot:
        // ===============================================
        // get what `action` to perfrom and perform action. 
        // after performing action,
        // send `reward` and `obeservation` i.e new bot position 
        //console.log(window.newStates.curBotPos, window.newStates.curPlayerPos)
        var oldGameStates1 = deepCopy(window.newStates) // new becomes old
        var action1 = await axios.post('http://127.0.0.1:8000/bot/', {
        status: 'get bot move' 
        })
        pressKey(action1.data.key)
        var newGameSates1 = deepCopy(window.newStates) // updated when move is made
        var [gameStatus1, curReward1] = processGameStaus()
        await axios.post('http://127.0.0.1:8000/bot/', {
        status: 'sending cur reward and obsvn on given move',
        reward: curReward1,
        gameStatus: gameStatus1,
        newGameSates: newGameSates1
        })

        if ((gameStatus1 === 'gameover') || (gameStatus1 === 'bot pitfall')){
            window.location.reload()
        }

        // (some disavantages as not using useEffect)
        window.gamestatus = gameStatus1
        console.log('bot @', oldGameStates1.curBotPos, 'to', newGameSates1.curBotPos, 'on', action1.data.key)



    }, data[4].playInterval
    )


    // happens pseudo-independantly.
    //  var botMovetimerId = setInterval( async ()=>{
    //    
    //      console.log('1. get bot move when @', window.newStates.curBotPos, window.newStates) // prev new state become old states
    //      var response1 = await axios.post('http://127.0.0.1:8009/bot/', {
    //        status: 'get bot move'
    //      })
    //      console.log('2. exec bot move:', response1.data.key)
    //      pressKey(response1.data.key)
    //      console.log('new state:', window.newStates.curBotPos)
    //
    //    }, data[4].botMoveInterval
    //  )
    // 
    //   var playerMovetimerId = setInterval( async ()=>{
    //    
    //      console.log('3. get player move when @', window.newStates.curPlayerPos ,window.newStates) // prev new state become old states
    //      var response2 = await axios.post('http://127.0.0.1:8009/player/', {
    //        status: 'get player move'
    //      })
    //      console.log('B. exec player move:', response2.data.key)
    //      pressKey(response2.data.key)
    //      console.log('new state:', window.newStates.curPlayerPos)
    //
    //    }, data[4].playerMoveInterval
    //  )

    }
    // end: independant moves =================================================================================
    // ========================================================================================================


    return data

}


export {startAIGame, storedInitialData}