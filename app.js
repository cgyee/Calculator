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
    //setDisplay(currentTerm);
    return currentTerm;
}

function checkMaxDigits(stringNumber) {
    return stringNumber.length <= 9 ? true : false;
}

function setTermValues(e) {
    //if user selects a number save that number to the first term if not set
    if(firstTerm) {
        secondTerm = updateTermValue(secondTerm, e.currentTarget.value);
    }

    //if user selects a number and the first term is filled save it to the second term
    else {
        firstTerm = updateTermValue(firstTerm, e.currentTarget.value);
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
    if(term.isSet && secondTerm!="") {

        firstTerm = operator(convertFromStringToInteger(firstTerm), convertFromStringToInteger(secondTerm), op);
        firstTerm = firstTerm.toString();
        //setDisplay(firstTerm);
        secondTerm = "";
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

function setDisplay(number) {
    const display = document.querySelector('.interface-display__display');
}
setClickListenerToNumberButtons();
setOperatorListener();
const equals = document.querySelector('.interface-keys__keys--equals');
equals.addEventListener('click', e => {
    if(firstTerm && secondTerm && op) {
        firstTerm= operator(convertFromStringToInteger(firstTerm), convertFromStringToInteger(secondTerm), op).toString();
        //setDisplay(firstTerm);
        secondTerm = "";
        op = "";
        console.log("= "+firstTerm);
    }

    else if(firstTerm && op) {
        setDisplay(firstTerm);
    }

    else {
        setDisplay(firstTerm);
    }
});