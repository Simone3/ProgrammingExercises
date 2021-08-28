/**
 * Given two arrays of integers, this function finds a pair of values (one value from each array) that you can swap to give the two arrays the same sum
 * T = O(N + M)
 * S = O(max(N, M))
 * @param firstArray the first array
 * @param secondArray the second array
 * @returns the two array indices, or undefined if no pair was found
 */
export const sumSwap = (firstArray: number[], secondArray: number[]): { i: number, j: number } | undefined => {

	// One or both arrays are empty, no need to go any further
	if(firstArray.length === 0 || secondArray.length === 0) {

		return undefined;
	}

	// Choose which array to loop once and which array to loop twice
	let loopOnceArray;
	let loopTwiceArray;
	if(firstArray.length > secondArray.length) {

		loopOnceArray = firstArray;
		loopTwiceArray = secondArray;
	}
	else {

		loopOnceArray = secondArray;
		loopTwiceArray = firstArray;
	}

	// Compute one array sum and cache all its values times two in a map
	let loopOnceSum = 0;
	const loopOnceCache: {[key: number]: number} = {};
	for(let i = loopOnceArray.length - 1; i >= 0; i--) {

		loopOnceCache[2 * loopOnceArray[i]] = i;
		loopOnceSum += loopOnceArray[i];
	}

	// Compute the other array sum
	let loopTwiceSum = 0;
	for(let j = 0; j < loopTwiceArray.length; j++) {

		loopTwiceSum += loopTwiceArray[j];
	}

	// If the difference between the two sums is not even, there can't be a valid pair (S1 - v1 + v2 = S2 + v1 - v2 -> S1 - S2 = 2(v1 - v2))
	if((loopOnceSum - loopTwiceSum) % 2 !== 0) {

		return undefined;
	}

	// Loop again the other array and find matches with the previously computed cache
	for(let j = 0; j < loopTwiceArray.length; j++) {

		const match = loopOnceCache[loopOnceSum - loopTwiceSum + 2 * loopTwiceArray[j]];
		if(match !== undefined) {

			return { i: match, j: j };
		}
	}

	return undefined;
};
