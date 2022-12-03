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

function operate(num1, num2, operator) {
    if (operator === 'add') {
        return add(num1, num2);
    } else if (operator === 'subtract') {
        return subtract(num1, num2);
    } else if (operator === 'multiply') {
        return multiply(num1, num2);
    } else if (operator === 'divide') {
        return divide(num1, num2);
    }
}

// clears screen when reset button is activated
function reset() {
    let resetSound = new Audio("reset.mp3");
    resetSound.cloneNode().play();
    this.classList.remove("buttonHover");
    this.classList.add("clickAnimation");

    this.addEventListener("animationend", () => {
        this.classList.remove("clickAnimation");
        this.classList.add("buttonHover");
        screen.textContent = '';
    });
}

// Determines which button is clicked when an onclick event happens
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
        } else {
            screen.classList.add("blink");
            screen.addEventListener("animationend", () => {
                screen.classList.remove("blink");
            });
        }
    } else if (isNaN(digit)) {
        console.log(this.id);
    }
}

let screen = document.querySelector(".screen");
let buttonSound = new Audio('Sharp-calculator-single-button-press.mp3');
let resetButton = document.querySelector(".clearButton");
resetButton.addEventListener("click", reset);
const buttons = document.querySelectorAll(".calcButton");
buttons.forEach((button) => {
    button.addEventListener("click", buttonClick);
});