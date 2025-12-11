
      // State calculator
      let currentInput = "0";
      let operator = null;
      let previousValue = null;
      let shouldResetInput = false;

      const prevDisplay = document.getElementById("prevDisplay");
      const currentDisplay = document.getElementById("currentDisplay");

      function updateDisplay() {
        currentDisplay.innerText = currentInput;

        if (previousValue !== null && operator) {
          prevDisplay.innerText = `${previousValue} ${operator}`;
        } else {
          prevDisplay.innerText = "";
        }
      }

      function pressButton(value) {
        if (value === "clr") {
          currentInput = "0";
          operator = null;
          previousValue = null;
          shouldResetInput = false;
        } else if (value === "DEL") {
          if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
          } else {
            currentInput = "0";
          }
        } else if (value === "=") {
          if (operator && previousValue !== null) {
            try {
              const num = parseFloat(currentInput);
              let result;

              if (operator === "+") {
                result = previousValue + num;
              } else if (operator === "-") {
                result = previousValue - num;
              } else if (operator === "*") {
                result = previousValue * num;
              } else if (operator === "/") {
                if (num === 0) {
                  currentInput = "Error";
                  operator = null;
                  previousValue = null;
                  shouldResetInput = false;
                  updateDisplay();
                  return;
                }
                result = previousValue / num;
              } else if (operator === "%") {
                result = previousValue % num;
              }

              if (Number.isInteger(result)) {
                currentInput = result.toString();
              } else {
                currentInput = result.toFixed(8).replace(/\.?0+$/, "");
              }

              operator = null;
              previousValue = null;
              shouldResetInput = true;
            } catch (e) {
              currentInput = "Error";
              operator = null;
              previousValue = null;
              shouldResetInput = false;
            }
          }
        } else if (["+", "-", "*", "/", "%"].includes(value)) {
          if (currentInput !== "Error") {
            // Jika sudah ada operator sebelumnya dan sudah input angka baru, hitung dulu
            if (operator && previousValue !== null && !shouldResetInput) {
              const num = parseFloat(currentInput);
              let result;

              if (operator === "+") {
                result = previousValue + num;
              } else if (operator === "-") {
                result = previousValue - num;
              } else if (operator === "*") {
                result = previousValue * num;
              } else if (operator === "/") {
                if (num === 0) {
                  currentInput = "Error";
                  operator = null;
                  previousValue = null;
                  shouldResetInput = false;
                  updateDisplay();
                  return;
                }
                result = previousValue / num;
              } else if (operator === "%") {
                result = previousValue % num;
              }

              if (Number.isInteger(result)) {
                currentInput = result.toString();
              } else {
                currentInput = result.toFixed(8).replace(/\.?0+$/, "");
              }

              previousValue = result;
            } else {
              previousValue = parseFloat(currentInput);
            }

            operator = value;
            shouldResetInput = true;
          }
        } else {
          // Input angka atau titik
          if (
            shouldResetInput ||
            currentInput === "0" ||
            currentInput === "Error"
          ) {
            if (value === ".") {
              currentInput = "0.";
            } else {
              currentInput = value;
            }
            shouldResetInput = false;
          } else {
            if (value === "." && currentInput.includes(".")) {
              return;
            }
            currentInput += value;
          }
        }

        updateDisplay();
      }

      updateDisplay();
   