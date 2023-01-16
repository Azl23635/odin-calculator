function calcLogicHandler(key, type) {
  let inputArr = [];
  let prevInput = 0;
  let currInput = 0;
  let op = 0;

  if (type === 'ac') {
    (prevInput = 0), (currInput = 0), (op = 0), (inputArr.length = 0);
  } else if (type === 'del') {
    if (!inputArr.length) {
      inputArr.pop();
    }
  } else if (type === 'op') {
    if (!prevInput) {
      //No prev input
      if (inputArr.length) {
        //Valid current user input ------ Ex:  10 *
        prevInput = parseInt(inputArr.join(''));
        inputArr.length = 0;
      }
    } else {
      //Valid previous input
      if (inputArr.length) {
        //Valid current user input ------ Ex:  10 * 10 *
        prevInput = calcOperationHandler(
          prevInput,
          parseInt(inputArr.join(''))
        );
        currInput = prevInput;
        inputArr.length = 0;
      }
    }
    //No prev or current user input ------ Ex: *   OR   10 * *  OR   10 * 10 * *
    op = key;
  } else if (type === 'num') {
    inputArr.push(key);
  } else if (type === 'equals') {
  }
}
function calcOperationHandler(valOne, valTwo, op) {}
function btnClickHandler(e) {
  let type = null;
  switch (e.target.id) {
    case 'ac':
      type = 'ac';
      break;
    case 'del':
      type = 'del';
      break;
    case '+' || '-' || '/' || '*':
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

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => btnClickHandler(e));
});
