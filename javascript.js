var r = document.querySelector(':root');
let primaryDisplayString = '';
let secondaryDisplayString = '';
const primaryDisplay = document.querySelector('#primaryDisplay');
const secondaryDisplay = document.querySelector('#secondaryDisplay');

let firstNumber = null;
let secondNumber = null;
let operator = '';

// Variable to track if between numbers, e.g. operator or equals pressed
let betweenNumbers = false;

// Main function
function main() {
    // Add listeners to all the buttons
    let allKeypadButtons = document.querySelectorAll("#keypad > button");

    allKeypadButtons.forEach(button => {
        button.addEventListener("click", buttonPress);
    })
}

// Button press event handler
function buttonPress(e) {

    let buttonPressed = this.dataset.buttonvalue;

    switch(buttonPressed) {
    // check for C, AC
        case 'AC': reset(); break;
        case 'C': clearPrimary(); betweenNumbers = false; break;

    // check for operators
        case 'divide':
        case 'multiply':
        case 'add':
        case 'subtract': {
            operator = buttonPressed; // add this operator to the operator variable
            
            // First time pressing add (firstNumber is null)
            if(firstNumber == null) {
                firstNumber = parseFloat(primaryDisplayString);
                updatePrimary();
            }     
            // If first number has a value, this is a successive add 
            else {
                secondNumber = parseFloat(primaryDisplayString);
                clearPrimary();
                compute(operator);
            }
            betweenNumbers = true;
         } break;    

        case 'del': {
            if(primaryDisplayString.toString().length > 0)
                primaryDisplayString = primaryDisplayString.slice(0, -1); 

            updatePrimary();
        } break;

        case 'equals': {
            secondNumber = parseFloat(primaryDisplayString);
            clearPrimary();            
            compute(operator);
            firstNumber = null;
        } break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':    
        case '7':
        case '8':
        case '9':
        case '.':
            if(betweenNumbers)
                clearPrimary();
            
             addDigit(buttonPressed);
             betweenNumbers = false;
             break;
    }
    
}

// Perform operation, might need to add arg to see if its done by equal or another operator
function compute(operator) {
    switch(operator) {
        case 'add': {
            secondaryDisplayString = firstNumber.toString() + " + " + secondNumber.toString();
            firstNumber += secondNumber;
        } break;

        case 'subtract': {
            secondaryDisplayString = firstNumber.toString() + " - " + secondNumber.toString();
            firstNumber -= secondNumber;
        } break;

        case 'divide': {
            secondaryDisplayString = firstNumber.toString() + " ÷ " + secondNumber.toString();
            firstNumber /= secondNumber;
        } break;

        case 'multiply': {
            secondaryDisplayString = firstNumber.toString() + " x " + secondNumber.toString();
            firstNumber *= secondNumber;
        } break;
    }

    primaryDisplayString = firstNumber;            
    updateDisplay();
    secondNumber = null;
    betweenNumbers = true;
}

// Add digit to display and primaryDisplayString if valid
function addDigit(digit) {
    
    // If there's space
    if(primaryDisplayString.length < 10) {
        primaryDisplayString += digit;
    }

    updatePrimary();
}

// Full reset of everything (AC)
function reset() {
    firstNumber = null;
    secondNumber = null;
    primaryDisplayString = '';
    secondaryDisplayString = '';
    betweenNumbers = false;
    
    updateDisplay();
}

// Update display, but sanitize output to prevent display overflow (crudely)
function updateDisplay() {

    // Number is just too big
    if(firstNumber > 999999999) {
        primaryDisplayString = "TOO BIG";
    }    

    // Otherwise its decimals, keep rounding until its 10 characters
    let i = 10;

    while(primaryDisplayString.toString().length > 10) {
        primaryDisplayString = firstNumber.toFixed(i);
        i--;
    }

    primaryDisplay.innerHTML = primaryDisplayString;
    secondaryDisplay.innerHTML = secondaryDisplayString;
}

// Display update/clear functions
function updatePrimary() { primaryDisplay.innerHTML = primaryDisplayString; }
function updateSecondary() { secondaryDisplay.innerHTML = secondaryDisplayString; }

function clearPrimary() {
    primaryDisplayString='';
    updatePrimary();
}

function clearSecondary() {
    secondaryDisplayString='';
    updateSecondary();
}

// Let's Go
main();