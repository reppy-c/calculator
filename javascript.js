const ADD = "+";


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

// Welcome in console and run five rounds
function main() {
    
    console.log("dd");

    //add listeners to all the buttons
    let allKeypadButtons = document.querySelectorAll("#keypad > button");
    allKeypadButtons.forEach(button => {
        button.addEventListener("click", buttonPress);
    })
}


//buttonpress
function buttonPress(e) {

    let buttonPressed = this.dataset.buttonvalue;

    switch(buttonPressed) {
    // check for C, AC
        case 'AC': reset(); break;
        case 'C': clearPrimary(); break;
    // check for =
    // check for operators
        case 'add': {
            operator = ADD; // add this operator to the operator variable
            
            // First time pressing add (firstNumber is null)
            if(firstNumber == null) {
                console.log("first number is null");
                firstNumber = parseFloat(primaryDisplayString);
                betweenNumbers = true;
                updatePrimary();

                console.log("after clicking add, firstnumber is: " + firstNumber + " secondnumber is: " + secondNumber + " between numbers: " + betweenNumbers + " operator: " + operator);
            }     
            // If first number has a value, this is a successive add 
            else {
                secondNumber = parseFloat(primaryDisplayString);
                betweenNumbers = true;
                clearPrimary();
                compute(operator);
            }
        
            } break;             
                        // if this is first number, then finalize it and start working on second thing
                        // if this is the second number, then complete operation, put the product in first and work on a new second

        case 'equals': {
            secondNumber = parseFloat(primaryDisplayString);
            clearPrimary();
            
            compute(operator);
            firstNumber = null;

            //console.log("after clicking equals, firstnumber is: " + firstNumber + " secondnumber is: " + secondNumber + " between numbers: " + betweenNumbers + " operator: " + operator);
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
        case ADD: {
            secondaryDisplayString = firstNumber.toString() + " + " + secondNumber.toString();

            firstNumber += secondNumber;
            primaryDisplayString = firstNumber;
            
            updateDisplay();
            secondNumber = null;
            betweenNumbers = true;
        } break;

        case 'x': {
            
        } break;

    }

    console.log("compute" + operator);
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

function updateDisplay() {
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