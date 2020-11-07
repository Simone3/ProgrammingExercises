/**
 * Recursive helper for getPermutationsWithDups()
 * @param uniqueChars a string of all unique characters
 * @param charsCounts the counter for each of the unique characters
 * @param resultSoFar the partial string result of this recursive branch
 * @param results all results
 */
const getPermutationsWithDupsHelper = (uniqueChars: string, charsCounts: number[], resultSoFar: string, results: string[]): void => {

	let isLast = true;

	for(let i = 0; i < uniqueChars.length; i++) {

		const charCount = charsCounts[i];

		if(charCount > 0) {

			getPermutationsWithDupsHelper(uniqueChars, [ ...charsCounts.slice(0, i), charCount - 1, ...charsCounts.slice(i + 1, uniqueChars.length) ], `${resultSoFar}${uniqueChars[i]}`, results);
			isLast = false;
		}
	}

	if(isLast) {

		results.push(resultSoFar);
	}
};

/**
 * Helper to transform a string with possibily non-unique charaters into a string of unique characters and an array of character counters
 * @param string the source string
 * @returns the unique characters (as a string) and their counts (as a number array)
 */
const getCharsCount = (string: string): { uniqueChars: string, charsCount: number[] } => {

	const charMap = new Map<string, number>();
	for(const char of string.split('')) {

		const charMapValue = charMap.get(char);
		if(charMapValue) {

			charMap.set(char, charMapValue + 1);
		}
		else {

			charMap.set(char, 1);
		}
	}

	const uniqueChars: string[] = [];
	const charsCount: number[] = [];
	for(const charMapEntry of charMap.entries()) {

		uniqueChars.push(charMapEntry[0]);
		charsCount.push(charMapEntry[1]);
	}

	return {
		uniqueChars: uniqueChars.join(''),
		charsCount: charsCount
	};
};

/**
 * Computes all permutations of a string of possibly non-unique characters
 * T = O(N! * N^2)
 * S = O(N!)
 * @param string the source string
 * @returns the list of permutations
 */
export const getPermutationsWithDups = (string: string): string[] => {

	if(string.length > 1) {

		const charsCountResult = getCharsCount(string);
		const results: string[] = [];
		getPermutationsWithDupsHelper(charsCountResult.uniqueChars, charsCountResult.charsCount, '', results);
		return results;
	}
	else {

		return [ string ];
	}
};

const tests: string[] = [
	'',
	'a',
	'ab',
	'abc',
	'abcd',
	'aaaaa',
	'aabaa',
	'caaba',
	'abcbd'
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const permutations = getPermutationsWithDups(test);
	console.log(`${test} -----> [${permutations.join(', ')}]`);
}
