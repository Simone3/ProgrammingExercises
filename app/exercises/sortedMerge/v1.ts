/**
 * Merges two sorted arrays into the first one
 * T = O(N + M)
 * S = O(1)
 * @param firstArray the first sorted array, and the target of the merge
 * @param secondArray the second sorted array
 */
export const sortedMerge = (firstArray: number[], secondArray: number[]): void => {

	if(secondArray.length === 0) {

		return;
	}

	const firstLength = firstArray.length;
	const secondLength = secondArray.length;
	const totalLength = firstLength + secondLength;

	firstArray.length = totalLength;

	// Loop both arrays starting from the end (i points to the first array, j to the second and k to the first but in "result mode")
	for(let i = firstLength - 1, j = secondLength - 1, k = totalLength - 1; k >= 0; k--) {
		
		if(firstArray[i] > secondArray[j]) {

			// k-th result element is the i-th from the first array
			firstArray[k] = firstArray[i];
			i -= 1;
		}
		else {

			// k-th result element is the j-th from the second array
			firstArray[k] = secondArray[j];
			j -= 1;

			// Short-circuit if the second array is done: all elements from 0 to k-1 are necessarily already in the first array
			if(j < 0) {

				break;
			}
		}
	}
};

