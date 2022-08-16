/**
 * Finds the smallest K numbers in an array
 * @param array the source array
 * @param count the number of elements to find (K)
 * @returns the K smallest numbers
 *
 * T = O(N * log N)
 * S = O(N)
 */
export const getSmallestV1 = (array: number[], count: number): number[] => {

	if(count <= 0 || count > array.length) {

		throw Error('Invalid number of elements!');
	}
	
	if(count === array.length) {

		return [ ...array ];
	}

	// Simply sort the array and pick the first K elements
	return [ ...array ].sort((a, b) => {
		return a - b;
	}).slice(0, count);
};
