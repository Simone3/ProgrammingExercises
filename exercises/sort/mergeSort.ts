/**
 * Recursive helper for mergeSort()
 * @param source the source array
 * @param sourceStart the starting index of the source
 * @param sourceEnd the ending index of the source
 * @param target the target array for the result
 */
const mergeSortHelper = (source: number[], sourceStart: number, sourceEnd: number, target: number[]): void => {

	const sourceDiff = sourceEnd - sourceStart;

	if(sourceDiff === 0) {

		// Base case, array of length 1
		target[0] = source[sourceStart];
	}
	else {

		const sourceMiddle = sourceStart + Math.floor(sourceDiff / 2);

		// Recurse on left half
		const leftTarget: number[] = [];
		leftTarget.length = sourceMiddle - sourceStart + 1;
		mergeSortHelper(source, sourceStart, sourceMiddle, leftTarget);

		// Recurse on right half
		const rightTarget: number[] = [];
		rightTarget.length = sourceEnd - sourceMiddle;
		mergeSortHelper(source, sourceMiddle + 1, sourceEnd, rightTarget);

		// Merge left and right results
		let i = 0;
		let j = 0;
		for(let k = 0; k <= sourceDiff; k++) {

			if(i < leftTarget.length && (j >= rightTarget.length || leftTarget[i] < rightTarget[j])) {

				target[k] = leftTarget[i];
				i += 1;
			}
			else {

				target[k] = rightTarget[j];
				j += 1;
			}
		}
	}
};

/**
 * Merge sort implementation
 * T = O(N log(N))
 * S = O(N)
 * @param array the array
 */
export const mergeSort = (array: number[]): void => {

	if(array.length > 1) {

		mergeSortHelper(array, 0, array.length - 1, array);
	}
};
