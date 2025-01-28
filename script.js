const display = document.querySelector(".display");

const updateDisplay = (value) => {
  if (typeof value === "number") {
    if (value.toString().length > 10) {
      display.textContent = value.toExponential(5);
    } else {
      display.textContent = value;
    }
  } else {
    display.textContent = value;
  }
};

updateDisplay("0");

let operand1 = null;
let operand2 = null;
let operator = null;

const allClear = () => {
  operand1 = null;
  operand2 = null;
  operator = null;
  updateDisplay("0");
};

const processDigit = (digit) => {
  if (operator === null) {
    operand1 = operand1 === null || operand1 === "0" ? digit : operand1 + digit;
    updateDisplay(parseFloat(operand1));
  } else {
    operand2 = operand2 === null || operand1 === "0" ? digit : operand2 + digit;
    updateDisplay(parseFloat(operand2));
  }
};

const processDot = () => {
  if (operator === null) {
    if (operand1 === null) {
      operand1 = "0.";
    } else if (!operand1.includes(".")) {
      operand1 += ".";
    } else {
      console.log("Error");
      allClear();
      updateDisplay("Err: more than 1 .");
      return;
    }
    updateDisplay(operand1);
  } else {
    if (operand2 === null) {
      operand2 = "0.";
    } else if (!operand2.includes(".")) {
      operand2 += ".";
    } else {
      allClear();
      updateDisplay("Err: more than 1 .");
      return;
    }
    updateDisplay(operand2);
  }
};

const processOperator = (op) => {
  if (operand1 === null) {
    operand1 = 0;
    operator = op;
    return;
  }

  if (operand2 !== null) {
    const result = processEquals();
    if (result === null) {
      return;
    }
    operand1 = result;
  }

  operator = op;
};

const processEquals = () => {
  if (operand1 === null || operator === null || operand2 === null) {
    return;
  }

  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);

  let result = null;
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "*":
      result = operand1 * operand2;
      break;
    case "/":
      if (operand2 === 0) {
        allClear();
        updateDisplay("Err: divide by 0");
        return null;
      }
      result = operand1 / operand2;
      break;
    default:
      processError();
      return null;
  }

  operand1 = result;
  operand2 = null;
  operator = null;

  updateDisplay(result);

  return result;
};

const handleInput = (input) => {
  switch (input) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      processDigit(input);
      break;
    case ".":
      processDot();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      processOperator(input);
      break;
    case "AC":
      allClear();
      break;
    case "=":
      processEquals();
      break;
    default:
      processError();
  }
};

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.textContent);
  });
});

const processError = () => {
  allClear();
  updateDisplay("Something went wrong");
};
