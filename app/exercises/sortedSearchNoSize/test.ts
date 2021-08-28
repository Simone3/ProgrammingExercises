import { Listy } from './common';
import { sortedSearchNoSizeV1 } from './v1';
import { sortedSearchNoSizeV2 } from './v2';

const tests = [
	{ listy: new Listy([]), element: 2 },
	{ listy: new Listy([ 2 ]), element: 2 },
	{ listy: new Listy([ 2 ]), element: 1 },
	{ listy: new Listy([ 2 ]), element: 3 },
	{ listy: new Listy([ 2, 4 ]), element: 2 },
	{ listy: new Listy([ 2, 4 ]), element: 4 },
	{ listy: new Listy([ 2, 4 ]), element: 1 },
	{ listy: new Listy([ 2, 4 ]), element: 3 },
	{ listy: new Listy([ 2, 4 ]), element: 5 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 2 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 4 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 6 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 8 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 10 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 12 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 1 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 3 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 5 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 7 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 9 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 11 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 13 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 2 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 18 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 50 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 1 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 23 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 51 },
	{ listy: new Listy([ 2, 4, 4, 4, 6, 6 ]), element: 4 },
	{ listy: new Listy([ 2, 4, 4, 4, 6, 6 ]), element: 6 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 2 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 4 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 6 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 8 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 10 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 12 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 14 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 16 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 18 }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test.listy} contains ${test.element} -----> V1 = ${sortedSearchNoSizeV1(test.listy, test.element)} | V2 = ${sortedSearchNoSizeV2(test.listy, test.element)}`);
}
