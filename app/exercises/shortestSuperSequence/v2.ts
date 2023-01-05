
/**
 * Helper type
 */
type SuperSequenceDescriptor = {
	length: number,
	start: {
		matchesRow: number,
		matchesColumn: number,
		arrayIndex: number
	}, end: {
		matchesRow: number,
		matchesColumn: number,
		arrayIndex: number
	}
}

/**
 * Helper to get the super-sequence for the current columns
 * @param matches all matches
 * @param currentMatchesColumns current columns
 * @returns the super-sequence descriptor
 */
const getSuperSequence = (matches: number[][], currentMatchesColumns: number[]): SuperSequenceDescriptor => {

	let startRow = -1;
	let startArrayIndex = Infinity;
	let endRow = -1;
	let endArrayIndex = -Infinity;

	// Loop all current columns to get the smallest array index (and its corresponding row) and the largest array index (and its corresponding row)
	// i.e. the indices that start and end the current super-sequence
	for(let row = 0; row < currentMatchesColumns.length; row++) {

		const column = currentMatchesColumns[row];
		const arrayIndex = matches[row][column];

		if(arrayIndex < startArrayIndex) {

			startArrayIndex = arrayIndex;
			startRow = row;
		}

		if(arrayIndex > endArrayIndex) {

			endArrayIndex = arrayIndex;
			endRow = row;
		}
	}

	return {
		length: endArrayIndex - startArrayIndex,
		start: {
			matchesRow: startRow,
			matchesColumn: currentMatchesColumns[startRow],
			arrayIndex: startArrayIndex
		},
		end: {
			matchesRow: endRow,
			matchesColumn: currentMatchesColumns[endRow],
			arrayIndex: endArrayIndex
		}
	};
};

/**
 * Given two arrays, one shorter (with all distinct elements) and one longer, this method finds the shortest subarray
 * in the longer array that contains all the elements in the shorter array. The items can appear in any order.
 * @param array the longer array
 * @param searchArray the shorter array
 * @returns the start and end indices (inclusive) in the longer array, undefined if no super-sequence exists
 *
 * T = O(N + N * M) = O(N * M) where N is the longest array length and M is the shortest array length
 * S = O(N * M)
 * (worst-case where each element of the longest array is in the search array)
 */
export const shortestSuperSequenceV2 = (array: number[], searchArray: number[]): [ number, number ] | undefined => {

	if(searchArray.length > array.length) {

		throw Error('Search array cannot be longer than the array!');
	}

	if(array.length === 0) {

		throw Error('Array cannot be empty!');
	}

	// Create a map starting from the search array (value -> index)
	const searchMap: {[key: number]: number} = {};
	for(let i = 0; i < searchArray.length; i++) {

		const searchElement = searchArray[i];

		if(searchMap[searchElement]) {

			throw Error('Search array elements must be unique!');
		}

		searchMap[searchElement] = i;
	}

	// Build a matrix of search matches: each row corresponds to the searchArray elements and its array (columns) contains the array indices (in order) that contain that element
	// i.e. searching [ 2, 3 ] in [ 7, 2, 3, 4, 2, 1 ] we'd have:
	// [[ 1, 4 ]] -> this corresponds to search element "2": it's at indices 1 and 4 in the array
	// [[ 2 ]] -> this corresponds to search element "3": it's at index 2 in the array
	const matches: number[][] = [];
	for(let i = 0; i < array.length; i++) {

		const searchArrayIndex = searchMap[array[i]];
		if(searchArrayIndex !== undefined) {

			if(!matches[searchArrayIndex]) {

				matches[searchArrayIndex] = [];
			}

			matches[searchArrayIndex].push(i);
		}
	}

	// Initialize the array of current columns, i.e. the values that keep track of the current column for each row (the value j of currentMatchesColumns[i] tells us that for row i we are currently at element matches[i][j])
	const currentMatchesColumns: number[] = [];
	for(let i = 0; i < searchArray.length; i++) {

		if(!matches[i]) {

			// Special case: no match was found for searchArray[j] element: no super-sequence for sure
			return undefined;
		}
		
		currentMatchesColumns[i] = 0;
	}

	let smallestSuperSequence: SuperSequenceDescriptor = { length: Infinity, start: { matchesRow: -1, matchesColumn: -1, arrayIndex: -1 }, end: { matchesRow: -1, matchesColumn: -1, arrayIndex: -1 } };

	// eslint-disable-next-line no-constant-condition
	while(true) {

		// Get the super-sequence of the current columns
		const currentSuperSequence = getSuperSequence(matches, currentMatchesColumns);

		// Update best super-sequence if needed
		if(currentSuperSequence.length < smallestSuperSequence.length) {

			smallestSuperSequence = currentSuperSequence;
		}

		if(currentSuperSequence.start.matchesColumn < matches[currentSuperSequence.start.matchesRow].length - 1) {

			// Move the column corresponding to the start of the current super-sequence, i.e. try to find a smaller super-sequence moving right
			currentMatchesColumns[currentSuperSequence.start.matchesRow] += 1;
		}
		else {

			// The start of the current super-sequence cannot be moved to the right: we've explored all options
			break;
		}
	}

	return [ smallestSuperSequence.start.arrayIndex, smallestSuperSequence.end.arrayIndex ];
};
