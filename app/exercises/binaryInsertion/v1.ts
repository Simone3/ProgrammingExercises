/**
 * Inserts secondNumber into secondNumber such that secondNumber starts at bit j and ends at bit i. It assumes that the bits j through i have enough space to fit all of secondNumber.
 * @param firstNumber the first number
 * @param secondNumber the second number
 * @param from the starting bit
 * @param to the ending bit
 * @returns the new number
 */
export const binaryInsertionV1 = (firstNumber: number, secondNumber: number, from: number, to: number): number => {

	// Shift "secondNumber" to align it with "firstNumber" between "from" and "to"
	const shiftedSecondNumber = secondNumber << from;

	// Build a number that contains all 1s except between "from" and "to" where "secondNumber" is contained
	let secondNumberMask = shiftedSecondNumber;
	for(let i = 0; i < from; i++) {

		secondNumberMask += Math.pow(2, i);
	}
	for(let i = to + 1; i <= 32; i++) {

		secondNumberMask += Math.pow(2, i);
	}

	// Place "secondNumber" in "firstNumber" between "from" and "to" by setting 0s by ANDing "secondNumberMask" and 1s by ORing "shiftedSecondNumber"
	return firstNumber & secondNumberMask | shiftedSecondNumber;
};

