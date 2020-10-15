// press key from keyboard
function pressKey (keyChar) {
    if (!((keyChar !== 'ArrowRight')||(keyChar !== 'ArrowLeft')||(keyChar !== 'ArrowUp')||(keyChar !== 'ArrowDown'))){
        keyChar = keyChar.toLowerCase()
    }
    var e = new KeyboardEvent("keydown", {
        key  : keyChar, 
        char : keyChar
      })
    document.dispatchEvent(e)
}

function deepCopy(originalObject){
    return JSON.parse(JSON.stringify(originalObject))
}

export {pressKey, deepCopy}