let term = {
    "isSet": false,
};

let firstTerm = 0;
let secondTerm = 0;

let op = "";

let total = 0;

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
    return a / b;
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
//function to set and "add" tens place to term i.e user selects 9 and 9 again gives 9*10+9=99 
function setTerm(currentTerm, value) {
    value = parseInt(value);
    if(checkMaxDigits(currentTerm*10+value)) {
        currentTerm*=10;
        currentTerm+= value;
    }
    else {
        console.log("Over Max Allowed Digits");
    }
    console.log(currentTerm);
    setDisplay(currentTerm);
    return currentTerm;
}

function setTermValues(e) {
    //if user selects a number save that number to the first term if not set
    if(term.isSet) {
        secondTerm = setTerm(secondTerm, e.currentTarget.value);
    }

    //if user selects a number and the first term is filled save it to the second term
    else {
        firstTerm = setTerm(firstTerm, e.currentTarget.value);
    }
    //console.log(e.currentTarget.value);
}

function setClickListenerToNumberButtons() {
    let buttons = document.querySelectorAll('.interface-keys__keys--number');
    buttons = Array.from(buttons);
    buttons.forEach(button => {
        button.addEventListener('click', setTermValues);
    });
}

function addOperatorListener(e) {
   
    //if the term is set assign calculate the total and assign it to the first term
    //and set the second term equal to 0
    if(!op) {op = e.currentTarget.value;}
    if(term.isSet && secondTerm!=null) {
        total = operator(firstTerm, secondTerm, op);
        firstTerm = total;
        setDisplay(firstTerm);
        secondTerm = null;
        console.log(firstTerm);
        op = e.currentTarget.value;
    }
    
    //if the first term has not been set yet set it
    else {
        term.isSet = true;
    }
    console.log(op);
    
}

function setOperatorListener() {
    let buttons = document.querySelectorAll('.interface-keys__keys--operator');
    Array.from(buttons);
    buttons.forEach(button => {
        button.addEventListener('click', addOperatorListener);
    });
}

function checkMaxDigits(number) {
    return number <= 10000000 ? true : false;
}

function setDisplay(number) {
    const DIGITS_MAX = 9;
    let number_of_digits = 1;
    const display = document.querySelector('.interface-display__display');
    let power = 0;
    while(display.firstChild) {
        display.removeChild(display.firstChild);
    }
    while(number && number_of_digits < DIGITS_MAX) {
        const displayNumber = document.createElement('div');
        const value = number % 10;
        displayNumber.innerText = value;
        display.append(displayNumber);
        number = Math.floor(number/10);
        number_of_digits+=1;
    }
}
setClickListenerToNumberButtons();
setOperatorListener();
const equals = document.querySelector('.interface-keys__keys--equals');
equals.addEventListener('click', e => {
    if(firstTerm && secondTerm && op) {
        total= operator(firstTerm, secondTerm, op);
        firstTerm = total;
        setDisplay(firstTerm);
        secondTerm = null;
        op = null;
        console.log("="+firstTerm);
    }

    else if(firstTerm && op) {
        setDisplay(firstTerm);
    }

    else {
        setDisplay(firstTerm);
    }
});