let firsNumber, secondNumber, operator, result

const sum = (a, b ) => a + b
const subtract = (a, b ) => a - b
const multiply = (a, b ) => a * b
const divide = (a, b ) => a / b


const operate = (num1, num2) => {

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
    default:      
      result = divide(num1, num2)
  }
  
}

//Events
const display = document.querySelector('#display')
const buttons = document.querySelectorAll('.buttons')

const buttonsArray = [...buttons]

buttonsArray.forEach(button => {
  button.addEventListener('click', ({target: {innerText: text}}) => {

    switch(text) {
      case 'AC':
        display.innerText = ''
        firsNumber = 0
        secondNumber = 0
        break
      case '+':
      case '-':
      case '*':
      case '/':
        display.innerText = text
        operator = text
        break
      case '=':
        display.innerText = ''
        display.innerText = result
        break
      default:
        display.innerText = ''
        display.innerText += text

        if(firsNumber){
          secondNumber = +text;
        }
        else{
          firsNumber = +text
        }
    }

    firsNumber && secondNumber && operate(firsNumber, secondNumber)
``
    // FIXME: fix the calculator when you have number greater than 9
    // FIXME: fix the sequence of number to have number greater than 9
    // FIXME: fix the padding in the screen
  });
});