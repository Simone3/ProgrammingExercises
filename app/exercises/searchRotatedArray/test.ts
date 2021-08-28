import { rotateArray } from '../../helpers/utils';
import { searchRotatedArray } from './v1';

const tests = [
	{ array: [], element: 3 },
	{ array: [ 3 ], element: 3 },
	{ array: [ 3 ], element: 1 },
	{ array: [ 3 ], element: 5 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: 3 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: 0 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: 9 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: -19 },
	{ array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], element: 19 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: 3 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: 0 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: 9 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: -19 },
	{ array: [ 0, 1, 2, 3, 3, 3, 3, 7, 8, 9 ], element: 19 },
	{ array: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ], element: 3 },
	{ array: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ], element: 1 },
	{ array: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ], element: 5 }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const maxTimes = test.array.length === 0 ? 0 : test.array.length - 1;
	for(let times = 0; times <= maxTimes; times++) {

		const rotatedTest = rotateArray([ ...test.array ], times);
		const result = searchRotatedArray(rotatedTest, test.element);
		console.log(`[${rotatedTest.join(', ')}] index of ${test.element} ---> ${result}`);
	}
	console.log('---');
}
