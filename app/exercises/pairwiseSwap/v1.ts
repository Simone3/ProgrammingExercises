/**
 * Swap odd and even bits in the given integer (e.g., bit 0 and bit 1 are swapped, bit 2 and bit 3 are swapped, and so on)
 * @param number the number
 * @returns the number with swapped bits
 */
export const pairwiseSwap = (number: number): number => {

	// Get the left parts of the pairs by shifting left and keeping only the odd values
	const shiftedLeft = number << 1;
	const pairsLeft = shiftedLeft & 0b10101010101010101010101010101010;

	// Get the right parts of the pairs by shifting right and keeping only the even values
	const shiftedRight = number >> 1;
	const pairsRight = shiftedRight & 0b01010101010101010101010101010101;

	// The final number with swapped pairs is the OR of the two parts
	return pairsLeft | pairsRight;
};
