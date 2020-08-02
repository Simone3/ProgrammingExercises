/**
 * Performs basic string compression using the counts of repeated characters. If the "compressed" string would not become smaller than the original string,
 * it returns the original string. Assumes that the string has only uppercase and lowercase letters (a - Z).
 * T = O(N) (assuming string concatenation is as fast as a StringBuilder in JavaScript)
 * S = O(N)
 * @param input the input string
 * @returns the compressed string
 */
export const compressString = (input: string): string => {

	if(!input) {

		return '';
	}

	let compressed = '';
	let currentChar = input[0];
	let currentCharCount = 1;
	for(let i = 1; i < input.length; i++) {

		const char = input[i];
		if(char === currentChar) {

			currentCharCount += 1;
		}
		else {

			compressed += currentCharCount + currentChar;
			currentCharCount = 1;
			currentChar = char;
		}
	}
	compressed += currentCharCount + currentChar;

	return compressed.length < input.length ? compressed : input;
};

const tests: string[] = [
	'',
	'a',
	'ab',
	'abc',
	'aba',
	'aa',
	'aaa',
	'aaaaaaaaa',
	'aabaa',
	'baab',
	'aaaaaaaaaaaaaaaaaaab',
	'baaaaaaaaaaaaaaaaaaa',
	'baaaaaaabb',
	'ababababbaaab'
];

for(const test of tests) {

	console.log(`${test} -> ${compressString(test)}`);
}
