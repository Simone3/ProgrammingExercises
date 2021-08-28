/**
 * Helper to find the first unsorted value index starting from the beginning
 * @param array the array
 * @returns first index or undefined if the array is fully sorted
 */
const getForwardsFirstUnsortedIndex = (array: number[]): number | undefined => {

	let previous = array[0];
	for(let i = 1; i < array.length; i++) {

		if(previous <= array[i]) {

			previous = array[i];
		}
		else {

			return i;
		}
	}

	return undefined;
};

/**
 * Helper to find the first unsorted value index starting from the end
 * @param array the array
 * @returns first index
 */
const getBackwardsFirstUnsortedIndex = (array: number[]): number => {

	let previous = array[array.length - 1];
	for(let i = array.length - 2; i >= 0; i--) {

		if(previous >= array[i]) {

			previous = array[i];
		}
		else {

			return i;
		}
	}

	throw Error('This should never happen, this method should be called only if whole array is not already sorted!');
};

/**
 * Helper to find the min value in a sub-array
 * @param array the array
 * @param start start of the subarray (inclusive)
 * @param end end of the subarray (inclusive)
 * @returns min value
 */
const getMinInSubarray = (array: number[], start: number, end: number): number => {

	let min = array[start];
	for(let i = start + 1; i <= end; i++) {

		const value = array[i];

		if(value < min) {

			min = value;
		}
	}

	return min;
};

/**
 * Helper to find the max value in a sub-array
 * @param array the array
 * @param start start of the subarray (inclusive)
 * @param end end of the subarray (inclusive)
 * @returns max value
 */
const getMaxInSubarray = (array: number[], start: number, end: number): number => {

	let max = array[start];
	for(let i = start + 1; i <= end; i++) {

		const value = array[i];

		if(value > max) {

			max = value;
		}
	}

	return max;
};

/**
 * Helper to find the index of the first value (going backwards) in a subarray that is smaller than a reference value
 * @param array the array
 * @param start start of the subarray (inclusive)
 * @param end end of the subarray (inclusive)
 * @param referenceValue the value to compare
 * @returns the index of the first smaller value or undefined if none
 */
const getSmallerValueIndexBackwards = (array: number[], start: number, end: number, referenceValue: number): number | undefined => {

	for(let i = end; i >= start; i--) {

		if(referenceValue >= array[i]) {

			return i + 1;
		}
	}

	return undefined;
};

/**
 * Helper to find the index of the first value (going forwards) in a subarray that is greater than a reference value
 * @param array the array
 * @param start start of the subarray (inclusive)
 * @param end end of the subarray (inclusive)
 * @param referenceValue the value to compare
 * @returns the index of the first greater value or undefined if none
 */
const getGreaterValueIndexForwards = (array: number[], start: number, end: number, referenceValue: number): number | undefined => {

	for(let i = start; i <= end; i++) {

		if(referenceValue <= array[i]) {

			return i - 1;
		}
	}

	return undefined;
};

/**
 * Given an array of integers, this method finds indices m and n such that if you sorted elements m through n, the entire array would be sorted.
 * It minimizes n - m (that is, finds the smallest such sequence).
 * @param array the array
 * @returns the indices or undefined if the array is already sorted
 */
export const subSort = (array: number[]): { m: number, n: number } | undefined => {

	// Trivial cases are already sorted
	if(array.length <= 1) {

		return undefined;
	}

	// Get the index of the first unsorted value starting from the beginning
	const forwardsFirstUnsortedIndex = getForwardsFirstUnsortedIndex(array);
	
	// The array is fully sorted
	if(forwardsFirstUnsortedIndex === undefined) {

		return undefined;
	}

	// Get the index of the first unsorted value starting from the end
	const backwardsFirstUnsortedIndex = getBackwardsFirstUnsortedIndex(array);

	// Get the min and the max values in the [forwardsFirstUnsortedIndex, backwardsFirstUnsortedIndex] subarray
	const min = getMinInSubarray(array, forwardsFirstUnsortedIndex, array.length - 1);
	const max = getMaxInSubarray(array, 0, backwardsFirstUnsortedIndex);

	// Compute m and n
	const smallerValueIndexBackwards = getSmallerValueIndexBackwards(array, 0, forwardsFirstUnsortedIndex - 1, min);
	const greaterValueIndexForwards = getGreaterValueIndexForwards(array, backwardsFirstUnsortedIndex + 1, array.length - 1, max);

	return {
		m: smallerValueIndexBackwards === undefined ? 0 : smallerValueIndexBackwards,
		n: greaterValueIndexForwards === undefined ? array.length - 1 : greaterValueIndexForwards
	};
};
