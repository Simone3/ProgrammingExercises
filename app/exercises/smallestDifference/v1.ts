import { quickSort } from '../../sort/quickSort';

/**
 * Given two arrays of integers, it computes the pair of values (one value in each array) with the smallest (non-negative) difference and returns the difference
 * T = O(M * logM + N * logN)
 * S = O(1)
 * @param firstArray the first array
 * @param secondArray the second array
 * @returns the smallest difference or undefined if one or both arrays are empty
 */
export const getSmallestDifference = (firstArray: number[], secondArray: number[]): number | undefined => {

	// Sort the two arrays
	quickSort(firstArray);
	quickSort(secondArray);

	// Loop the arrays moving the index of the array that contains the smallest value
	let smallestDifference;
	let i = 0;
	let j = 0;
	while(i < firstArray.length && j < secondArray.length) {

		// First array's value is smaller: compute the difference and just move i (try to get a smaller difference by getting closer to the second array's value)
		if(firstArray[i] < secondArray[j]) {

			const difference = secondArray[j] - firstArray[i];

			if(smallestDifference === undefined || difference < smallestDifference) {

				smallestDifference = difference;
			}
			
			i += 1;
		}

		// Second array's value is smaller: compute the difference and just move j (try to get a smaller difference by getting closer to the first array's value)
		else {

			const difference = firstArray[i] - secondArray[j];
			
			if(smallestDifference === undefined || difference < smallestDifference) {

				smallestDifference = difference;
			}
			j += 1;
		}

		// Shortcircuit for smallest difference possibile
		if(smallestDifference === 0) {

			break;
		}
	}

	return smallestDifference;
};
