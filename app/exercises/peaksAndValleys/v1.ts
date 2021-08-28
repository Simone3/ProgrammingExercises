/**
 * Helper to swap the elements of a triplet to make a peak or a valley
 * @param array the array
 * @param i the last index of the triplet
 * @param peak if we need a peak or a valley
 */
const arrangeTriplet = (array: number[], i: number, peak: boolean): void => {

	const first = array[i - 2];
	const second = array[i - 1];
	const third = array[i];

	if((peak && first >= second && first >= third) || (!peak && first <= second && first <= third)) {

		// Swap first and second if we are looking for a peak and first is biggest or if we are looking for a valley and first is smallest
		array[i - 2] = second;
		array[i - 1] = first;
	}
	else if((peak && third >= first && third >= second) || (!peak && third <= first && third <= second)) {

		// Swap second and third if we are looking for a peak and third is biggest or if we are looking for a valley and third is smallest
		array[i - 1] = third;
		array[i] = second;
	}
};

/**
 * Helper to swap the elements of a pair to make a peak or a valley
 * @param array the array
 * @param i the last index of the pair
 * @param peak if we need a peak or a valley
 */
const arrangePair = (array: number[], i: number, peak: boolean): void => {

	const first = array[i - 1];
	const second = array[i];

	if((peak && first >= second) || (!peak && first <= second)) {

		// Swap the two values if we are looking for a peak and first is bigger or if we are looking for a valley and first is smaller
		array[i - 1] = second;
		array[i] = first;
	}
};

/**
 * Helper to join two segments of the array, swapping two elements if the two fragments are incompatible
 * @param array the array
 * @param i the last index of the second segment
 * @param peak if the second segment is a peak or a valley
 */
const joinSegments = (array: number[], i: number, peak: boolean): void => {

	const lastPreviousSegment = array[i - 3];
	const firstCurrentSegment = array[i - 2];

	if((peak && lastPreviousSegment < firstCurrentSegment) || (!peak && lastPreviousSegment > firstCurrentSegment)) {

		// Swap the values at the joining border of the two segments if they are incompatible
		array[i - 3] = firstCurrentSegment;
		array[i - 2] = lastPreviousSegment;
	}
};

/**
 * In an array of integers, a "peak" is an element which is greater than or equal to the adjacent integers and a "valley" is an element which is less
 * than or equal to the adjacent integers. For example, in the array {5, 8, 6, 2, 3, 4, 6}, {8, 6} are peaks and {5, 2} are valleys.
 * Given an array of integers, this function sorts the array into an alternating sequence of peaks and valleys.
 * T = O(N)
 * S = O(1)
 * @param array the array
 */
export const peaksAndValleys = (array: number[]): void => {

	if(array.length > 1) {

		// Loop the array 3 elements at a time
		let i;
		let peak;
		for(i = 2, peak = false; i < array.length; i += 3, peak = !peak) {

			// Swap the elements in the current triplet to make it a peak or a valley as necessary
			arrangeTriplet(array, i, peak);

			// Join the current triplet with the previous one
			if(i > 2) {

				joinSegments(array, i, peak);
			}
		}

		// Handle if necessary the reminder of 1 or 2 elements in the array
		const previousI = i - 3;
		const reminder = array.length - 1 - previousI;
		if(reminder !== 0) {

			// If the reminder is 2 elements, swap the elements in the pair to make it a peak or a valley as necessary
			if(reminder === 2) {

				arrangePair(array, previousI + 2, peak);
			}

			// Join the last segment with the previous triplet
			if(previousI >= 0) {

				joinSegments(array, i, peak);
			}
		}
	}
};
