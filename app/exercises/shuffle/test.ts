import { shuffleV1 } from './v1';
import { shuffleV2 } from './v2';
import { shuffleV3 } from './v3';
import { shuffleV4 } from './v4';
import { shuffleV5 } from './v5';
import { shuffleV6 } from './v6';
import { shuffleV7 } from './v7';

console.log('\n\n**********************\n\n');

const performTest = (testName: string, source: string[], iterations: number, shuffle: (array: string[]) => void, verbose: boolean): string => {

	console.log(`####### Testing ${testName} with source [ ${source.join(', ')} ] and ${iterations} iterations #######`);

	const startTime = process.hrtime();

	const resultCounter: {[key: string]: number} = {};
	for(let i = 0; i < iterations; i++) {
	
		const test = source.slice(0);
		shuffle(test);
	
		const resultKey = test.join(', ');
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

const TEST = [ 'A', 'B', 'C', 'D', 'E' ];
const TEST_ITERATIONS = 10000000;

const messages = [];
messages.push(performTest('V1', TEST, TEST_ITERATIONS, shuffleV1, false));
messages.push(performTest('V2', TEST, TEST_ITERATIONS, shuffleV2, false));
messages.push(performTest('V3', TEST, TEST_ITERATIONS, shuffleV3, false));
messages.push(performTest('V4', TEST, TEST_ITERATIONS, shuffleV4, false));
messages.push(performTest('V5', TEST, TEST_ITERATIONS, shuffleV5, false));
messages.push(performTest('V6', TEST, TEST_ITERATIONS, shuffleV6, false));
messages.push(performTest('V7', TEST, TEST_ITERATIONS, shuffleV7, false));

console.log('-----\n\n\n');
for(const message of messages) {

	console.log(message);
}
