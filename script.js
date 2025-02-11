let firstNumber = '', secondNumber = '', operator = '', result = 0


const OPERATORS = ['+', '-', 'x', '÷', '*', '/']

const sum = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => b !== 0 ? a / b : 'Error'
const convertDecimal = num => num / 100
const convertOperant = num => num * (-1)

const formatNumber = num => String(num).replace('.', ',')
const parseNumber = num => Number(num.replace(',', '.'))

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
  const resultFixed = result !== 'Error' ? +(result.toFixed(3)) : "Error"

  firstNumber = formatNumber(resultFixed)
  displayScreen(firstNumber)
  secondNumber = ''
  operator = '' 
}

//handle DOM
const display = document.querySelector('#display')
const clear = document.querySelector('#clear')
const buttons = document.querySelectorAll('.buttons')

displayScreen(0)
clear.innerText = 'AC'
const buttonsArray = [...buttons]

const handleInput = (text) => {

  if(result !== 0) {
    firstNumber = ''
    secondNumber = ''
    operator = ''
    result = 0
  }
  
  if( OPERATORS.includes(text) && !firstNumber && !secondNumber) {
    return
  }

  switch(text) {
    case ['AC', 'C'].find(clearText => clearText === text):
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
    case OPERATORS.find(operator => operator === text):
      if(firstNumber && !operator) operator = text
      if(firstNumber && operator && secondNumber ) operate()
      operator = text
      break
    case '=':
    case 'Enter':
      if (firstNumber && operator && secondNumber) operate()
      break
    case ',':
      if (!operator) {
        firstNumber = firstNumber.includes(',') ? firstNumber : (firstNumber || '0') + ','
      } else {
        secondNumber = secondNumber.includes(',') ? secondNumber : (secondNumber || '0') + ','
      }
      displayScreen(operator ? secondNumber : firstNumber)
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
}

buttonsArray.forEach(button => {
  button.addEventListener('click', ({target: {innerText: text}}) => handleInput(text))
})

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key

  switch (true) {
    case /[0-9]/.test(key):
      handleInput(key)
      break
    case key === ',':
      handleInput(',')
      break
    case key === 'Backspace':
      handleInput('C')
      break
    case key === 'Enter' || key === '=':
      handleInput('=')
      break
    case OPERATORS.includes(key):
      const operatorMap = { '*': 'x', '/': '÷' }
      handleInput(operatorMap[key] || key)
      break
    default:
      console.log(`Tecla no manejada: ${key}`)
  }
})