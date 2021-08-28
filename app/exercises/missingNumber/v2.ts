import { setBit } from '../../helpers/binary';
import { SpecialInt } from './common';

/**
 * An array A contains all the integers from O to n, except for one number which is missing.
 * In this problem, we cannot access an entire integer in A with a single operation.
 * The elements of A are represented in binary, and the only operation we can use to access them is "fetch the jth bit of A[i]"" which takes constant time.
 * This function finds the missing integer.
 * T = O(N)
 * S = O(N)
 * @param numbers the array of numbers
 * @returns the missing number
 */
export const missingNumberV2 = (numbers: SpecialInt[]): number => {

	// N is for sure the array length
	const maxNumber = numbers.length;

	// The number of bits needed to represent numbers up to N is known
	const numberOfBits = Math.ceil(Math.log2(maxNumber + 1));

	// Loop each bit
	let result = 0;
	let currentNumbers = numbers;
	for(let bit = 0; bit <= numberOfBits; bit++) {

		// Loop current numbers (bit 0 loops N numbers, bit 1 loops N/2 numbers, etc.) and split them based on the current bit value
		const numbersWithCurrentBitZero = [];
		const numbersWithCurrentBitOne = [];
		for(const number of currentNumbers) {

			if(number.getBit(bit) === 0) {

				numbersWithCurrentBitZero.push(number);
			}
			else {

				numbersWithCurrentBitOne.push(number);
			}
		}

		if(numbersWithCurrentBitZero.length > numbersWithCurrentBitOne.length) {

			// There are more numbers with current bit equal to 0 than numbers with current bit equal to 1, missing number is in the 0s half
			currentNumbers = numbersWithCurrentBitOne;
			result = setBit(result, bit);
		}
		else {

			// Otherwise, missing number is in the 1s half
			currentNumbers = numbersWithCurrentBitZero;
		}
	}

	return result;
};
