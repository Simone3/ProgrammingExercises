import { toBinary } from './helpers/binary';

/**
 * Inserts secondNumber into secondNumber such that secondNumber starts at bit j and ends at bit i. It assumes that the bits j through i have enough space to fit all of secondNumber.
 * @param firstNumber the first number
 * @param secondNumber the second number
 * @param from the starting bit
 * @param to the ending bit
 * @returns the new number
 */
const binaryInsertionV1 = (firstNumber: number, secondNumber: number, from: number, to: number): number => {

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

const binaryInsertionV2 = (firstNumber: number, secondNumber: number, from: number, to: number): number => {

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

const tests = [
	[ 0b00000010011000000000001010100101, 0b00000000000000000000000000001101, 4, 7 ],
	[ 0b00000010011000000000001010100101, 0b00000000000000000000000000001101, 0, 3 ],
	[ 0b00000010011000000000001010100101, 0b00000000000000000000000000001101, 10, 13 ],
	[ 0b00000010011000000000001010100101, 0b00000000000000000000000000001101, 27, 30 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const insertion = binaryInsertionV1(test[0], test[1], test[2], test[3]);
	console.log(`${test[0]} (${toBinary(test[0])}) with ${test[1]} (${toBinary(test[1])}), from ${test[2]} to ${test[3]} -> ${insertion} (${toBinary(insertion)})`);
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const insertion = binaryInsertionV2(test[0], test[1], test[2], test[3]);
	console.log(`${test[0]} (${toBinary(test[0])}) with ${test[1]} (${toBinary(test[1])}), from ${test[2]} to ${test[3]} -> ${insertion} (${toBinary(insertion)})`);
}
