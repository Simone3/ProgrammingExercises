import { randomInteger, randomIntegerArray, randomSortedIntegerArray } from './helpers/utils';
import { binarySearch } from './search/binarySearch';
import { linearSearch } from './search/linearSearch';

const algorithms = [
	{ name: 'Linear Search', function: linearSearch, sortedOnly: false },
	{ name: 'Binary Search', function: binarySearch, sortedOnly: true }
];

const tests = [
	{ list: [], element: 9, sorted: true },
	{ list: [ 3 ], element: 9, sorted: true },
	{ list: [ 3 ], element: 3, sorted: true },
	{ list: [ 3, 6 ], element: 9, sorted: true },
	{ list: [ 3, 6 ], element: 3, sorted: true },
	{ list: [ 3, 6 ], element: 6, sorted: true },
	{ list: [ 6, 3 ], element: 9, sorted: false },
	{ list: [ 6, 3 ], element: 3, sorted: false },
	{ list: [ 6, 3 ], element: 6, sorted: false },
	{ list: [ 1, 3, 6, 9, 12 ], element: 9, sorted: true },
	{ list: [ 1, 3, 6, 9, 12 ], element: 1, sorted: true },
	{ list: [ 1, 3, 6, 9, 12 ], element: 12, sorted: true },
	{ list: [ 6, 56, 23, 91, 1, 0, 1, 1, 3 ], element: 0, sorted: false },
	{ list: [ 6, 56, 23, 91, 1, 0, 1, 1, 3 ], element: 1, sorted: false },
	{ list: [ 3, 4, 6, 6, 12, 15, 18, 21 ], element: 6, sorted: true },
	{ list: [ 6, 6, 6, 6, 12, 15, 18, 21 ], element: 6, sorted: true },
	{ list: [ 6, 6, 6, 6, 6, 6, 6, 6 ], element: 6, sorted: true },
	{ list: [ 6, 6, 6, 6, 6, 6, 6, 6 ], element: 3, sorted: true },
	{ list: randomSortedIntegerArray(20, -10, 10), element: randomInteger(-10, 10), sorted: true },
	{ list: randomIntegerArray(20, -10, 10), element: randomInteger(-10, 10), sorted: false }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`[${test.list.join(', ')}] contains ${test.element}?`);

	for(const algorithm of algorithms) {

		if(algorithm.sortedOnly && !test.sorted) {
			
			console.log(`* ${algorithm.name.padEnd(15, ' ')} --> X`);
		}
		else {

			const index = algorithm.function(test.list, test.element);
			console.log(`* ${algorithm.name.padEnd(15, ' ')} --> ${index}`);
		}
	}

	console.log('\n');
}
