let firstNum = null;
let operator = null;
let secondNum = null;
let displayingResult = false;
let decimalPoint = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return NaN;
    }
    else {
        return num1 / num2 ;
    }
}

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "x":
            return multiply(firstNum, secondNum);
        case "/":
            return divide(firstNum, secondNum);
        default:
            return "Bad input";
    }
}

let display = document.querySelector(".display");
let rows = document.querySelector(".rows");
let validDigit = "0123456789";
let validOperator = "+-x/";

function displayLog(num) {
    //Num is a decimal
    if (num % 1 !== 0) {
        display.textContent = Math.floor(num * 100000) / 100000;
    }
    else {
        display.textContent = num;
    }
}

function buttonUse(e) {
    let content = e.key ? e.key : e.target.textContent;
    console.log(Boolean(e.key));
    console.log(validDigit.includes(e.key));
    //Button is a number
    if (validDigit.includes(content)) {
        //Set firstNum
        if (firstNum === null || displayingResult) {
            firstNum = Number(content);
            displayLog(firstNum);
            displayingResult = false;
        }
        //Append digit to firstNum
        else if (operator === null) {
            if (decimalPoint) {
                firstNum += ".";
                decimalPoint = false;
            }
            firstNum += content;
            firstNum = Number(firstNum);
            displayLog(firstNum);
        }
        //Set secondNum
        else if (secondNum === null) {
            secondNum = Number(content)
            displayLog(secondNum);
        }
        //Append digit to secondNum
        else {
            if (decimalPoint) {
                secondNum += ".";
                decimalPoint = false;
            }
            secondNum += content;
            secondNum = Number(secondNum);
            displayLog(secondNum);
        }
    }
    //Button is decimal point
    else if (content === ".") {
        //Append . to firstNum
        if (firstNum !== null && operator === null && !String(firstNum).includes(".") && !displayingResult) {
            decimalPoint = true;
            display.textContent += ".";
        }
        //Append . to secondNum
        else if (secondNum !== null && !String(secondNum).includes(".")) {
            decimalPoint = true;
            display.textContent += ".";
        }

    }
    //Button is Clear
    else if (content === "Clear") {
        firstNum = null;
        operator = null;
        secondNum = null;
        displayingResult = false;
        displayLog("");
    }
    //Button is delete
    else if (content === "Delete") {
        console.log("test");
        if (secondNum !== null) {
            if (decimalPoint) {
                    decimalPoint = false;
                    display.textContent = display.textContent.slice(0, -1);
                }
            else if (String(secondNum).length === 1) {
                secondNum = null;
                displayLog("");
            }
            else {
                secondNum = Number(String(secondNum).slice(0, -1));
                displayLog(secondNum);
            }
        }
        else if (firstNum !== null && operator === null) {
            if (decimalPoint) {
                decimalPoint = false;
                display.textContent = display.textContent.slice(0, -1);
            }
            else if (String(firstNum).length === 1) {
                firstNum = null;
                displayLog("");
            }
            else {
                firstNum = Number(String(firstNum).slice(0, -1));
                displayLog(firstNum);
            }
        }
    }
    //Button is a operator other than =
    else if (validOperator.includes(content)) {
        //Operator is being added onto an already complete expression
        if (secondNum !== null) {
            firstNum = operate(operator, firstNum, secondNum);
            displayLog(firstNum);
            operator = content;
            secondNum = null;
        }
        //Operator is being chosen or changed
        else if (firstNum !== null) {
            operator = content;
            displayingResult = false;
        }
    }
    //Button is =
    else if (content == "=") {
        if (firstNum !== null && operator != null && secondNum != null) {
            firstNum = operate(operator, firstNum, secondNum);
            displayLog(firstNum);
            operator = null;
            secondNum = null;
            displayingResult = true;
        }
    }
}


rows.addEventListener("click", buttonUse);
window.addEventListener("keydown", buttonUse);
