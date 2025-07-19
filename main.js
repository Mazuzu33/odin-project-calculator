let firstNum = null;
let operator = null;
let secondNum = null;

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
   return num1 / num2 ;
}

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
            break;
        case "-":
            return subtract(firstNum, secondNum);
            break;
        case "x":
            return multiply(firstNum, secondNum);
            break;
        case "/":
            return divide(firstNum, secondNum);
            break;
        default:
            return "Bad input";
            break;
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
        console.log("yo");
    }
    else {
        display.textContent = num;
    }
}

function buttonClick(e) {
    if (e.target.tagName === "BUTTON") {
        buttonContent = e.target.textContent;
        //Button contains a number
        if (validDigit.includes(buttonContent)) {
            //Set firstNum
            if (firstNum === null) {
                firstNum = Number(buttonContent);
                displayLog(firstNum);
            }
            //Append new digit to firstNum
            else if (operator === null) {
                firstNum = firstNum + buttonContent;
                firstNum = Number(firstNum);
                displayLog(firstNum);
            }
            //Set secondNum
            else {
                secondNum = Number(buttonContent)
                displayLog(secondNum);
            }
        }
        //Button contains Clear
        else if (buttonContent === "Clear") {
            firstNum = null;
            operator = null;
            secondNum = null;
            displayLog("");
        }
        //Button contains a operator other than =
        else if (validOperator.includes(buttonContent)) {
            //Operator is being added onto an already complete expression
            if (secondNum !== null) {
                firstNum = operate(operator, firstNum, secondNum);
                displayLog(firstNum);
                operator = buttonContent;
                secondNum = null;
            }
            //Operator is being chosen or changed
            else {
                operator = buttonContent;
            }
        }
        //Button contains =
        else {
            if (firstNum !== null && operator != null && operator != null) {
                firstNum = operate(operator, firstNum, secondNum);
                displayLog(firstNum);
                operator = null;
                secondNum = null;
            }
        }
    }
}


rows.addEventListener("click", buttonClick);


//Add event listeners for each button
//When button is clicked, get its value through textContent
//add textcontent to display text content

