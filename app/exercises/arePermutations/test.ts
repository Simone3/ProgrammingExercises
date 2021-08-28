import { arePermutations } from './v1';

const tests: string[][] = [
	[ '', '' ],
	[ 'a', 'a' ],
	[ 'ab', 'ab' ],
	[ 'ab', 'ba' ],
	[ 'abcdefg', 'ebcgadf' ],
	[ 'aabbccddd', 'dabcdabcd' ],
	[ 'abcde', 'abcd' ],
	[ 'aaaaaaaaaaba', 'abaaaaaaaaaa' ],
	[ 'aaaaaaaaaaba', 'acaaaaaaaaaa' ],
	[ 'aaaaaaaaaaba', 'abaaaaaaaaab' ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test} -> ${arePermutations(test[0], test[1])}`);
}
