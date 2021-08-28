/**
 * Helper to get the number of digits of a decimal number
 * @param number the number
 * @returns the number of digits
 */
const getDigitsNumber = (number: number): number => {

	return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
};

/**
 * Helper to get the i-th digit of a decimal number
 * @param number the number
 * @param index the digit index (0 = leftmost digit)
 * @param digitsCount the total number of digits to consider (e.g. if number = 8, index = 0, digitsCount = 3 -> it returns 0 because the number is considered to be 008)
 * @returns the value of the i-th digit
 */
const getDigitValue = (number: number, index: number, digitsCount: number): number => {

	return Math.floor((Math.abs(number) / Math.pow(10, digitsCount - index - 1)) % 10);
};

/**
 * Helper for radixSort()
 * @param array the array
 * @param digitIndex the current digit index
 * @param digitsCount the total number of digits to consider
 */
export const radixSortHelper = (array: number[], digitIndex: number, digitsCount: number): void => {

	// Put all values on buckets corresponding to the current digit values (considering negatives: 0 means -9, 1 means -8, ..., 9 means 0, ...)
	const buckets: number[][] = [];
	for(const value of array) {

		const digitValue = getDigitValue(value, digitIndex, digitsCount);
		const bucketIndex = value < 0 ? -digitValue + 9 : digitValue + 9;

		if(buckets[bucketIndex]) {

			buckets[bucketIndex].push(value);
		}
		else {

			buckets[bucketIndex] = [ value ];
		}
	}

	// Loop all buckets (ordered by construction)
	let current = 0;
	for(let i = 0; i < buckets.length; i++) {

		const bucket = buckets[i];
		if(bucket) {

			// Recurse on the bucket's list if there is more than 1 element
			if(bucket.length > 1) {

				radixSortHelper(bucket, digitIndex + 1, digitsCount);
			}

			// Add the sorted bucket values to the resulting array
			for(const bucketValue of bucket) {

				array[current] = bucketValue;
				current += 1;
			}
		}
	}
};

/**
 * Readix sort implementation. Works only for integer values.
 * T = O(k N) where k is the number of passes
 * S = O(N)
 * @param array the array
 */
export const radixSort = (array: number[]): void => {

	if(array.length > 1) {

		// First pass to compute the number of required digits
		let longestDigitsNumber = 1;
		for(const value of array) {

			const digitsNumber = getDigitsNumber(value);
			if(digitsNumber > longestDigitsNumber) {

				longestDigitsNumber = digitsNumber;
			}
		}

		// Call helper with the whole array
		radixSortHelper(array, 0, longestDigitsNumber);
	}
};
