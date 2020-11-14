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
    //term.isSet = true;
    currentTerm*=10;
    currentTerm += parseInt(value);
    console.log(currentTerm);
    return currentTerm;
}

function addClickListenerToNumberButtons(e) {
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
        button.addEventListener('click', addClickListenerToNumberButtons);
    });
}

function addOperatorListener(e) {
   
    //if the term is set assign calculate the total and assign it to the first term
    //and set the second term equal to 0
    if(!op) {op = e.currentTarget.value;}
    if(term.isSet && secondTerm!=null) {
        //term.isSet = false;
        total = operator(firstTerm, secondTerm, op);
        firstTerm = total;
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
    })
}
setClickListenerToNumberButtons();
setOperatorListener();
const equals = document.querySelector('.interface-keys__keys--equals');
equals.addEventListener('click', e => {
    total= operator(firstTerm, secondTerm, op);
    firstTerm = total;
    secondTerm = null;
    op = null;
    console.log("="+firstTerm);
});