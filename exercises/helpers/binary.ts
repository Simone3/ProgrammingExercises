/**
 * Transforms a number from decimal to binary notation (negative numbers are in two's complement)
 * @param decimalNumber the decimal number
 * @returns the binary number (as a string)
 */
export const toBinary = (decimalNumber: number): string => {
	
	if(decimalNumber >= 0) {

		const toString = decimalNumber.toString(2);
		return toString.padStart(32, '0');
	}
	else {

		return (decimalNumber >>> 0).toString(2);
	}
};

/**
 * Transforms a number from binary to decimal notation (if the binary number starts with a 1, it is considered a negative number in two's complement)
 * @param binaryNumber the binary number (as a string)
 * @returns the decimal number
 */
export const toDecimal = (binaryNumber: string): number => {
	
	if(binaryNumber[0] === '1') {

		return ~~parseInt(binaryNumber, 2);
	}
	else {
	
		return parseInt(binaryNumber, 2);
	}
};

/**
 * Gets the i-th bit in the binary representation of num
 * @param num the source number
 * @param i the bit index
 * @returns the value of the i-th bit
 */
export const getBit = (num: number, i: number): number => {
	
	const mask = 0b1 << i;
	return (num & mask) === 0 ? 0 : 1;
};

/**
 * Sets the i-th bit to 1 in the binary representation of num
 * @param num the source number
 * @param i the bit index
 * @returns the new number
 */
export const setBit = (num: number, i: number): number => {

	const mask = 0b1 << i;
	return num | mask;
};

/**
 * Sets the i-th bit to 0 in the binary representation of num
 * @param num the source number
 * @param i the bit index
 * @returns the new number
 */
export const clearBit = (num: number, i: number): number => {

	const mask = ~(0b1 << i);
	return num & mask;
};

/**
 * Sets the i-th bit to val in the binary representation of num
 * @param num the source number
 * @param i the bit index
 * @param val 0 or 1
 * @returns the new number
 */
export const updateBit = (num: number, i: number, val: number): number => {

	return val ? setBit(num, i) : clearBit(num, i);
};
