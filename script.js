let firstNumber = '', secondNumber = '', operator = '', result = 0

const sum = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => b !== 0 ? a / b : 'Error'
const convertDecimal = num => num / 100
const convertOperant = num => num * (-1)

const formatNumber = num => num.toString().replace('.', ',');
const parseNumber = num => +(num.replace(',', '.'));

const displayScreen = number => display.innerText = number

const operate = () => {
  const num1 = parseNumber(firstNumber)
  const num2 = parseNumber(secondNumber)

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
  const resultFixed = result !== 'Error' ? +(result.toFixed(3)) : "Error";

  firstNumber = formatNumber(resultFixed)
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
        if(firstNumber && !operator && !secondNumber) {  
          firstNumber = formatNumber(convertOperant(parseNumber(firstNumber)))
          displayScreen(firstNumber)
        }

        if(firstNumber && operator && secondNumber) {
          secondNumber = formatNumber(convertOperant(parseNumber(secondNumber)))
          displayScreen(secondNumber)
        }
        break
      case '%':
        if(firstNumber && !operator && !secondNumber) {
          firstNumber = formatNumber(convertDecimal(parseNumber(firstNumber)))
          displayScreen(firstNumber)
        }

        if(firstNumber && operator && secondNumber) {
          secondNumber = formatNumber(convertDecimal(parseNumber(secondNumber)))
          displayScreen(secondNumber)
        }
        break
      case '+':
      case '-':
      case 'x':
      case '÷':
        if(firstNumber && !operator) operator = text
        if(firstNumber && operator && secondNumber ) operate()
        operator = text
        break
      case '=':
        if (firstNumber && operator && secondNumber) operate()
        break
      case ',':
        if (!operator) {
          firstNumber = firstNumber.includes(',') ? firstNumber : (firstNumber || '0') + ',';
        } else {
          secondNumber = secondNumber.includes(',') ? secondNumber : (secondNumber || '0') + ',';
        }
        displayScreen(operator ? secondNumber : firstNumber);
        break
      default:
        if(text === '0' && !firstNumber) return
        
        if(!operator){
          firstNumber += text
          displayScreen(formatNumber(firstNumber))
          clear.innerText = "C"
        }

        if(operator){
          secondNumber += text
          displayScreen(formatNumber(secondNumber))
        }
    }
  })
})




// TODO: Add keyboard support!
// FIXME: fix when you press an operator, then a number a finally and operator again, unexpected behavior