let firsNumber, secondNumber, operator

const sum = (a, b ) => a + b
const subtract = (a, b ) => a - b
const multiply = (a, b ) => a * b
const divide = (a, b ) => a / b


const operate = (num1, num2) => {
  console.log(num1, num2)
}

operate(3, 4)

//Events
const display = document.querySelector('#display')
const buttons = document.querySelectorAll('.buttons')

const buttonsArray = [...buttons]

buttonsArray.forEach(button => {
  button.addEventListener('click', (e) => {
    display.innerText += e.target.innerText
    console.log( typeof +display)
  });
});
