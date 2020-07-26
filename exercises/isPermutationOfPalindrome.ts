/**
 * Given a string (assuming ASCII characters), checks if it is a permutation of a palindrome. Case insensitive and ignoring spaces.
 * T = O(N)
 * S = O(1) (support array of max 128 characters)
 * @param input the input string
 * @returns true if it is a permutation of a palindrome
 */
export const isPermutationOfPalindrome = (input: string): boolean => {

	// Count all characters (case insensitive) in the string, excluding spaces
	let isEven = true;
	const counter: number[] = [];
	for(const char of input) {

		if(char !== ' ') {

			const i = char.toLowerCase().charCodeAt(0);
			const value = counter[i];
			counter[i] = value ? value + 1 : 1;
			isEven = !isEven;
		}
	}

	// If the string has an even number of characters (spaces excluded) all counts must be even, otherwise they must all be even except one
	let foundOdd = false;
	for(const count of counter) {

		if(count && count % 2 !== 0) {

			if(isEven || foundOdd) {

				return false;
			}
			else {

				foundOdd = true;
			}
		}
	}
	return true;
};

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
