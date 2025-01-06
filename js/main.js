// Find elements
const inputEl = document.querySelector('.input-el'),
	numbersBtn = document.querySelectorAll('.btn__number'),
	operatorsBtn = document.querySelectorAll('.btn__operators'),
	decimalBtn = document.querySelector('.btn__decimal'),
	equalsBtn = document.querySelector('.btn__equals'),
	clearBtn = document.querySelector('.btn__clear');

// Variables for storing values
let firstOperand = ''; // The first number
let secondOperand = ''; // The second number
let operator = null; // The selected operator
let waitingForSecondOperand = false; // A flag indicating if the second number is being entered

// Handle number button clicks
numbersBtn.forEach(btn => {
	btn.addEventListener('click', (e) => {
		const number = e.target.textContent;

		// If entering the second number
		if (waitingForSecondOperand) {
			secondOperand += number;
			inputEl.value = `${firstOperand} ${operator} ${secondOperand}`; // Show full expression
		} else {
			// Entering the first number
			firstOperand += number;
			inputEl.value = firstOperand; // Show the first number
		}
	});
});

// Handle operator selection
operatorsBtn.forEach(btn => {
	btn.addEventListener('click', (e) => {
		// If the first number exists and the operator is not yet selected
		if (firstOperand && !waitingForSecondOperand) {
			operator = e.target.textContent; // Save the operator
			waitingForSecondOperand = true; // Now waiting for the second number
			inputEl.value = `${firstOperand} ${operator}`; // Display the first number and operator
		}
	});
});

// Handle decimal point
decimalBtn.addEventListener('click', () => {
	if (waitingForSecondOperand) {
		// If the second number already exists, add a decimal point
		if (!secondOperand.includes('.')) {
			secondOperand += '.';
			inputEl.value = `${firstOperand} ${operator} ${secondOperand}`;
		}
	} else {
		// Add a decimal point to the first number
		if (!firstOperand.includes('.')) {
			firstOperand += '.';
			inputEl.value = firstOperand;
		}
	}
});

// Handle "=" button click
equalsBtn.addEventListener('click', () => {
	if (firstOperand && secondOperand && operator) {
		const a = parseFloat(firstOperand); // Convert strings to numbers
		const b = parseFloat(secondOperand); // Convert strings to numbers
		let result;

		// Calculate the result
		switch (operator) {
			case '+': result = a + b; break;
			case '-': result = a - b; break;
			case '*': result = a * b; break;
			case '/': result = b !== 0 ? a / b : 'Error'; break;// Prevent division by 0
			default: result = 'Error'; break;
		}

		// Display the result
		inputEl.value = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
		firstOperand = result.toString(); // Save the result as the first number
		secondOperand = ''; // Clear the second number
		operator = null; // Clear the operator
		waitingForSecondOperand = false; // Reset the flag
	}
});

// Handle "C" button click
clearBtn.addEventListener('click', () => {
	firstOperand = '';
	secondOperand = '';
	operator = null;
	waitingForSecondOperand = false;
	inputEl.value = ''; // Clear the input field
});
