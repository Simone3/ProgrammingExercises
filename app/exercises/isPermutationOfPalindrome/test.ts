import { isPermutationOfPalindrome } from './v1';

console.log('\n\n**********************\n\n');
const tests: string[] = [
	'',
	'    ',
	'a',
	'Tact Coa',
	'Tact Goa',
	'aBcdeFAbcdef',
	'aBcdeFAbcef',
	' abc d cba  ',
	' abc d cbf  ',
	'aabbccddeefg',
	'aaaAAAaa',
	'aa aAb AAaa'
];

for(const test of tests) {

	console.log(`${test} -> ${isPermutationOfPalindrome(test)}`);
}
