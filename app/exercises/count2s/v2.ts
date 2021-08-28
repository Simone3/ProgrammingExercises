/**
 * Counts the number of 2s between O and N
 * T = O(log N)
 * S = O(1)
 * @param maxNumber N
 * @returns the number of 2s
 */
export const count2sV2 = (maxNumber: number): number => {

	let count = 0;

	// Loop all powers of ten in maxNumber (1, 10, 100, etc.)
	let powerOfTen = 1;
	while(powerOfTen <= maxNumber) {

		// Compute some helper numbers based on the current power of ten
		const remainderFactor = powerOfTen * 10;
		const remainder = maxNumber - remainderFactor * Math.floor(maxNumber / remainderFactor);
		const roundFigure = maxNumber - remainder;
		const remainderMax = powerOfTen;
		const remainderThreshold = 2 * remainderMax;

		// Add to the count all "full" rounds of the current power of ten (2 is once every 10, 20 is 10 times every 100, 200 is 100 times every 1000, etc.)
		count += roundFigure / 10;

		// If the remainder is greater than the current threshold (2, 20, 200, etc.), add the remaining elements to the count
		if(remainder >= remainderThreshold) {

			count += Math.min(remainderMax, remainder - remainderThreshold + 1);
		}

		powerOfTen = remainderFactor;
	}
	return count;
};
