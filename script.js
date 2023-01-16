let inputArr = [];
let resultArr = [];
var prevInput = 0;
var op = '';

function calcLogicHandler(key, type) {
  let noInputFlag = 0;
  if (type === 'ac') {
    (prevInput = 0), (op = ''), (inputArr.length = 0);
    bottomScreen.textContent = '0';
    topScreen.textContent = '';
  } else if (type === 'del') {
    if (inputArr.length) {
      inputArr.pop();
      bottomScreen.textContent = inputArr.length
        ? inputArr.join('')
        : 0;
    }
  } else if (type === 'op') {
    let inputInt = parseFloat(inputArr.join('')).toPrecision(3);
    if (!prevInput) {
      //No prev input
      if (inputArr.length && inputInt != 0) {
        //Valid current user input ------ Ex:  10 *
        prevInput = inputInt;
        inputArr.length = 0;
      } else {
        noInputFlag = 1;
      }
    } else {
      //Valid previous input
      if (inputArr.length) {
        //Valid current user input ------ Ex:  10 * 10 *
        prevInput = calcOperationHandler(prevInput, inputInt, op);
        inputArr.length = 0;
      }
    }
    if (
      prevInput < 1 * Math.pow(10, 20) &&
      prevInput >= 1 * Math.pow(10, -20) &&
      !noInputFlag
    ) {
      op = key;
      bottomScreen.textContent = '';
      if (prevInput.toString().length >= 8) {
        topScreen.textContent =
          Number(prevInput).toExponential(3) + ' ' + key;
      } else {
        topScreen.textContent = prevInput + ' ' + key;
      }
    } else if (noInputFlag) {
    } else {
      prevInput = 0;
      op = '';
      inputArr.length = 0;
      topScreen.textContent = '';
      bottomScreen.textContent = 'Out of Range';
    }
    //No prev or current user input ------ Ex: *   OR   10 * *  OR   10 * 10 * *
  } else if (type === 'num') {
    inputArr.length < 8
      ? (inputArr.push(key),
        (bottomScreen.textContent = inputArr.join('')))
      : null;
  } else if (type === 'equals') {
    if (prevInput && inputArr.length && op) {
      let tmp = calcOperationHandler(
        prevInput,
        parseFloat(inputArr.join('')).toPrecision(3),
        op
      ).toString();
      let tmpFloat = parseFloat(tmp).toPrecision(20);
      prevInput = 0;
      inputArr.length = 0;
      if (
        tmp !== 'Infinity' &&
        tmpFloat < 1 * Math.pow(10, 20) &&
        tmpFloat > 1 * Math.pow(10, -20)
      ) {
        inputArr = tmp.split('');
        if (tmp.length < 8) {
          bottomScreen.textContent = parseFloat(
            inputArr.join('')
          ).toPrecision(2);
        } else {
          bottomScreen.textContent = parseFloat(
            inputArr.join('')
          ).toExponential(3);
        }
        console.log(inputArr);
      } else if (
        tmpFloat >= 1 * Math.pow(10, 20) ||
        (tmpFloat <= 1 * Math.pow(10, -20) &&
          tmpFloat >= -1 * Math.pow(10, -20))
      ) {
        bottomScreen.textContent = 'Out of Range';
      } else {
        bottomScreen.textContent = 'Infinity';
      }
      topScreen.textContent = '';
    }
  }
}
function calcOperationHandler(valOne, valTwo, op) {
  return op === '+'
    ? valOne + valTwo
    : op === '-'
    ? valOne - valTwo
    : op === '*'
    ? valOne * valTwo
    : valOne / valTwo;
}
function btnClickHandler(e) {
  let type = null;
  switch (e.target.id) {
    case 'ac':
      type = 'ac';
      break;
    case 'del':
      type = 'del';
      break;
    case '+':
    case '-':
    case '/':
    case '*':
      type = 'op';
      break;
    case '=':
      type = 'equals';
      break;
    default:
      type = 'num';
      break;
  }
  calcLogicHandler(e.target.id, type);
}

const buttons = document.querySelectorAll('.normal-btn');
const topScreen = document.querySelector('.top-screen');
const bottomScreen = document.querySelector('.bottom-screen');

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => btnClickHandler(e));
});
