import { Node, SimpleNode, SimpleSinglyLinkedList } from './data-structures/singlyLinkedList';
import { randomInteger } from './helpers/utils';

/**
 * Shuffles an array. All N! permutations are equally likely.
 * Version with while + support array.
 * @param array source array
 */
export const shuffleV1 = (array: string[]): void => {
	
	const length = array.length;
	const maxIndex = length - 1;

	const shuffled: string[] = [];

	for(let i = 0; i < length; i++) {

		// Get a random destination index j for element i (repeat if j is already taken)
		let j;
		do {
			j = randomInteger(0, maxIndex);
		}
		while(shuffled[j] !== undefined);
		
		shuffled[j] = array[i];
	}

	// Update the original array with the shuffled copy
	for(let i = 0; i < length; i++) {

		array[i] = shuffled[i];
	}
};

// Version with indices array splice + support array
export const shuffleV2 = (array: string[]): void => {
	
	const length = array.length;
	let maxIndex = length - 1;

	// Build an array of all indices
	const indices = [];
	for(let i = 0; i < length; i++) {

		indices[i] = i;
	}
	
	const shuffled: string[] = [];

	for(let i = 0; i < length; i++) {

		// Get a random destination index j for element i (remove its element from the indices array)
		const randomIndicesIndex = randomInteger(0, maxIndex);
		const j = indices.splice(randomIndicesIndex, 1)[0];
		maxIndex -= 1;
		
		shuffled[j] = array[i];
	}

	// Update the original array with the shuffled copy
	for(let i = 0; i < length; i++) {

		array[i] = shuffled[i];
	}
};

// Version with indices linked list + support array
export const shuffleV3 = (array: string[]): void => {
	
	const length = array.length;
	let maxIndex = length - 1;

	// Build a linked list of all indices
	const indices = new SimpleSinglyLinkedList<number>();
	let newIndexNode = new SimpleNode(0);
	indices.head = newIndexNode;
	for(let i = 1; i < length; i++) {

		newIndexNode.next = new SimpleNode(i);
		newIndexNode = newIndexNode.next;
	}
	
	const shuffled: string[] = [];

	for(let i = 0; i < length; i++) {

		// Get a random destination index j for element i (remove its element from the indices linked list)
		let randomIndicesIndex = randomInteger(0, maxIndex);
		let currentIndexNode: Node<number>;
		if(randomIndicesIndex === 0) {

			currentIndexNode = indices.head!;
			indices.head = currentIndexNode.next;
		}
		else {

			let prevIndexNode: Node<number> = indices.head!;
			currentIndexNode = prevIndexNode.next!;
			while(randomIndicesIndex > 1) {

				randomIndicesIndex -= 1;
				prevIndexNode = currentIndexNode;
				currentIndexNode = currentIndexNode.next!;
			}
			prevIndexNode.next = currentIndexNode.next;
		}
		const j = currentIndexNode.data;
		maxIndex -= 1;
		
		shuffled[j] = array[i];
	}

	// Update the original array with the shuffled copy
	for(let i = 0; i < length; i++) {

		array[i] = shuffled[i];
	}
};

// Version with indices array marked with -1 + support array
export const shuffleV4 = (array: string[]): void => {
	
	const length = array.length;
	let maxIndex = length - 1;

	// Build an array of all indices
	const indices = [];
	for(let i = 0; i < length; i++) {

		indices[i] = i;
	}
	
	const shuffled: string[] = [];

	for(let i = 0; i < length; i++) {

		// Get a random destination index j for element i (mark its element as already used in the indices array)
		let randomIndicesIndex = randomInteger(0, maxIndex);
		let k = 0;
		while(randomIndicesIndex >= 0) {

			if(indices[k] !== -1) {

				randomIndicesIndex -= 1;
			}

			k += 1;
		}
		const j = indices[k - 1];
		indices[k - 1] = -1;
		maxIndex -= 1;

		shuffled[j] = array[i];
	}

	// Update the original array with the shuffled copy
	for(let i = 0; i < length; i++) {

		array[i] = shuffled[i];
	}
};

// Version with indices linked list + element swap in original array
export const shuffleV5 = (array: string[]): void => {
	
	const length = array.length;
	let maxIndex = length - 1;

	// Build a linked list of all indices
	const indices = new SimpleSinglyLinkedList<number>();
	let newIndexNode = new SimpleNode(0);
	indices.head = newIndexNode;
	for(let i = 1; i < length; i++) {

		newIndexNode.next = new SimpleNode(i);
		newIndexNode = newIndexNode.next;
	}

	let i = 0;
	while(maxIndex > 0) {

		// Get a random destination index j for element i (remove its element from the indices linked list)
		let randomIndicesIndex = randomInteger(0, maxIndex);
		let currentIndexNode: Node<number>;
		if(randomIndicesIndex === 0) {

			currentIndexNode = indices.head!;
			indices.head = currentIndexNode.next;
		}
		else {

			let prevIndexNode: Node<number> = indices.head!;
			currentIndexNode = prevIndexNode.next!;
			while(randomIndicesIndex > 1) {

				randomIndicesIndex -= 1;
				prevIndexNode = currentIndexNode;
				currentIndexNode = currentIndexNode.next!;
			}
			prevIndexNode.next = currentIndexNode.next;
		}
		const j = currentIndexNode.data;
		maxIndex -= 1;

		// Update i or swap i and j
		if(i === j) {

			i = indices.head!.data;
		}
		else {
			
			const temp = array[j];
			array[j] = array[i];
			array[i] = temp;
		}
	}
};

const shuffleV6Helper = (array: string[], from: number, to: number): void => {
	
	if(to - from !== 1) {

		// Recurse on subarray
		shuffleV6Helper(array, from, to - 1);
	}

	// Swap "to" into the shuffled subarray
	const swapIndex = randomInteger(from, to);
	if(swapIndex !== to) {

		const temp = array[swapIndex];
		array[swapIndex] = array[to];
		array[to] = temp;
	}
};

// Version with recursive helper
export const shuffleV6 = (array: string[]): void => {
	
	shuffleV6Helper(array, 0, array.length - 1);
};

// Iterative version of shuffleV6
export const shuffleV7 = (array: string[]): void => {
	
	for(let i = 0; i < array.length; i++) {

		const k = randomInteger(0, i);
		const temp = array[k];
		array[k] = array[i];
		array[i] = temp;
	}
};

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
