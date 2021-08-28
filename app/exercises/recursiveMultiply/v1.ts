
/**
 * Multiplies two numbers without using the * operator. Assumes that the result will not overflow 32 bits.
 * @param firstNumber the first number
 * @param secondNumber the second number
 * @returns the multiplied number
 */
export const recursiveMultiply = (firstNumber: number, secondNumber: number): number => {

	if(firstNumber === 0) {

		return 0;
	}

	let currentValue;
	if((firstNumber & 0b1) === 0) {

		currentValue = 0;
	}
	else {

		currentValue = secondNumber;
	}

	return currentValue + recursiveMultiply(firstNumber >> 1, secondNumber << 1);
};

