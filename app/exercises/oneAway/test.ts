import { oneAway } from './v1';

const tests: string[][] = [
	[ '', '' ],
	[ 'a', 'a' ],
	[ 'abcdef', 'abcdef' ],
	[ 'xbcdef', 'abcdef' ],
	[ 'abxdef', 'abcdef' ],
	[ 'abcdex', 'abcdef' ],
	[ 'abcef', 'abcdef' ],
	[ 'bcdef', 'abcdef' ],
	[ 'abcde', 'abcdef' ],
	[ 'abcdef', 'bcdef' ],
	[ 'abcdef', 'abcdf' ],
	[ 'abcdef', 'abcde' ],
	[ 'axcdyf', 'abcdef' ],
	[ 'xbcdey', 'abcdef' ],
	[ 'abxyef', 'abcdef' ],
	[ 'abcdef', 'abcdxy' ],
	[ 'xycdef', 'abcdef' ],
	[ 'abcdef', 'abcdefgh' ],
	[ 'abcdefgh', 'abcdef' ],
	[ 'xbcdef', 'abcde' ],
	[ 'xbcde', 'abcdef' ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test} -> ${oneAway(test[0], test[1])}`);
}
