let firstNumber = '', secondNumber = '', operator = '', result = 0

const sum = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => b !== 0 ? a / b : 'Error'
const convertDecimal = num => num / 100
const convertOperant = num => num * (-1)

const displayScreen = number => display.innerText = number

const operate = () => {
  const num1 = +(firstNumber.replace(',', '.'))
  const num2 = +(secondNumber.replace(',', '.'))

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
  result = +(result.toFixed(2));
  
  firstNumber = result.toString().replace('.', ',')
  displayScreen(firstNumber)
  secondNumber = ''
  operator = ''
}

// Events
const display = document.querySelector('#display')
const clear = document.querySelector('#clear')
const buttons = document.querySelectorAll('.buttons')

displayScreen(0)
clear.innerText = 'AC'
const buttonsArray = [...buttons]

buttonsArray.forEach(button => {
  button.addEventListener('click', ({target: {innerText: text}}) => {

    switch(text) {
      case 'C':
      case 'AC':
        if(text === 'C') clear.innerText = 'AC'
        firstNumber = ''
        secondNumber = ''
        operator = ''
        displayScreen(0)
        break
      case '+/-':
        if(firstNumber && !secondNumber && !operator) {  
          firstNumber = convertOperant(+(firstNumber).toString().replace(',', '.')).toString().replace('.', ',')
          displayScreen(firstNumber)
        }

        if(firstNumber && secondNumber && operator) {
          secondNumber = convertOperant(+(secondNumber).toString().replace(',', '.')).toString().replace('.', ',')
          displayScreen(secondNumber)
        }
        break
      case '%':
        if(firstNumber && !secondNumber && !operator) {
          firstNumber = convertDecimal(+firstNumber).toString().replace('.', ',')
          displayScreen(firstNumber)
        }

        if(firstNumber && secondNumber && operator) {
          secondNumber = convertDecimal(+secondNumber).toString().replace('.', ',')
          displayScreen(secondNumber)
        }
        break
      case '+':
      case '-':
      case 'x':
      case '÷':
        if(firstNumber && !operator) operator = text
        break
      case '=':
        if (firstNumber && secondNumber && operator) operate()
        break
      default:
        if(!operator){
          firstNumber += text
          displayScreen(firstNumber.replace('.', ','))
          clear.innerText = "C"
        }

        if(firstNumber && operator){
          secondNumber += text
          displayScreen(secondNumber.replace('.', ','))
        }
    }
  });
});


// TODO: Do point 7

// FIXME: add margin o padding to center the numbers in screen
// FIXME: when you change an operator for other always takes the first one
// FIXME: fix the ',' to have the expected behavior 
