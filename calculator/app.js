class Calculator {
    constructor(prevInput, currentInput){
        this.prevInput = prevInput;
        this.currentInput = currentInput;
        this.clear();
    }

    clear() {
        this.prevInputValue = '';
        this.currentInputValue = '0';
        this.operator = undefined;
    }

    delete() {
        this.currentInputValue = this.currentInputValue.toString().slice(0, -1);
    }
    
    negate() {
        this.currentInputValue = Number(this.currentInputValue) * -1
    }

    getNumber(number) {
        //if (this.currentInputValue)
        if (number === '.' && this.currentInputValue.includes('.') ) return;
        /*prevent starting zero*/
        if (this.currentInputValue.startsWith('0') ) {
            this.currentInputValue = number.toString();
        } else {
            this.currentInputValue = this.currentInputValue.toString() + number.toString();
        }
    }

    getOperator(operator) {
        if (this.currentInputValue === '') return
        if (this.prevInputValue !== '') {
            this.operate();
        }
            this.operator = operator;
            this.prevInputValue = this.currentInputValue;
            this.currentInputValue = '';
    }

    getDisplayNumber(number) {
        const stringNum = number.toString();
        const intDigits = parseFloat(stringNum.split('.')[0]);
        const deciDigits = stringNum.split('.')[1];

        let intDisplay;
        if (isNaN(intDigits) ){
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (deciDigits != null) {
            return `${intDisplay}.${deciDigits}`;
        } else {
            return intDisplay;
        }
    }

    updateDisplay() {
        if (this.currentInputValue.length > 19) {
            this.currentInput.innerText = 'OVERFLOW ERROR'
            return
        }
        this.currentInput.innerText = this.getDisplayNumber(this.currentInputValue);

        if (this.operator != null) {
            this.prevInput.innerText = 
                `${this.getDisplayNumber(this.prevInputValue)} ${this.operator}`
        } else {
            this.prevInput.innerText = '';
        }
    }

    operate() {
        let result = '';
        const prev = Number(this.prevInputValue);
        const current = Number(this.currentInputValue);
        if (isNaN(prev) || isNaN(current) ) return
        switch(this.operator) {
            case '+':
                result = prev + current
                break
            case '−':
                result = prev - current
                break
            case '×':
                result = prev * current
                break
            case '÷':
                    result = prev / current
                break
            default:
                return
        }

        this.currentInputValue = result.toString();
        this.prevInputValue = '';
        this.operator = undefined;
    }
}


const numberKeys = document.querySelectorAll('[data-number]')
const operatorKeys = document.querySelectorAll('[data-operator]')
const clearKey = document.querySelector('[data-clear]')
const deleteKey = document.querySelector('[data-delete]')
const negateKey = document.querySelector('[data-negate]')
const equalKey = document.querySelector('[data-equal]')
const prevInput = document.querySelector('[data-prev-input]')
const currentInput = document.querySelector('[data-current-input]')


const calculator = new Calculator(prevInput, currentInput);

numberKeys.forEach(key => {
    key.addEventListener('click', () => {
        calculator.getNumber(key.innerText);
        calculator.updateDisplay();
    })
})

operatorKeys.forEach(key => {
    key.addEventListener('click', () => {
        calculator.getOperator(key.innerText);
        calculator.updateDisplay();
    })
})

equalKey.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay();
})

clearKey.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteKey.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

negateKey.addEventListener('click', () => {
    calculator.negate();
    calculator.updateDisplay();
})
