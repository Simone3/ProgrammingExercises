import { toBinary } from './helpers/binary';

/**
 * Given a two positive integers, returns the number of bits that need to be flipped in the first to obtain the second
 * @param firstNumber the first positive integer
 * @param secondNumber the second positive integer
 * @returns the number of bits that need to be flipped
 */
const binaryConversion = (firstNumber: number, secondNumber: number): number => {

	// Simply XOR the numbers and count the 1s -> that's the number of bits that need to be flipped
	let result = 0;
	let xorResult = firstNumber ^ secondNumber;
	for(let i = 0; i < 31; i++) {

		if((xorResult & 1) !== 0) {

			result += 1;
		}

		xorResult >>= 1;
	}

	return result;
};

const tests = [
	[ 0b00000000000000000100000000000000, 0b00000010000000000100000000000000 ],
	[ 0b00000000000000000100000000000000, 0b00000010000000000000000000000000 ],
	[ 0b00100010000000000100000000010000, 0b00100000001000000100000000010001 ],
	[ 0b00100000001000000100000000010001, 0b00100000001000000100000000010001 ],
	[ 0b01111111111111111111111111111111, 0b00000000000000000000000000000000 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const result = binaryConversion(test[0], test[1]);
	console.log(`${toBinary(test[0])}, ${toBinary(test[1])} -> ${result}`);
}
