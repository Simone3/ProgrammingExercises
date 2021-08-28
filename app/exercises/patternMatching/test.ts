import { checkPatternMatching } from './v1';

const tests: string[][] = [
	[ '', '' ],
	[ 'cat', '' ],
	[ '', 'a' ],
	[ 'x', 'a' ],
	[ 'x', 'b' ],
	[ 'cat', 'a' ],
	[ 'cat', 'b' ],
	[ 'catgo', 'ab' ],
	[ 'catgo', 'ba' ],
	[ 'catgo', 'aa' ],
	[ 'catgo', 'bb' ],
	[ 'catgo', 'aba' ],
	[ 'catcatgocatgo', 'aabab' ],
	[ 'catcatgocatgo', 'a' ],
	[ 'catcatgocatgo', 'ab' ],
	[ 'catcatgocatgo', 'b' ],
	[ 'catcatgocatgoc', 'aabab' ],
	[ 'catcatgoctago', 'aabab' ],
	[ 'catcatgocatog', 'aabab' ],
	[ 'catcatgocatxgo', 'aabab' ],
	[ 'catcatgocatgox', 'aabab' ],
	[ 'catcatcat', 'aaa' ],
	[ 'catcatcat', 'aa' ],
	[ 'catgocat', 'aaa' ],
	[ 'gogogogo', 'bbbb' ],
	[ 'gogogogo', 'bbbbb' ],
	[ 'catcatxxxcatcat', 'aabaa' ],
	[ 'catcatxcatcat', 'aabaa' ],
	[ 'catcatcatcatcat', 'aabaa' ],
	[ 'catcatcatcat', 'aabaa' ],
	[ 'xyyyyyyyyyyyyyyyyyyyyyyxxyyyyyyyyyyyyyyyyyyyyyy', 'abaab' ],
	[ 'xyyyyyyyyyyyyyyyyyyyyyyxxxyyyyyyyyyyyyyyyyyyyyyy', 'abaab' ],
	[ 'xyyyyyyyyyyyyyyyyyyyyyyxxyyyyyyyyyyyyyyyyyyyyy', 'abaab' ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`'${test[0]}' matches '${test[1]}'? ${checkPatternMatching(test[0], test[1])}`);
}
