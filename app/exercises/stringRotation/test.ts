import { stringRotation } from './v1';

const tests: string[][] = [
	[ '', '' ],
	[ 'a', 'a' ],
	[ 'abcd', 'abcd' ],
	[ 'abcd', 'bcda' ],
	[ 'abcd', 'cdab' ],
	[ 'abcd', 'dabcd' ],
	[ 'abcd', 'abdc' ],
	[ 'aabaaaa', 'aaaaaab' ],
	[ 'aabaaaa', 'aaaaaac' ],
	[ 'aabaaaa', 'aaaaaaab' ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test} -> ${stringRotation(test[0], test[1])}`);
}
