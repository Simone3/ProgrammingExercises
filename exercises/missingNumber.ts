import { getBit, setBit } from './helpers/binary';
import { randomInteger } from './helpers/utils';

class SpecialInt {

	private readonly value: number;

	public constructor(value: number) {

		if(value < 0 || !Number.isInteger(value)) {

			throw Error(`Invalid value ${value}`);
		}

		this.value = value;
	}

	public getBit(i: number): number {

		return getBit(this.value, i);
	}

	public toString(): string {

		return String(this.value);
	}
}

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

const shuffleTest = (array: number[]): void => {
	
	for(let i = 0; i < array.length; i++) {

		const k = randomInteger(0, i);
		const temp = array[k];
		array[k] = array[i];
		array[i] = temp;
	}
};

console.log('\n\n**********************\n\n');
for(let n = 1; n <= 20; n++) {

	const allNumbers = [];
	for(let i = 0; i <= n; i++) {

		allNumbers[i] = i;
	}

	for(let i = 0; i <= n; i++) {

		const test = [ ...allNumbers ];

		const missing = test.splice(i, 1)[0];

		shuffleTest(test);

		const resultV1 = missingNumberV1(test.map((v) => {
			return new SpecialInt(v);
		}));

		const resultV2 = missingNumberV2(test.map((v) => {
			return new SpecialInt(v);
		}));

		console.log(`n = ${n} ----> {${test}} -----> V1 = ${resultV1}, V2 = ${resultV2} ${resultV1 === missing && resultV2 === missing ? '' : '!!!!!!!!'}`);
	}
}
