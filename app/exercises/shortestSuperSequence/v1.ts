
/**
 * Helper to get the shortest super-sequence starting from i (array[i] IS an element of the search array by assumption)
 * @param array the longer array
 * @param searchArray the shorter array
 * @param searchMap the search map
 * @param i the index that starts the current super-sequence
 * @returns the start and end indices (inclusive) in the longer array, undefined if no super-sequence exists
 */
const shortestSuperSequenceStartingFrom = (array: number[], searchArray: number[], searchMap: {[key: number]: boolean}, i: number): [ number, number ] | undefined => {

	// Keep track of found elements and clone the search map
	let count = searchArray.length;
	const helperMap = { ...searchMap };

	for(let j = i; j < array.length; j++) {

		const curr = array[j];

		if(helperMap[curr]) {

			// Current element is in the search array, mark it as found
			helperMap[curr] = false;
			count -= 1;

			// If we found all elements, that's for sure the smallest super-sequence starting from i
			if(count === 0) {

				return [ i, j ];
			}
		}
	}

	return undefined;
};

/**
 * Given two arrays, one shorter (with all distinct elements) and one longer, this method finds the shortest subarray
 * in the longer array that contains all the elements in the shorter array. The items can appear in any order.
 * @param array the longer array
 * @param searchArray the shorter array
 * @returns the start and end indices (inclusive) in the longer array, undefined if no super-sequence exists
 *
 * T = O(N * (N + M)) = O(N ^ 2) where N is the longest array length and M is the shortest array length
 * S = O(M)
 * (worst-case where each element of the longest array is in the search array)
 */
export const shortestSuperSequenceV1 = (array: number[], searchArray: number[]): [ number, number ] | undefined => {

	if(searchArray.length > array.length) {

		throw Error('Search array cannot be longer than the array!');
	}

	if(array.length === 0) {

		throw Error('Array cannot be empty!');
	}

	// Create a map starting from the search array (value -> true)
	const searchMap: {[key: number]: boolean} = {};
	for(const searchElement of searchArray) {

		if(searchMap[searchElement]) {

			throw Error('Search array elements must be unique!');
		}

		searchMap[searchElement] = true;
	}
	
	let smallestSuperSequenceLength = Infinity;
	let smallestSuperSequence: [ number, number ] | undefined;

	// Loop the longest array
	for(let i = 0; i < array.length; i++) {

		const curr = array[i];

		// The current element is in the search array
		if(searchMap[curr]) {

			// Get the super-sequence starting from i
			const superSequenceStartingFromI = shortestSuperSequenceStartingFrom(array, searchArray, searchMap, i);
			const superSequenceStartingFromILength = superSequenceStartingFromI ? superSequenceStartingFromI[1] - superSequenceStartingFromI[0] : Infinity;

			// If the super-sequence starting from i is the best so far, update the reference
			if(superSequenceStartingFromILength < smallestSuperSequenceLength) {

				smallestSuperSequenceLength = superSequenceStartingFromILength;
				smallestSuperSequence = superSequenceStartingFromI;
			}
		}
	}

	return smallestSuperSequence;
};
