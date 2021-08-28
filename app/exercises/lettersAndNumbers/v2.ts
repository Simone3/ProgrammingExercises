import { isNumber } from './common';

/**
 * Given an array filled with letters and numbers, finds the longest subarray with an equal number of letters and numbers
 * T = O(N^2)
 * S = O(N)
 * @param values source values
 * @returns the subarray of undefined if not found
 */
export const lettersAndNumbersV2 = (values: string[]): string[] | undefined => {

	let resultStart;
	let resultEnd;
	const subarrays = [];

	for(let i = 0; i < values.length; i++) {

		const value = isNumber(values[i]) ? 1 : -1;

		// Loop all previous subarrays and add the new value
		for(const subarray of subarrays) {

			subarray.diff += value;
			if(subarray.diff === 0 && ((resultStart === undefined || resultEnd === undefined) || i - subarray.start > resultEnd - resultStart)) {

				// "Numbers - letters" difference is 0 and this is the biggest subarray so far
				resultStart = subarray.start;
				resultEnd = i;
			}
		}

		// Add the new subarray start
		subarrays.push({
			start: i,
			diff: value
		});
	}

	if(resultStart === undefined || resultEnd === undefined) {

		return undefined;
	}
	else {
		
		return values.slice(resultStart, resultEnd + 1);
	}
};
