let firstNumber = '', secondNumber = '', operator = '', result = null


const OPERATORS = ['+', '-', 'x', '÷', '*', '/']
const DELETE_OPERATORS = ['AC', 'C']
const CONVERSION_OPERATORS = ['+/-', '%']
const OPERATORS_KEY_MAP = { '*': 'x', '/': '÷' }

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
  const resultFixed = result !== 'Error' ? Number(result.toFixed(3)) : "Error"

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

const handleInput = (text) => {

  if (result !== null) {
    firstNumber = OPERATORS.includes(text) ? formatNumber(result) : firstNumber
    secondNumber = ''
    operator = ''
    result = null
  }

  if( OPERATORS.includes(text) && !firstNumber && !secondNumber  ) {
    if (text === '-') {
      firstNumber = '-'
      displayScreen(firstNumber)
    }
    return
  }
  
  if (text === '-' && firstNumber && operator && !secondNumber) {
    secondNumber = '-'
    displayScreen(secondNumber)
    return
  }

  const findElement = (element) => element === text

  switch(text) {
    case DELETE_OPERATORS.find(findElement):
      if(text === 'C') clear.innerText = 'AC'
      firstNumber = ''
      secondNumber = ''
      operator = ''
      displayScreen(0)
      break
    case CONVERSION_OPERATORS.find(findElement):
      const conversionFunction = text === '+/-' ? convertOperant : convertDecimal

      if (firstNumber && !operator && !secondNumber) {
        firstNumber = formatNumber(conversionFunction(parseNumber(firstNumber)))
        displayScreen(firstNumber)
      }

      if (firstNumber && operator && secondNumber) {
        secondNumber = formatNumber(conversionFunction(parseNumber(secondNumber)))
        displayScreen(secondNumber)
      }

      break
    case OPERATORS.find(findElement):
      if(firstNumber && !operator) operator = text
      if(firstNumber && operator && secondNumber ) operate()
      operator = text
      break
    case '=':
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

[...buttons].forEach(button => {
  button.addEventListener('click', ({target: {innerText: text}}) => handleInput(text))
})

// Keyboard support
document.addEventListener('keydown', ({ key }) => {
  try {
    if (/^[0-9]$/.test(key)) return handleInput(key)

    switch (key) {
      case ',':
        return handleInput(',')
      case 'Backspace':
        return handleInput('C')
      case 'Enter':
        return handleInput('=')
      default:
        if (Object.hasOwn(OPERATORS_KEY_MAP, key)) {
          return handleInput(OPERATORS_KEY_MAP[key] ?? key)
        }

        throw new Error(`Tecla no válida: ${key}`)
    }
  } catch (error) {
    console.error(error.message)
  }
})