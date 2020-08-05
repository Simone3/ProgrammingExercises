/**
 * Given two strings s1 and s2, it checks if s2 is a rotation of s1 (e.g. "waterbottle" is a rotation of"erbottlewat").
 * It can only one one call to string#includes()
 * T = O(N) (string concatenation and includes)
 * S = O(N) (string concatenation)
 * @param s1 the first input string
 * @param s2 the second input string
 * @returns true if s2 is a rotation of s1
 */
export const stringRotation = (s1: string, s2: string): boolean => {

	return s1.length === s2.length && (s1 + s1).includes(s2);
};

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

for(const test of tests) {

	console.log(`${test} -> ${stringRotation(test[0], test[1])}`);
}
