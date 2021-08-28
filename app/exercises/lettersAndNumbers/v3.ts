import { isNumber } from './common';

/**
 * Given an array filled with letters and numbers, finds the longest subarray with an equal number of letters and numbers
 * T = O(N)
 * S = O(N)
 * @param values source values
 * @returns the subarray of undefined if not found
 */
export const lettersAndNumbersV3 = (values: string[]): string[] | undefined => {

	let resultStart;
	let resultEnd;

	// Compute differences (numbers - letters) for each index position
	const diffs = [];
	let currentDiff = 0;
	for(let i = 0; i < values.length; i++) {

		if(isNumber(values[i])) {

			currentDiff += 1;
		}
		else {

			currentDiff -= 1;
		}

		diffs[i] = currentDiff;
	}

	// Loop differences keeping a "difference value -> first index containing this difference" map
	const foundDiffs: {[key: number]: number} = {};
	foundDiffs[0] = -1;
	for(let i = 0; i < diffs.length; i++) {

		const diff = diffs[i];
		const foundDiffIndex = foundDiffs[diff];
		if(foundDiffIndex === undefined) {

			// First time seeing this difference, save it in the map
			foundDiffs[diff] = i;
		}
		else {

			// Difference was already previously seen: this means that between that index and the current i there's an equal number of numbers and letters. Simply check if it's the biggest subarray.
			const resultCandidateStart = foundDiffIndex + 1;
			const resultCandidateEnd = i;
			if(resultStart === undefined || resultEnd === undefined || resultCandidateEnd - resultCandidateStart > resultEnd - resultStart) {

				resultStart = resultCandidateStart;
				resultEnd = resultCandidateEnd;
			}
		}
	}

	if(resultStart === undefined || resultEnd === undefined) {

		return undefined;
	}
	else {
		
		return values.slice(resultStart, resultEnd + 1);
	}
};
