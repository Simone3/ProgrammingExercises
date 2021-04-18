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

const tests: number[][] = [
	[ 2 ],
	[ 2, 4 ],
	[ 2, 4, 6, 10, 14 ],
	[ 2, -1, 4, 6, 10, -10, 14 ],
	[ 2, -3, 4, 6, 10, -10, 14 ],
	[ 2, 4, 6, 10, -24, 14 ],
	[ 0 ],
	[ -3 ],
	[ 2, -1, 4, -1, -1, -1, 6, -2, 10, -3, -3, 14 ],
	[ 2, -1, 4, -1, -1, -1, 6, -2, -8, 10, -3, -3, 14 ],
	[ 2, -1, 4, -1, -1, -1, 6, -2, -1, 10, -3, -3, 14, -1, -1 ],
	[ 2, -1, 4, -1, -1, -1, 6, -2, -1, 10, -3, -3, 14, -20, -30, 99 ],
	[ 2, 4, 6, -10, -20, -30, 4, 8, 12, -10, -20, -30, 2, 2, 2, -10, -20, -30 ],
	[ 2, 0, 0, 0, 0, 0 ],
	[ 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0 ],
	[ 0, 0, 0, 2, -1, 4, 0, 0, 0, -1, -1, -1, 6, -2, 10, -3, -3, 0, 0, 0, 14, 0, 0, 0, 0 ],
	[ 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ -1, -2, -3, -4, -5, -6 ],
	[ -7, -8, -9, -1, -2, -10 ],
	[ -7, -8, 0, -1, -2, -10 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const result = getContiguousSequence(test);
	console.log(`[ ${test.join(', ')} ] ---> ${result.start}-${result.end} with sum = ${result.sum} ---> [ ${test.slice(0, result.start).join(', ')} | ${test.slice(result.start, result.end + 1).join(', ')} | ${test.slice(result.end + 1).join(', ')} ]`);
}
