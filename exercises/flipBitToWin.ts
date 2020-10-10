import { toBinary } from './helpers/binary';

/**
 * Computes the longest sequence of 1s in the binary representation of a number that can be optaining by flipping at most one bit
 * @param number the source number
 * @returns the longest sequence of 1s with at most one bit flipped
 */
const flipBitToWin = (number: number): number => {

	let maxSoFar = 0;
	let firstCount = 0;
	let secondCount = 0;

	// Transform the number to a binary string and loop all bits starting from the first
	const binary = toBinary(number);
	for(const bit of binary) {

		// If the current bit is 0, the previous sequence of 1s (firstCount) is done and the current sequence of 1s (new firstCount) continues (from secondCount)
		if(bit === '0') {

			if(firstCount > maxSoFar) {

				maxSoFar = firstCount;
			}

			firstCount = secondCount + 1;

			secondCount = 0;
		}

		// If the current bit is 1, both counts continue
		else {

			firstCount += 1;
			secondCount += 1;
		}
	}

	// Check last sequence of 1s
	if(firstCount > maxSoFar) {

		maxSoFar = firstCount;
	}

	return maxSoFar;
};

const flipBitToWinV2 = (number: number): number => {

	if(number === 0) {

		return 1;
	}

	let maxSoFar = 0;
	let firstCount = 0;
	let secondCount = 0;
	const firstBitMask = 0b1 << 31;

	// Right shift by 1 the number until it becomes 0 (i.e. loop all bits starting from the first)
	while(number !== 0) {

		// If the current bit is 0, the previous sequence of 1s (firstCount) is done and the current sequence of 1s (new firstCount) continues (from secondCount)
		if((number & firstBitMask) === 0) {

			if(firstCount > maxSoFar) {

				maxSoFar = firstCount;
			}

			firstCount = secondCount + 1;

			secondCount = 0;
		}

		// If the current bit is 1, both counts continue
		else {

			firstCount += 1;
			secondCount += 1;
		}

		number <<= 1;
	}

	// Check last sequence of 1s
	if(firstCount > maxSoFar) {

		maxSoFar = firstCount;
	}

	return maxSoFar;
};

const tests = [
	0b00000010011000000000001010100101,
	0b00000010011010000000001010100101,
	0b00000010011000000000001010101101,
	0b11010010011000000000001010100101,
	0b00001010011110100000001010100101,
	0b00001010010010100000001000111100,
	0b10000101000101010000000100011110,
	0b00000000000000000000000000000001,
	0b00000000000000000100000000000000,
	0b11111111111111111111111111111111,
	0b00000000000000000000000000000000
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${toBinary(test)} (${test}) -> ${flipBitToWin(test)}`);
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${toBinary(test)} (${test}) -> ${flipBitToWinV2(test)}`);
}
