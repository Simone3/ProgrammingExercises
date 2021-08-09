import { Queue, SimpleQueue } from './data-structures/queue';
import { randomString } from './helpers/utils';

type Counter = {
	areNumbers: boolean;
	count: number;
}

type Iteration = {
	values: string[],
	counters: Counter[],
	totalNumbers: number;
	totalLetters: number;
	firstValueIndex: number;
	lastValueIndex: number;
	firstCounterIndex: number;
	lastCounterIndex: number;
}

/**
 * Helper to check if a character is a number
 * @param char the character
 * @returns true if it's a number
 */
const isNumber = (char: string): boolean => {

	return char === '0' || char === '1' || char === '2' || char === '3' || char === '4' || char === '5' || char === '6' || char === '7' || char === '8' || char === '9';
};

/**
 * Helper to parse the source values into counters and build the first iteration item
 * @param values source values
 * @returns the first iteration data
 */
const buildFirstIteration = (values: string[]): Iteration => {

	let totalNumbers = 0;
	let totalLetters = 0;

	let currentCounter;
	const counters = [];

	// Loop all values
	for(let i = 0; i < values.length; i++) {

		const isCurrentNumber = isNumber(values[i]);
		if(currentCounter && currentCounter.areNumbers === isCurrentNumber) {

			// Same type as previous, just increse the counter
			currentCounter.count += 1;
		}
		else {

			// Different type from previous, init new counter
			currentCounter = {
				areNumbers: isCurrentNumber,
				count: 1
			};
			counters.push(currentCounter);
		}

		// Count total numbers and letters
		if(isCurrentNumber) {

			totalNumbers += 1;
		}
		else {

			totalLetters += 1;
		}
	}

	return {
		values: values,
		counters: counters,
		totalNumbers: totalNumbers,
		totalLetters: totalLetters,
		firstValueIndex: 0,
		lastValueIndex: values.length - 1,
		firstCounterIndex: 0,
		lastCounterIndex: counters.length - 1
	};
};

/**
 * Helper to process a single iteration
 * @param iteration the iteration data
 * @returns the subarray or undefined if not found
 */
const processIteration = (iteration: Iteration): string[] | undefined => {

	const values = iteration.values;
	const counters = iteration.counters;
	const totalNumbers = iteration.totalNumbers;
	const totalLetters = iteration.totalLetters;
	const firstValueIndex = iteration.firstValueIndex;
	const lastValueIndex = iteration.lastValueIndex;
	const firstCounterIndex = iteration.firstCounterIndex;
	const lastCounterIndex = iteration.lastCounterIndex;

	if(totalLetters === totalNumbers) {

		// Current subarray fulfills the overall requirement as is
		return values.slice(firstValueIndex, lastValueIndex + 1);
	}
	else {

		const firstCounter = counters[firstCounterIndex];
		const lastCounter = counters[lastCounterIndex];

		const thereAreExcessNumbers = totalNumbers > totalLetters;
		let excessValues = thereAreExcessNumbers ? totalNumbers - totalLetters : totalLetters - totalNumbers;

		let lastValueIndexShift = 0;

		if(lastCounter.areNumbers === thereAreExcessNumbers) {

			if(lastCounter.count >= excessValues) {

				// Last counter contains the same values that are in excess and we can remove some of them to reach the overall requirement
				return values.slice(firstValueIndex, lastValueIndex - excessValues + 1);
			}
			else {

				// Last counter contains the same values that are in excess but they are not enough to reach the overall requirement. But maybe they can help if the first counter also contains these values.
				lastValueIndexShift = lastCounter.count;
				excessValues -= lastValueIndexShift;
			}
		}

		if(firstCounter.areNumbers === thereAreExcessNumbers && firstCounter.count >= excessValues) {
			
			// First counter contains the same values that are in excess and we can remove some of them to reach the overall requirement
			return values.slice(firstValueIndex + excessValues, lastValueIndex - lastValueIndexShift + 1);
		}
	}

	// Impossible to reach the overall requirement in this iteration
	return undefined;
};

/**
 * Helper to add new iterations to the queue from the previous one
 * @param iterations iterations queue
 * @param previousIteration source iteration
 */
const addNewIterations = (iterations: Queue<Iteration>, previousIteration: Iteration): void => {

	const firstCounter = previousIteration.counters[previousIteration.firstCounterIndex];
	const lastCounter = previousIteration.counters[previousIteration.lastCounterIndex];

	// Build an iteration equal to the previous one but without the first counter
	const iterationWithoutFirstCounter: Iteration = {
		values: previousIteration.values,
		counters: previousIteration.counters,
		totalNumbers: previousIteration.totalNumbers - (firstCounter.areNumbers ? firstCounter.count : 0),
		totalLetters: previousIteration.totalLetters - (firstCounter.areNumbers ? 0 : firstCounter.count),
		firstValueIndex: previousIteration.firstValueIndex + firstCounter.count,
		lastValueIndex: previousIteration.lastValueIndex,
		firstCounterIndex: previousIteration.firstCounterIndex + 1,
		lastCounterIndex: previousIteration.lastCounterIndex
	};

	// Build an iteration equal to the previous one but without the last counter
	const iterationWithoutLastCounter: Iteration = {
		values: previousIteration.values,
		counters: previousIteration.counters,
		totalNumbers: previousIteration.totalNumbers - (lastCounter.areNumbers ? lastCounter.count : 0),
		totalLetters: previousIteration.totalLetters - (lastCounter.areNumbers ? 0 : lastCounter.count),
		firstValueIndex: previousIteration.firstValueIndex,
		lastValueIndex: previousIteration.lastValueIndex - lastCounter.count,
		firstCounterIndex: previousIteration.firstCounterIndex,
		lastCounterIndex: previousIteration.lastCounterIndex - 1
	};

	// Add both to the queue in length order (i.e. in possibile subarray length order)
	if(firstCounter.count >= lastCounter.count) {

		iterations.add(iterationWithoutLastCounter);
		iterations.add(iterationWithoutFirstCounter);
	}
	else {

		iterations.add(iterationWithoutFirstCounter);
		iterations.add(iterationWithoutLastCounter);
	}
};

/**
 * Given an array filled with letters and numbers, finds the longest subarray with an equal number of letters and numbers
 * T = O(2^N)
 * S = O(N)
 * @param values source values
 * @returns the subarray of undefined if not found
 */
export const lettersAndNumbersV1 = (values: string[]): string[] | undefined => {

	if(values.length <= 1) {

		// Trivial case with isufficient length, for sure no subarray
		return undefined;
	}

	// Build the first iteration data from the source array of values
	const firstIteration = buildFirstIteration(values);
	if(firstIteration.counters.length === 1) {

		// Trivial case with all numbers or all letters, for sure no subarray
		return undefined;
	}

	// Loop and process iterations in decreasing order of subarray length
	const iterations: Queue<Iteration> = new SimpleQueue();
	iterations.add(firstIteration);
	while(!iterations.isEmpty()) {

		const iteration = iterations.remove();

		const iterationResult = processIteration(iteration);
		if(iterationResult) {

			// Found an iteration that fulfills the overall requirement: return it because I know it's the biggest subarray possibile
			return iterationResult;
		}

		addNewIterations(iterations, iteration);
	}

	throw Error('This should never happen! At least a 2-value array (letter-number or number-letter) must always be present!');
};

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

const tests = [
	'',
	'0',
	'a',
	'000000',
	'aaaa',
	'0a',
	'a0',
	'a0a',
	'aa0',
	'0aa',
	'0a0',
	'a00',
	'00a',
	'0a0a0a0a0a0a0a',
	'0a0a0a0a0a0a0',
	'a0a0a0a0a0a0a',
	'00000aaaaa',
	'00000aaaa',
	'0000aaaaa',
	'aaa000aaa0a000',
	'a0a0000aa00',
	'a0aa0aa000',
	'aa000aa0aa0000aa',
	'a0aa0aa000aaa000aa0aa0000aa',
	'0aaa0aa000aaa000aa0aa0000aa',
	'0aaa0aa000aaa000aa0aa00aa00',
	'a000aaaa0a0a0a0',
	'aa000a000000a0aa000a',
	'a0a0aaaaaaa0aaa00aaaaa000',
	'Ww1TG2Yn0ZVUWV3',
	randomString(5, 'a0'),
	randomString(10, 'a0'),
	randomString(15, 'a0'),
	randomString(20, 'a0'),
	randomString(25, 'a0')
];

const checkAndFormatTestResult = (subarray: string[] | undefined): string => {

	if(subarray === undefined) {

		return '/';
	}
	else {

		let numbers = 0;
		let letters = 0;
		for(const char of subarray) {

			if(isNumber(char)) {

				numbers += 1;
			}
			else {

				letters += 1;
			}
		}

		if(numbers === letters) {

			return subarray.join('');
		}
		else {

			return `[WRONG!!!] ${subarray.join('')}`;
		}
	}
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const subarrayV1 = lettersAndNumbersV1(test.split(''));
	const resultV1 = checkAndFormatTestResult(subarrayV1);

	const subarrayV2 = lettersAndNumbersV2(test.split(''));
	const resultV2 = checkAndFormatTestResult(subarrayV2);

	const subarrayV3 = lettersAndNumbersV3(test.split(''));
	const resultV3 = checkAndFormatTestResult(subarrayV3);
	
	console.log(`${test} -> V1 = ${resultV1}, V2 = ${resultV2}, V3 = ${resultV3} ${resultV1.length === resultV2.length && resultV1.length === resultV3.length ? '' : '[DIFFERENT!!!]'}`);
}

