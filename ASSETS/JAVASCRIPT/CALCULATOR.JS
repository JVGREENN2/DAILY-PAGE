function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(character) {
    document.getElementById('display').value += character;
}

function calculate() {
    try {
        let expression = document.getElementById('display').value;
        expression = expression.replace(/(\d+)%/g, '(($1)/100 * '+document.getElementById('display').value.split(/[-+*/]/).slice(-2,-1)[0]+')');
        let result = new Function(`return ${expression}`)();
        document.getElementById('display').value = result;
    } catch (e) {
        document.getElementById('display').value = 'Erro';
    }
}

function clearEntry() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1) || '';
}

function factorial() {
    let display = document.getElementById('display');
    let num = parseInt(display.value);
    if (num < 0) {
        display.value = 'Erro';
        return;
    }
    let fact = 1;
    for (let i = 2; i <= num; i++) {
        fact *= i;
    }
    display.value = fact;
}

function squareRoot() {
    let display = document.getElementById('display');
    let num = parseFloat(display.value);
    if (num < 0) {
        display.value = 'Erro';
        return;
    }
    display.value = Math.sqrt(num);
}