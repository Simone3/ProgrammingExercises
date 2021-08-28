/**
 * Adds two numbers without using + or any arithmetic operators.
 * Assumes 32-bit integers whose sum is still a valid 32-bit integer.
 * @param first first number
 * @param second second number
 * @returns the sum
 */
export const addWithoutPlusV2 = (first: number, second: number): number => {
	
	if(second === 0) {

		return first;
	}

	// Add without carrying, i.e. perform a XOR operation
	const sumWithoutCarry = first ^ second;

	// Compute the carry, i.e. perform a shifted AND operation
	const carry = (first & second) << 1;

	// Recurse by summing the two partial results
	return addWithoutPlusV2(sumWithoutCarry, carry);
};
