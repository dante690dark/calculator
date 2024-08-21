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
  const resultFixed = result !== 'Error' ? +(result.toFixed(3)) : "Error";

  firstNumber = resultFixed.toString().replace('.', ',')
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
          firstNumber = convertOperant(+(firstNumber.replace(',', '.'))).toString().replace('.', ',')
          displayScreen(firstNumber)
        }

        if(firstNumber && operator && secondNumber) {
          secondNumber = convertOperant(+(secondNumber.replace(',', '.'))).toString().replace('.', ',')
          displayScreen(secondNumber)
        }
        break
      case '%':
        if(firstNumber && !operator && !secondNumber) {
          const tempNumber = +firstNumber.replace(',', '.')
          firstNumber = convertDecimal(tempNumber).toString().replace('.', ',')
          displayScreen(firstNumber)
        }

        if(firstNumber && operator && secondNumber) {
          const tempNumber = +secondNumber.replace(',', '.')
          secondNumber = convertDecimal(tempNumber).toString().replace('.', ',')
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
          firstNumber = firstNumber.includes(',') ? firstNumber : (firstNumber || '0') + ','
          displayScreen(firstNumber)
        } else {
          secondNumber = secondNumber.includes(',') ? secondNumber : (secondNumber || '0') + ','
          displayScreen(secondNumber)
        }
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
  })
})