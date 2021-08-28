import { Queue, SimpleQueue } from '../../data-structures/queue';
import { isNumber } from './common';

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
