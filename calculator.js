let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

function init(){
    document.querySelector(".calc-buttons").addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    });
}

function buttonClick(value){
    if (isNaN(parseInt(value))){
        handleSymmbol(value);
    } else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if (buffer === "0"){
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymmbol(value){
    switch (value){
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            if (previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case "back":
            if (buffer.length === 1){
                buffer = "0";
            } else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function rerender(){
        screen.innerText = buffer;
}

function handleMath(value){
    if (buffer === "0"){
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer
    } else{
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer){
    if (previousOperator === "+"){
        runningTotal += intBuffer;
    }
    if (previousOperator === "-"){
        runningTotal -= intBuffer;
    }
    if (previousOperator === "*"){
        runningTotal *= intBuffer;
    }
    if (previousOperator === "/"){
        runningTotal /= intBuffer;
    }
}

init();