
export const binaryInsertionV2 = (firstNumber: number, secondNumber: number, from: number, to: number): number => {

	// Set to 0 all bits in "firstNumber" between "from" and "to"
	const firstNumberMaskLeft = 0b11111111111111111111111111111111 << to;
	const firstNumberMaskRight = ~(0b11111111111111111111111111111111 << from);
	const firstNumberMask = firstNumberMaskLeft | firstNumberMaskRight;
	const clearedFirstNumber = firstNumber & firstNumberMask;

	// Shift "secondNumber" to align it with "firstNumber" between "from" and "to"
	const shiftedSecondNumber = secondNumber << from;

	// Place "secondNumber" in "firstNumber" between "from" and "to" by simply ORing the two partial results
	return clearedFirstNumber | shiftedSecondNumber;
};
