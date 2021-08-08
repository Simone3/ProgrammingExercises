import { randomInteger } from './helpers/utils';

/**
 * Randomly generates a subset of "options" with "setSize" length
 * @param options original list of values
 * @param setSize size of the subset
 * @returns a random subset
 */
export const randomSetV1 = (options: number[], setSize: number): number[] => {

	if(setSize > options.length) {

		throw Error('Set size is too big');
	}
	else if(setSize === options.length) {

		return [ ...options ];
	}

	const set: number[] = [];
	const chosen: boolean[] = [];
	let remainingSetElements = setSize;
	let index;

	// For each element of the subset, pick a random element from the original array, repeating if it was already picked previously
	while(remainingSetElements > 0) {

		do {

			index = randomInteger(0, options.length - 1);
		}
		while(chosen[index]);

		set.push(options[index]);
		chosen[index] = true;

		remainingSetElements -= 1;
	}

	return set;
};

/**
 * V2
 * @param options original list of values
 * @param setSize size of the subset
 * @returns a random subset
 *
 * Example of execution: [ 1, 2, 3, 4, 5, 6, 7, ] with set size = 3
 *
 * add 1? yes, init  --> 1 in [0]
 * add 2? yes, init  --> 1 in [1]
 * add 3? yes, init  --> 1 in [2]
 * add 4? rand [0,4] --> 1/4 in [0], 1/4 in [1], 1/4 in [2], 1/4 out
 * add 5? rand [0,5] --> 1/5 in [0], 1/5 in [1], 1/5 in [2], 2/5 out
 * add 6? rand [0,6] --> 1/6 in [0], 1/6 in [1], 1/6 in [2], 3/6 out
 * add 7? rand [0,7] --> 1/7 in [0], 1/7 in [1], 1/7 in [2], 4/7 out
 *
 * P(X in set) = P(put X) * P(not overwrite X)
 *
 * P(1 in set) = 1 * 3/4 * 4/5 * 5/6 * 6/7 = 1/7
 * P(2 in set) = 1 * 3/4 * 4/5 * 5/6 * 6/7 = 1/7
 * P(3 in set) = 1 * 3/4 * 4/5 * 5/6 * 6/7 = 1/7
 * P(4 in set) = 1/4 * 4/5 * 5/6 * 6/7 = 1/7
 * P(5 in set) = 1/5 * 5/6 * 6/7 = 1/7
 * P(6 in set) = 1/6 * 6/7 = 1/7
 * P(7 in set) = 1/7
 */
export const randomSetV2 = (options: number[], setSize: number): number[] => {

	if(setSize > options.length) {

		throw Error('Set size is too big');
	}
	else if(setSize === options.length) {

		return [ ...options ];
	}

	// Initially fill the result with the first elements of the original array
	const set: number[] = [];
	for(let i = 0; i < setSize; i++) {

		set[i] = options[i];
	}

	// Loop all remaining elements of the original array
	for(let i = setSize; i < options.length; i++) {

		// If random number k between 0 and i (inclusive) is a valid index for the result, replace the set element
		const k = randomInteger(0, i);
		if(k < setSize) {

			set[k] = options[i];
		}
	}

	return set;
};

console.log('\n\n**********************\n\n');

const performTest = (testName: string, options: number[], setSize: number, iterations: number, randomSet: (options: number[], setSize: number,) => number[], verbose: boolean): string => {

	console.log(`####### Testing ${testName} with options [ ${options.join(', ')} ], set size ${setSize} and ${iterations} iterations #######`);

	const startTime = process.hrtime();

	const resultCounter: {[key: string]: number} = {};
	for(let i = 0; i < iterations; i++) {
	
		const result = randomSet(options, setSize);
	
		const resultKey = result.sort().join(', ');
		let resultCount = resultCounter[resultKey];
		resultCount = resultCount === undefined ? 1 : resultCount + 1;
		resultCounter[resultKey] = resultCount;
	}

	const elapsedTime = process.hrtime(startTime);
	
	let minProbability = Infinity;
	let maxProbability = -Infinity;
	const results = [];
	for(const resultKey in resultCounter) {
	
		const probability = 100 * resultCounter[resultKey] / iterations;

		if(probability < minProbability) {

			minProbability = probability;
		}

		if(probability > maxProbability) {

			maxProbability = probability;
		}

		results.push(`${resultKey} -> ${probability}%`);
	}
	results.sort();

	if(verbose) {

		for(let i = 0; i < results.length; i++) {
		
			console.log(`${i + 1}) ${results[i]}`);
		}
	}

	console.log('\n\n');

	return `Test ${testName} took ${Math.round(elapsedTime[0] * 1000 + elapsedTime[1] / 1000000)}ms, with ${results.length} results, min probability = ${minProbability} and max probability = ${maxProbability}`;
};

const TEST = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
const TEST_SIZE = 3;
const TEST_ITERATIONS = 10000000;

const messages = [];
messages.push(performTest('V1', TEST, TEST_SIZE, TEST_ITERATIONS, randomSetV1, false));
messages.push(performTest('V2', TEST, TEST_SIZE, TEST_ITERATIONS, randomSetV2, false));

console.log('-----\n\n\n');
for(const message of messages) {

	console.log(message);
}
