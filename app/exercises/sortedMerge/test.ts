import { sortedMerge } from './v1';

const tests = [
	{ first: [], second: [] },
	{ first: [ 1 ], second: [] },
	{ first: [], second: [ 1 ] },
	{ first: [ 1, 2 ], second: [] },
	{ first: [], second: [ 1, 2 ] },
	{ first: [ 1 ], second: [ 2 ] },
	{ first: [ 2 ], second: [ 1 ] },
	{ first: [ 1, 4, 7, 9 ], second: [ 2, 3, 5, 10, 12, 15 ] },
	{ first: [ 2, 3, 5, 10, 12, 15 ], second: [ 1, 4, 7, 9 ] },
	{ first: [ 2, 3, 3, 3, 3, 15 ], second: [ 1, 3, 3, 14 ] },
	{ first: [ 1, 2, 3, 4, 5, 6 ], second: [ 7, 8, 9, 10 ] },
	{ first: [ 7, 8, 9, 10 ], second: [ 1, 2, 3, 4, 5, 6 ] },
	{ first: [ 1, 1, 1, 1, 1, 1 ], second: [ 1, 1, 1, 1 ] }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const first = test.first.join(', ');
	const second = test.second.join(', ');
	sortedMerge(test.first, test.second);
	const result = test.first.join(', ');
	console.log(`[${first}] + [${second}] ---> [${result}]`);
}
