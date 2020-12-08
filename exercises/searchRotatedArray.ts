import { rotateArray } from './helpers/utils';

/**
 * Helper for searchRotatedArray()
 * @param array the source array
 * @param element the element to find
 * @param start the start of the current array portion
 * @param end the end of the current array portion
 * @returns the element index or undefined if not found
 */
const searchRotatedArrayHelper = (array: number[], element: number, start: number, end: number): number | undefined => {

	const diff = end - start;

	if(diff < 0) {

		// Base case, element not found in the current recursion tree
		return undefined;
	}

	const middle = start + Math.floor(diff / 2);

	const startValue = array[start];
	const endValue = array[end];
	const middleValue = array[middle];

	if(middleValue === element) {

		if(middle > 0 && array[middle - 1] === element) {

			// Found the element but there are duplicates on the left, recurse on left half
			return searchRotatedArrayHelper(array, element, start, middle - 1);
		}
		else {

			// Found the element and there are no duplicates on the left, return its index
			return middle;
		}
	}
	else if(startValue < middleValue && (element >= startValue && element < middleValue)) {

		// Left half is "normal" (fully sorted) and the element may be inside it, recurse on it
		return searchRotatedArrayHelper(array, element, start, middle - 1);
	}
	else if(middleValue < endValue && (element > middleValue && element <= endValue)) {

		// Right half is "normal" (fully sorted) and the element may be inside it, recurse on it
		return searchRotatedArrayHelper(array, element, middle + 1, end);
	}
	else if(startValue > middleValue && (element >= startValue || element < middleValue)) {

		// Left half contains the "rotation end" and the element may be inside it, recurse on it
		return searchRotatedArrayHelper(array, element, start, middle - 1);
	}
	else if(middleValue > endValue && (element > middleValue || element <= endValue)) {
		
		// Right half contains the "rotation end" and the element may be inside it, recurse on it
		return searchRotatedArrayHelper(array, element, middle + 1, end);
	}
	else {

		// Element can't be in any of the two halves
		return undefined;
	}
};

/**
 * Given a sorted array of integers that has been rotated an unknown number of times, this function finds an element in the array.
 * T = O(log(N))
 * S = O(1)
 * @param array the source array
 * @param element the element to find
 * @returns the element index or undefined if not found
 */
export const searchRotatedArray = (array: number[], element: number): number | undefined => {

	return searchRotatedArrayHelper(array, element, 0, array.length - 1);
};

const tests = [
	{ array: [], element: 3 },
	{ array: [ 3 ], element: 3 },
	{ array: [ 3 ], element: 1 },
	{ array: [ 3 ], element: 5 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: 3 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: 0 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: 9 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: -19 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: 19 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: 3 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: 0 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: 9 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: -19 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: 19 },
	{ array: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ], element: 3 },
	{ array: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ], element: 1 },
	{ array: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ], element: 5 }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const maxTimes = test.array.length === 0 ? 0 : test.array.length - 1;
	for(let times = 0; times <= maxTimes; times++) {

		const rotatedTest = rotateArray([ ...test.array ], times);
		const result = searchRotatedArray(rotatedTest, test.element);
		console.log(`[${rotatedTest.join(', ')}] index of ${test.element} ---> ${result}`);
	}
	console.log('---');
}
