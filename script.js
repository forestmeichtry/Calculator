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

function reset() {
    let screen = document.querySelector(".screen");
    
    this.classList.remove("buttonHover");
    this.classList.add("clickAnimation");

    this.addEventListener("animationend", () => {
        this.classList.remove("clickAnimation");
        this.classList.add("buttonHover");
        screen.textContent = '';
    });
}

let testButton = document.querySelector(".clearButton");
testButton.addEventListener("click", reset);