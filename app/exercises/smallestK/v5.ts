import { randomInteger } from '../../helpers/utils';

/**
 * Helper to compute the K-th smallest element in the array (Selection Rank Algorithm)
 * @param array the source array (the function will mutate it)
 * @param start the current recursion start index
 * @param end the current recursion end index
 * @param count the number of elements to find (K)
 * @returns the K-th smallest element index
 */
const getKthSmallestIndex = (array: number[], start: number, end: number, count: number): number => {

	// Base case of 1-element arrays
	if(start === end) {

		return start;
	}

	// Pick a random pivot element
	let pivotIndex = randomInteger(start, end);
	const pivot = array[pivotIndex];

	// Move the pivot at the start of the array
	array[pivotIndex] = array[start];
	array[start] = pivot;
	pivotIndex = start;

	// Move the pivot until all elements smaller than the pivot are before it
	for(let i = start + 1; i <= end; i++) {

		if(array[i] < pivot) {

			array[pivotIndex] = array[i];
			array[i] = array[pivotIndex + 1];
			array[pivotIndex + 1] = pivot;
			pivotIndex += 1;
		}
	}

	const leftSideLength = pivotIndex - start + 1;
	if(leftSideLength === count) {

		// There are just K-1 elements before the pivot and they are all smaller than the pivot (and therefore all other elements): they are the smallest in the array
		return pivotIndex;
	}
	else if(leftSideLength > count) {

		// Recurse on left side
		return getKthSmallestIndex(array, start, pivotIndex - 1, count);
	}
	else {

		// Recurse on right side (changing the target K)
		return getKthSmallestIndex(array, pivotIndex + 1, end, count - leftSideLength);
	}
};

/**
 * Finds the smallest K numbers in an array
 * @param array the source array
 * @param count the number of elements to find (K)
 * @returns the K smallest numbers
 *
 * T = O(N)
 * S = O(N)
 */
export const getSmallestV5 = (array: number[], count: number): number[] => {

	if(count <= 0 || count > array.length) {

		throw Error('Invalid number of elements!');
	}
	
	if(count === array.length) {

		return [ ...array ];
	}

	// Get the K-th smallest element index
	const clonedArray = [ ...array ];
	const kthSmallestIndex = getKthSmallestIndex(clonedArray, 0, clonedArray.length - 1, count);

	// Since the array was mutated to sort according to the pivot, we know for sure that the K elements before the K-th smallest (included) are the smallest in the array
	return clonedArray.slice(kthSmallestIndex - count + 1, kthSmallestIndex + 1);
};
