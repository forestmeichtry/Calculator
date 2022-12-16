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

// Causes the screen to blink with an optional message
// if the reset argument is set to true the calc will be reset after the animation
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

// Performs mathematic operation using passed numbers and operator
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
        // If user attemps to divide by zero a message is displayed and the calculator resets
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

    // A message is displayed if the result is too large for the screen
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

// Resets calculator screens and values
function resetCalc() {
    setTimeout(() => {  resetSound.cloneNode().play(); }, 100);
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

// Performs associated function when a button is clicked
function buttonClick() {
    // Plays sound and animation for button click
    setTimeout(() => {  buttonSound.cloneNode().play(); }, 100);
    this.classList.remove("calcButtonHover");
    this.classList.add("fullClick");
    this.addEventListener("animationend", () => {
        this.classList.remove("fullClick");
        this.classList.add("calcButtonHover");
    });
    
    // Numeric buttons populate mainscreen
    let digit = Number(this.id[this.id.length - 1]);
    if (digit >= 0) {
        if (screen.textContent.length < 9) {
            screen.textContent = screen.textContent + digit;
            currentValue = Number(screen.textContent);
        // If there is no space available the mainscreen blinks instead
        } else {
            blink('', false);
        }
    // If the equal button is clicked and there is a valid operation to perform the operate function is called
    } else if (this.id === 'equalButton' && screen.textContent) {
        if ((subValue || subValue === 0) && currentOperation) {
            operate(subValue, currentValue, currentOperation);
        }
    // If the currently displayed number is a whole integer float notation can be added
    } else if (this.id === 'periodButton') {
        if (!floating) {
            screen.textContent = screen.textContent + '.';
            floating = true;
        } else {
            blink('', false);
        }
    // Operators eg(/, *, -, +) will populate the subscreen the first time they are called, and update the current operator.
    // If called again they will call the operate function to perform the current operator, then use the resulting value
    // as the subValue for the next operation
    } else if (isNaN(digit) && screen.textContent) {
        if (currentOperation) {
            operate(subValue, currentValue, currentOperation);
            subScreen.textContent = screen.textContent;
        }
        subValue = Number(screen.textContent);
        subScreen.textContent = subValue;
        screen.textContent = '';
        floating = false;
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

// scale calculator to fit window when resized
function resize() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    
    if (height < 1000) {
        calculator.style.transform = "scale(" + height / 1000 + ")";
    } else if (width < 800) {
        calculator.style.transform = "scale(" + width / 800 + ")";
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

let calculator = document.querySelector(".calculator");
window.addEventListener("resize", resize);
resize();