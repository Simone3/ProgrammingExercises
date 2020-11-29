/**
 * Recursive helper for quickSort()
 * @param array the array
 * @param start the starting index of the current portion
 * @param end the ending index of the current portion
 */
const quickSortHelper = (array: number[], start: number, end: number): void => {

	// Base case, no need to sort
	if(end - start <= 0) {

		return;
	}

	// Pick a pivot (the first element of the current array portion)
	let pivot = start;
	const pivotValue = array[pivot];
	for(let i = start + 1; i <= end; i++) {

		// If there's an element smaller than the pivot on the right side, swap elements to take it to the left
		const iValue = array[i];
		if(iValue < pivotValue) {

			const afterPivotValue = array[pivot + 1];

			array[pivot] = iValue;
			array[i] = afterPivotValue;
			array[pivot + 1] = pivotValue;

			pivot += 1;
		}
	}

	// Recurse on left part (all elements that are smaller than "pivotValue")
	const leftStart = start;
	const leftEnd = pivot - 1;
	quickSortHelper(array, leftStart, leftEnd);

	// Recurse on right part (all elements that are greater or equal than "pivotValue")
	const rightStart = pivot + 1;
	const rightEnd = end;
	quickSortHelper(array, rightStart, rightEnd);
};

/**
 * Quick sort implementation
 * T = O(N log(N)) average case, O(N^2) worst case
 * S = O(log(N))
 * @param array the array
 */
export const quickSort = (array: number[]): void => {

	if(array.length > 1) {

		quickSortHelper(array, 0, array.length - 1);
	}
};
