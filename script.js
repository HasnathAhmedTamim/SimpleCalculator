class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;

    this.clear();
  }
  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // compute() {
  //   let computation;
  //   const prev = parseFloat(this.previousOperand);
  //   const current = parseFloat(this.currentOperand);

  //   if (isNaN(prev) || isNaN(current)) return;
  //   switch (this.operation) {
  //     case "+":
  //       computation = prev + current;
  //       break;
  //     case "-":
  //       computation = prev - current;
  //       break;
  //     case "*":
  //       computation = prev * current;
  //       break;
  //     case "÷":
  //       computation = prev / current;
  //       break;

  //     default:
  //       return;
  //   }
  //   this.currentOperand = computation;
  //   this.operation = undefined;
  //   this.previousOperand = "";
  // }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;

      default:
        return;
    }

    // Convert the result to a string to handle decimal points correctly
    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNum = number.toString();
    const intDigits = parseFloat(stringNum.split(".")[0]);
    const decimalDigits = stringNum.split(".")[1];

    let integerDisplay;
    if (isNaN(intDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

//query selector all
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-prev-op]");
const currentOperandTextElement = document.querySelector("[data-cur-op]");

// create a calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//  numberButtons is an array of button elements
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Assuming calculator is an object with appendNumber and updateDisplay methods
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// operationButtons is an array of button elements
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Assuming calculator is an object with appendNumber and updateDisplay methods
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//equals-buttons
equalsButton.addEventListener("click", (button) => {
  //
  calculator.compute();
  calculator.updateDisplay();
});

// all clear
allClearButton.addEventListener("click", (button) => {
  //
  calculator.clear();
  calculator.updateDisplay();
});

// del
deleteButton.addEventListener("click", (button) => {
  //
  calculator.delete();
  calculator.updateDisplay();
});

const select = document.querySelector("select");
const html = document.querySelector(".calculator-grid");

select.addEventListener("change", (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const choice = select.value;

  switch (choice) {
    case "black":
      update("black", "white");
      break;
    case "white":
      update("white", "black");
      break;
    case "purple":
      update("purple", "white");
      break;
    case "yellow":
      update("yellow", "purple");
      break;
    case "psychedelic":
      update("lime", "purple");
      break;
    case "reload":
      update(window.location.reload());
      break;
  }
});
function update(bgColor, textColor) {
  html.style.backgroundColor = bgColor;
  html.style.color = textColor;
}
