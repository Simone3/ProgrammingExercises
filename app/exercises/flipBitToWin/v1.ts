import { toBinary } from '../../helpers/binary';

/**
 * Computes the longest sequence of 1s in the binary representation of a number that can be optaining by flipping at most one bit
 * @param number the source number
 * @returns the longest sequence of 1s with at most one bit flipped
 */
export const flipBitToWin = (number: number): number => {

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
