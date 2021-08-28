import { sumSwap } from './v1';

const tests: {first: number[], second: number[]}[] = [
	{ first: [ ], second: [ ] },
	{ first: [ 1, 2, 3 ], second: [ ] },
	{ first: [ ], second: [ 1, 2, 3 ] },
	{ first: [ 4, 1, 2, 1, 1, 2 ], second: [ 3, 6, 3, 3 ] },
	{ first: [ 4, 1, 3, 1, 1, 2 ], second: [ 3, 6, 3, 3 ] },
	{ first: [ -10, -20, 4, 50, 1, 2, 1, 1, 2 ], second: [ 3, -5, -5, 6, 3, 3, 30 ] },
	{ first: [ -10, -20, 4, -50, 1, 2, 1, 1, 2 ], second: [ 3, -5, -5, 6, 3, 3, -70 ] },
	{ first: [ 1, 2, 3, 4, 5, 6, 7, 8 ], second: [ 1, 2, 3, 4, 5, 6, 7, 8 ] },
	{ first: [ 1, 2, 3, 4, 5, 6, 7, 8 ], second: [ 6, 4, 5, 21 ] },
	{ first: [ 1, 2, 3, 4, 5, 6, 7, 8 ], second: [ 6, 4, 5, 6, 21 ] }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const first = test.first;
	const second = test.second;
	const result = sumSwap(first, second);
	console.log(`[ ${first.join(', ')} ] & [ ${second.join(', ')} ] -> ${result === undefined ? '/' : `${result.i}, ${result.j} (i.e. ${first[result.i]}, ${second[result.j]})`}`);
}
