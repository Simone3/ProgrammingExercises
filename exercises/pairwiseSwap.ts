import { toBinary } from './helpers/binary';

/**
 * Swap odd and even bits in the given integer (e.g., bit 0 and bit 1 are swapped, bit 2 and bit 3 are swapped, and so on)
 * @param number the number
 * @returns the number with swapped bits
 */
const pairwiseSwap = (number: number): number => {

	// Get the left parts of the pairs by shifting left and keeping only the odd values
	const shiftedLeft = number << 1;
	const pairsLeft = shiftedLeft & 0b10101010101010101010101010101010;

	// Get the right parts of the pairs by shifting right and keeping only the even values
	const shiftedRight = number >> 1;
	const pairsRight = shiftedRight & 0b01010101010101010101010101010101;

	// The final number with swapped pairs is the OR of the two parts
	return pairsLeft | pairsRight;
};

const tests = [
	0b00000000000000000100000000000000,
	0b00000000000000000000000000000001,
	0b01000000000000000000000000000000,
	0b00000000000000000100100000000000,
	0b00000000000000000110000000000000,
	0b00000000000011111111000000000000,
	0b00000000000001111111100000000000,
	0b00000001000000000110000000010010,
	0b00000001000000000110000000010001,
	0b00000001000000000110000000011111,
	0b10101010101010101010101010101010,
	0b01010101010101010101010101010101,
	0b01111111111111111111111111111111,
	0b00000000000000000000000000000000
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${toBinary(test)} -> ${toBinary(pairwiseSwap(test))}`);
}
