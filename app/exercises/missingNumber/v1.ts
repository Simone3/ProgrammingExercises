import { SpecialInt } from './common';

/**
 * An array A contains all the integers from O to n, except for one number which is missing.
 * In this problem, we cannot access an entire integer in A with a single operation.
 * The elements of A are represented in binary, and the only operation we can use to access them is "fetch the jth bit of A[i]"" which takes constant time.
 * This function finds the missing integer.
 * T = O(N logN)
 * S = O(1)
 * @param numbers the array of numbers
 * @returns the missing number
 */
export const missingNumberV1 = (numbers: SpecialInt[]): number => {

	// N is for sure the array length
	const maxNumber = numbers.length;

	// The sum of all integers between 0 and N is known
	const sum = maxNumber * (maxNumber + 1) / 2;

	// The number of bits needed to represent numbers up to N is known
	const numberOfBits = Math.ceil(Math.log2(maxNumber + 1));

	// Compute bit-by-bit sum of all numbers
	let sumWithoutMissing = 0;
	for(const number of numbers) {

		for(let bit = 0; bit <= numberOfBits; bit++) {

			if(number.getBit(bit) === 1) {

				sumWithoutMissing += Math.pow(2, bit);
			}
		}
	}

	// Missing number is the one that did not appear in the sum
	return sum - sumWithoutMissing;
};
