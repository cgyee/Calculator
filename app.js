let term = {
    "isSet": false,
};


let firstTerm = "";
let secondTerm = "";
let op = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b != 0 ? a / b : alert("You can divide by 0"), 0;
}

function operator(a, b, operation) {
    switch(operation) {
        case("+"):
            return add(a, b);
        
        case("-"):
            return subtract(a, b);
        
        case("*"):
            return multiply(a, b);
        
        case("/"):
            return divide(a, b);
    }
}


function convertFromStringToInteger(stringNumber) {
    return parseInt(stringNumber) ? parseInt(stringNumber) : 0;
}
//function to set and "add" tens place to term i.e user selects 9 and 9 again gives 9*10+9=99 
function updateTermValue(currentTerm, value) {
    if(checkMaxDigits(currentTerm+value)) {
        currentTerm+=value;
    }
    else {
        console.log("Over Max Allowed Digits");
    }
    console.log(currentTerm);
    setDisplay(currentTerm);
    return currentTerm;
}

function checkMaxDigits(stringNumber) {
    return stringNumber.length <= 9 ? true : false;
}

function setTermValues(e) {
    //if user selects a number save that number to the first term if not set
    if(term.isSet) {
        secondTerm = updateTermValue(secondTerm, e.currentTarget.value);
    }

    //if user selects a number and the first term is filled save it to the second term
    else {
        firstTerm = updateTermValue(firstTerm, e.currentTarget.value);
    }
    //console.log(e.currentTarget.value);
}

function setDisplay(number) {
    const display = document.querySelector('.interface-display__display');
    while(display.firstChild) {
        display.removeChild(display.firstChild);
    }
    const displayNumber = document.createElement('div');
    displayNumber.className = "display__numbers";
    displayNumber.textContent = number;
    display.appendChild(displayNumber);

}

function clearTermsAndOperator(){
    firstTerm = "";
    secondTerm = "";
    op = "";
    term.isSet = false;
    setDisplay(0);
}

function setOperatorListener(e) {
   
    //If the operator is not set set it equal to the current event target
    if(!op) {
        op = e.currentTarget.value;
    }
    setDisplay(op);
    //if the term is set and the secondterm is not an empty string, calculate the total and assign it to the first term
    //and set the second term equal to ""
    if(term.isSet && secondTerm!="") {

        firstTerm = operator(convertFromStringToInteger(firstTerm), convertFromStringToInteger(secondTerm), op);
        firstTerm = firstTerm.toString();
        secondTerm = "";
        console.log(firstTerm);
        op = e.currentTarget.value;
        setDisplay(firstTerm);
    }
    
    //if the first term has not been set yet set it
    else {
        term.isSet = true;
    }
    console.log(op);
    
}

function setEqualListener() {
    if(firstTerm && secondTerm && op) {
        firstTerm= operator(convertFromStringToInteger(firstTerm), convertFromStringToInteger(secondTerm), op).toString();
        setDisplay(firstTerm);
        secondTerm = "";
        op = "";
        console.log("= "+firstTerm);
    }
}

function removeLastAction() {
    if(firstTerm && secondTerm && op) {
        secondTerm = "";
        setDisplay(0);
    }

    else if(firstTerm && op && !secondTerm) {
        op = "";
        setDisplay("");
    }

    else {
        firstTerm = "";
        setDisplay(0);
    }

}

function addOperatorListener() {
    let buttons = document.querySelectorAll('.interface-keys__keys--operator');
    Array.from(buttons);
    buttons.forEach(button => {
        button.addEventListener('click', setOperatorListener);
    });
}

function addClickListenerNumberButtons() {
    let buttons = document.querySelectorAll('.interface-keys__keys--number');
    buttons = Array.from(buttons);
    buttons.forEach(button => {
        button.addEventListener('click', setTermValues);
    });
}

function addEqualEventListener() {
    const equals = document.querySelector('.interface-keys__keys--equals');
    equals.addEventListener('click', setEqualListener);
}

function addClearButtonListener() {
    const clear = document.querySelector('.interface-keys__keys--clear');
    clear.addEventListener('click', clearTermsAndOperator);
}

function addDeleteListener() {
    const del = document.querySelector('.interface-keys__keys--del');
    del.addEventListener('click', removeLastAction);
}

function calculatorSetup() {
    addClickListenerNumberButtons();
    addOperatorListener();
    addEqualEventListener();
    addClearButtonListener();
    addDeleteListener();
}

calculatorSetup();
