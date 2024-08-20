let firstNumber = '', secondNumber = '', operator = '', result = 0

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
    case 'x':
      result = multiply(num1, num2)
      break
    case '÷':
      result = divide(num1, num2)
      break
    default:      
      result = 0
  }
  
  display.innerText = result
  firstNumber = ''
  secondNumber = ''
  operator = ''
}

// Events
const display = document.querySelector('#display')
const clear = document.querySelector('#clear')
const buttons = document.querySelectorAll('.buttons')

display.innerText = 0
clear.innerText = 'AC'
const buttonsArray = [...buttons]

buttonsArray.forEach(button => {
  button.addEventListener('click', ({target: {innerText: text}}) => {

    switch(text) {
      case 'C':
      case 'AC':
        if(text === 'C') clear.innerText = 'AC'
        operate()
        break
      case '+':
      case '-':
      case 'x':
      case '÷':
        if(firstNumber && !operator) {
          operator = text
        }
        break
      case '=':
        firstNumber && secondNumber && operator && operate()
        break
      default:
        if(!operator){
          firstNumber += text
          display.innerText = firstNumber
          clear.innerText = "C"
        }

        if(operator){
          secondNumber += text
          display.innerText = secondNumber
        }
    }
  });
});

// TODO: when you click show a hover