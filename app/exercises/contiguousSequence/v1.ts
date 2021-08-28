/**
 * Given an array of integers (both positive and negative), finds the contiguous sequence with the largest sum
 * @param array the array
 * @returns the sum and the corresponding indices
 */
export const getContiguousSequence = (array: number[]): { sum: number, start: number, end: number } => {

	if(array.length === 0) {

		throw Error('Invalid empty array');
	}

	let currentPositiveSumStart;
	let currentPositiveSumEnd;
	let currentPositiveSum = -Infinity;

	let maxSum = -Infinity;
	let maxSumStart;
	let maxSumEnd;
	
	for(let i = 0; i < array.length; i++) {

		const value = array[i];

		if(value > 0) {

			if(currentPositiveSumStart === undefined || currentPositiveSum === 0) {

				// Current value is positive and we need to start a new "positive sum": current sum is this element
				currentPositiveSum = value;
				currentPositiveSumStart = i;
				currentPositiveSumEnd = i;
			}
			else {

				// Current value is positive and we continue an ongoing "positive sum": add value and shift the sum end
				currentPositiveSum += value;
				currentPositiveSumEnd = i;
			}

			// Save max sum if the current one is better
			if(currentPositiveSum > maxSum) {

				maxSum = currentPositiveSum;
				maxSumStart = currentPositiveSumStart;
				maxSumEnd = currentPositiveSumEnd;
			}
		}
		else if(currentPositiveSumStart === undefined) {

			if(value > maxSum) {

				// Current value is negative, there's no ongoing "positive sum" and the current value is better than the max (special case for all negative values in the array): max is this element
				maxSum = value;
				maxSumStart = i;
				maxSumEnd = i;
			}
		}
		else {

			// Current value is negative and there's an ongoing "positive sum": add it and check if we get to a negative sum, in that case reset the current sum because it's not worth continuing
			currentPositiveSum += value;
			if(currentPositiveSum <= 0) {

				currentPositiveSum = 0;
				currentPositiveSumStart = undefined;
				currentPositiveSumEnd = undefined;
			}
		}
	}

	if(maxSumStart === undefined || maxSumEnd === undefined) {

		throw Error('This should never happen, at least a 1-element sum should be present');
	}

	return {
		sum: maxSum,
		start: maxSumStart,
		end: maxSumEnd
	};
};
