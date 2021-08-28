/**
 * Given a two positive integers, returns the number of bits that need to be flipped in the first to obtain the second
 * @param firstNumber the first positive integer
 * @param secondNumber the second positive integer
 * @returns the number of bits that need to be flipped
 */
export const binaryConversion = (firstNumber: number, secondNumber: number): number => {

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
