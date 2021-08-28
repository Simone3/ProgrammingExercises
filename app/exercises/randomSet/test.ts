import { randomSetV1 } from './v1';
import { randomSetV2 } from './v2';

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
