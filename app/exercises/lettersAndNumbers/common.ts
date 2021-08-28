/**
 * Helper to check if a character is a number
 * @param char the character
 * @returns true if it's a number
 */
export const isNumber = (char: string): boolean => {

	return char === '0' || char === '1' || char === '2' || char === '3' || char === '4' || char === '5' || char === '6' || char === '7' || char === '8' || char === '9';
};
