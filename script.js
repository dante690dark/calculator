let firstNumber = '', secondNumber = '', operator = '', result = 0

const INITIAL_VALUE = {
  zero: 0,
  reset: 'AC' 
}

const sum = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const operate = () => {
  const num1 = +firstNumber
  const num2 = +secondNumber

  switch(operator) {     
    case '+':
      result = sum(num1, num2)
      break
    case '-':
      result = subtract(num1, num2)
      break
    case '*':
      result = multiply(num1, num2)
      break
    case '÷':
      result = divide(num1, num2)
      break
    default:      
      result = INITIAL_VALUE.zero
  }
  
  display.innerText = result
  firstNumber = ''
  secondNumber = ''
  operator = ''
}

// Events
const display = document.querySelector('#display')
const reset = document.querySelector('#reset')
const buttons = document.querySelectorAll('.buttons')

display.innerText = INITIAL_VALUE.zero
reset.innerText = INITIAL_VALUE.reset
const buttonsArray = [...buttons]

buttonsArray.forEach(button => {
  button.addEventListener('click', ({target: {innerText: text}}) => {

    switch(text) {
      case INITIAL_VALUE.reset:
      case 'C':
        if(text === 'C') reset.innerText = INITIAL_VALUE.reset
        operate()
        break
      case '+':
      case '-':
      case '*':
      case '÷':
        if(firstNumber && !operator) {
          operator = text
          display.innerText = operator
        }
        break
      case '=':
        firstNumber && secondNumber && operator && operate()
        break
      default:
        if(!operator){
          firstNumber += text
          display.innerText = firstNumber
          reset.innerText = "C"
        }

        if(operator){
          secondNumber += text
          display.innerText = secondNumber
        }
    }
  });
});