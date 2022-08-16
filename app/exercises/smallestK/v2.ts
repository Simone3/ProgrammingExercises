/**
 * Finds the smallest K numbers in an array
 * @param array the source array
 * @param count the number of elements to find (K)
 * @returns the K smallest numbers
 *
 * T = O(N * K), i.e. O(N^2) for large K (average may be K = N/2)
 * S = O(1)
 */
export const getSmallestV2 = (array: number[], count: number): number[] => {

	if(count <= 0 || count > array.length) {

		throw Error('Invalid number of elements!');
	}
	
	if(count === array.length) {

		return [ ...array ];
	}

	const result = [];

	// Add the first K elements of the array to the temporary result
	for(let i = 0; i < count; i++) {

		result.push(array[i]);
	}

	for(let i = count; i < array.length; i++) {

		// Find the greatest element in the result array
		let greatestValue = -Infinity;
		let greatestIndex = -1;
		for(let j = 0; j < result.length; j++) {

			if(result[j] > greatestValue) {

				greatestValue = result[j];
				greatestIndex = j;
			}
		}

		// If the current element is smaller than the greatest element in the result array, replace it
		if(array[i] < greatestValue) {

			result[greatestIndex] = array[i];
		}
	}

	return result;
};
