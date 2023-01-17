//Global Variables
let inputArr = [];
let resultArr = [];
var prevInput = 0;
var op = '';
var zeroFlag = 0;

function operationToString(op) {
  switch (op) {
    case '*':
      return '×';
    case '/':
      return '÷';
    default:
      return op;
  }
}

/*Logic for when an OPERATION key is pressed*/
function operationLogicHandler() {
  let inputInt = parseFloat(inputArr.join(''));

  if (!prevInput) {
    //No prev input
    if (inputArr.length && !zeroFlag && inputInt) {
      //Valid current user input ------ Ex:  10 *
      prevInput = inputInt;
      inputArr.length = 0;
    } else {
      prevInput = calcOperationHandler(0, inputInt, op);
      inputArr.length = 0;
      prevInput ? (zeroFlag = 1) : null;
    }
  } else {
    //Valid previous input
    if (inputArr.length) {
      //Valid current user input ------ Ex:  10 * 10 *
      prevInput = calcOperationHandler(prevInput, inputInt, op);
      !prevInput ? (zeroFlag = 1) : null;
      inputArr.length = 0;
    }
  }
}
/*Range checker, formatter, logic checker ---- post OPERATION*/
function postOperationLogicHandlerAndRangeChecker(key, noInputFlag) {
  if (
    prevInput < 1 * Math.pow(10, 20) &&
    (prevInput > 1 * Math.pow(10, -20) ||
      (prevInput < -1 * Math.pow(10, -20) &&
        prevInput > -1 * Math.pow(10, 20))) &&
    !noInputFlag
  ) {
    op = key;
    bottomScreen.textContent = '';
    if (prevInput.toString().length >= 8) {
      topScreen.textContent =
        Number(prevInput).toExponential(3) +
        ' ' +
        operationToString(key);
    } else {
      topScreen.textContent =
        prevInput + ' ' + operationToString(key);
    }
  } else if (noInputFlag) {
  } else {
    prevInput = 0;
    op = '';
    inputArr.length = 0;
    topScreen.textContent = '';
    bottomScreen.textContent = 'Out of Range';
  }
}

/*Range checker, formatter, logic checker ---- post EQUALS*/
function equalsLogicHandlerAndRangeChecker(tmp, tmpFloat) {
  if (
    (tmp !== 'Infinity' || tmp !== '-Infinity') &&
    tmpFloat < 1 * Math.pow(10, 20) &&
    (tmpFloat >= 1 * Math.pow(10, -20) ||
      (tmpFloat <= -1 * Math.pow(10, -20) && // less than .0001
        tmpFloat > -1 * Math.pow(10, 20)))
  ) {
    inputArr = tmp.split('');
    if (tmp.length < 8) {
      bottomScreen.textContent = parseFloat(
        inputArr.join('')
      ).toFixed(2);
    } else {
      bottomScreen.textContent = parseFloat(
        inputArr.join('')
      ).toExponential(3);
    }
  } else if (
    tmpFloat >= 1 * Math.pow(10, 20) ||
    (tmpFloat <= 1 * Math.pow(10, -20) &&
      tmpFloat >= -1 * Math.pow(10, -20) &&
      tmpFloat !== 0) ||
    tmpFloat <= -1 * Math.pow(10, 20)
  ) {
    bottomScreen.textContent = 'Out of Range';
  } else if (tmpFloat == 0) {
    bottomScreen.textContent = 0;
  }
  topScreen.textContent = '';
}

/* Overarching Function ----- Handles logic for **EVERY different input type** */
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
    operationLogicHandler();
    postOperationLogicHandlerAndRangeChecker(key, noInputFlag);
  } else if (type === 'num') {
    inputArr.length < 8
      ? (inputArr.push(key),
        (bottomScreen.textContent = inputArr.join('')))
      : null;
  } else if (type === 'equals') {
    if (prevInput && inputArr.length && op) {
      let tmp = calcOperationHandler(
        prevInput,
        parseFloat(inputArr.join('')),
        op
      ).toString();
      let tmpFloat = parseFloat(tmp);
      prevInput = 0;
      inputArr.length = 0;
      equalsLogicHandlerAndRangeChecker(tmp, tmpFloat);
    }
  }
}

/* Calculator after everything is checked */
function calcOperationHandler(valOne, valTwo, op) {
  return op === '+'
    ? valOne + valTwo
    : op === '-'
    ? valOne - valTwo
    : op === '*'
    ? valOne * valTwo
    : valOne / valTwo;
}

/*Intermediary Function for easier parsing*/
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

/********** MAIN **********/
const buttons = document.querySelectorAll('.normal-btn');
const topScreen = document.querySelector('.top-screen');
const bottomScreen = document.querySelector('.bottom-screen');
/********** MAIN **********/

//Click Listener
buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => btnClickHandler(e));
});
