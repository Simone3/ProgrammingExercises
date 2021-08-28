import { getT9Matches } from './v1';

const tests: number[][] = [
	[],
	[ 3 ],
	[ 8, 7, 3, 3 ],
	[ 8, 7, 3, 4 ],
	[ 8, 4, 7, 3, 3 ],
	[ 8, 7, 3, 3, 5, 4, 6, 3 ],
	[ 8, 7, 3, 3, 5, 4, 5, 3 ],
	[ 8, 7 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`[ ${test.join(', ')} ] -> ${getT9Matches(test).join(', ')}`);
}
