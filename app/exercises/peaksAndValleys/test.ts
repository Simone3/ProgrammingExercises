import { randomIntegerArray } from '../../helpers/utils';
import { peaksAndValleys } from './v1';

const tests = [
	[],
	[ 1 ],
	[ 1, 2 ],
	[ 2, 1 ],
	[ 1, 2, 3 ],
	[ 1, 2, 3, 4 ],
	[ 4, 3, 2, 1 ],
	[ 3, 4, 1, 2 ],
	[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
	[ 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ],
	[ 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 2 ],
	randomIntegerArray(15, 0, 10),
	randomIntegerArray(16, 0, 10),
	randomIntegerArray(17, 0, 10)
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const original = test.join(', ');
	peaksAndValleys(test);
	const modified = test.join(', ');
	console.log(`[${original}] -> [${modified}]`);
}
