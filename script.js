function add(num1, num2) {
    return (num1 + num2);
}

function subtract(num1, num2) {
    return (num1 - num2);
}

function multiply(num1, num2) {
    return (num1 * num2);
}

function divide(num1, num2) {
    return (num1 / num2);
}

function blink(message, reset) {
    if (message) {
        screen.textContent = message;
    }
    screen.classList.add("blink");
    if (reset) {
        screen.addEventListener("animationend", resetBlink);
    } else {
        screen.addEventListener("animationend", justBlink);
    }
    
}

function resetBlink() {
    screen.classList.remove("blink");
    resetButton.click();
    screen.removeEventListener("animationend", resetBlink);
}

function justBlink() {
    screen.classList.remove("blink");
    screen.removeEventListener("animationend", justBlink);
}

function operate(num1, num2, operator) {
    num1 = Number(num1);
    num2 = Number(num2);
    let result;
    let tempString = num2 + '=';
    subScreen.textContent = subScreen.textContent + tempString;

    if (operator === 'add') {
        result = add(num1, num2);
    } else if (operator === 'subtract') {
        result = subtract(num1, num2);
    } else if (operator === 'multiply') {
        result = multiply(num1, num2);
    } else if (operator === 'divide') {
        if (num1 === 0 || num2 === 0) {
            blink("Nice Try", true);
            return;
        }
        result = divide(num1, num2);
    }

    if (Number.isInteger(result)) {
        floating = false;
    } else {
        floating = true;
    }

    if (result >= 1000000000) {
        blink("Too Big", true);
    } else if (result.toString().length > 9) {
        let decimalPlaces = 8 - Math.floor(result).toString().length;
        screen.textContent = result.toFixed(decimalPlaces) * 1;
    } else {
        screen.textContent = result;
    }
    currentOperation = null;
}

// clears screen when reset button is activated
function resetCalc() {
    resetSound.cloneNode().play();
    this.classList.remove("buttonHover");
    this.classList.add("clickAnimation");

    this.addEventListener("animationend", () => {
        this.classList.remove("clickAnimation");
        this.classList.add("buttonHover");

        screen.textContent = '';
        subScreen.textContent = '';
        subValue = null;
        currentValue = null;
        currentOperation = null;
        floating = false;
    });
}

function buttonClick() {
    buttonSound.cloneNode().play();
    this.classList.remove("calcButtonHover");
    this.classList.add("fullClick");
    this.addEventListener("animationend", () => {
        this.classList.remove("fullClick");
        this.classList.add("calcButtonHover");
    });
    
    let digit = Number(this.id[this.id.length - 1]);
    if (digit >= 0) {
        if (screen.textContent.length < 9) {
            screen.textContent = screen.textContent + digit;
            currentValue = Number(screen.textContent);
        } else {
            blink('', false);
        }
    } else if (this.id === 'equalButton' && screen.textContent) {
        if (subValue && currentOperation) {
            operate(subValue, currentValue, currentOperation);
        }
    } else if (this.id === 'periodButton') {
        if (!floating) {
            screen.textContent = screen.textContent + '.';
            floating = true;
        } else {
            blink('', false);
        }        
    } else if (isNaN(digit) && screen.textContent) {
        if (currentOperation) {
            operate(subValue, currentValue, currentOperation);
            subScreen.textContent = screen.textContent;
        }
        subValue = Number(screen.textContent);
        subScreen.textContent = subValue;
        screen.textContent = '';
        switch (this.id) {
            case 'divButton':
                currentOperation = 'divide';
                subScreen.textContent = subScreen.textContent + '/';
                break;
            case 'multButton':
                currentOperation = 'multiply';
                subScreen.textContent = subScreen.textContent + '*';
                break;
            case 'subButton':
                currentOperation = 'subtract';
                subScreen.textContent = subScreen.textContent + '-';
                break;
            case 'plusButton':
                currentOperation = 'add';
                subScreen.textContent = subScreen.textContent + '+';
                break;
        }
    }
}

let currentValue = null;
let subValue = null;
let currentOperation = null;
let floating = false;
let screen = document.querySelector(".screen");
let subScreen = document.querySelector(".subScreen");
let buttonSound = new Audio('Sharp-calculator-single-button-press.mp3');

let resetButton = document.querySelector(".clearButton");
let resetSound = new Audio("reset.mp3");
resetButton.addEventListener("click", resetCalc);

const buttons = document.querySelectorAll(".calcButton");
buttons.forEach((button) => {
    button.addEventListener("click", buttonClick);
});