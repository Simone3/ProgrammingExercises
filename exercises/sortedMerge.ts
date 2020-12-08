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

const tests = [
	{ first: [], second: [] },
	{ first: [ 1 ], second: [] },
	{ first: [], second: [ 1 ] },
	{ first: [ 1, 2 ], second: [] },
	{ first: [], second: [ 1, 2 ] },
	{ first: [ 1 ], second: [ 2 ] },
	{ first: [ 2 ], second: [ 1 ] },
	{ first: [ 1, 4, 7, 9 ], second: [ 2, 3, 5, 10, 12, 15 ] },
	{ first: [ 2, 3, 5, 10, 12, 15 ], second: [ 1, 4, 7, 9 ] },
	{ first: [ 2, 3, 3, 3, 3, 15 ], second: [ 1, 3, 3, 14 ] },
	{ first: [ 1, 2, 3, 4, 5, 6 ], second: [ 7, 8, 9, 10 ] },
	{ first: [ 7, 8, 9, 10 ], second: [ 1, 2, 3, 4, 5, 6 ] },
	{ first: [ 1, 1, 1, 1, 1, 1 ], second: [ 1, 1, 1, 1 ] }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const first = test.first.join(', ');
	const second = test.second.join(', ');
	sortedMerge(test.first, test.second);
	const result = test.first.join(', ');
	console.log(`[${first}] + [${second}] ---> [${result}]`);
}
