/**
 * Recursive helper for getPermutationsWithoutDups()
 * @param string the source string (without duplicates)
 * @returns the list of permutations
 */
const getPermutationsWithoutDupsHelper = (string: string): string[] => {

	const length = string.length;

	if(length === 2) {

		return [
			string,
			string[1] + string[0]
		];
	}
	else {

		const result: string[] = [];

		const substringLength = length - 1;
		const substring = string.substr(0, substringLength);
		const lastChar = string[substringLength];

		const substringPermutations = getPermutationsWithoutDupsHelper(substring);

		for(const substringPermutation of substringPermutations) {

			result.push(`${lastChar}${substringPermutation}`);

			for(let i = 1; i < substringLength; i++) {

				result.push(`${substringPermutation.substr(0, i)}${lastChar}${substringPermutation.substr(i)}`);
			}

			result.push(`${substringPermutation}${lastChar}`);
		}

		return result;
	}
};

/**
 * Computes all permutations of a string of unique characters
 * T = O(N! * N^2)
 * S = O(N!)
 * @param string the source string (without duplicates)
 * @returns the list of permutations
 */
export const getPermutationsWithoutDups = (string: string): string[] => {

	return string.length > 1 ? getPermutationsWithoutDupsHelper(string) : [ string ];
};

const tests: string[] = [
	'',
	'a',
	'ab',
	'abc',
	'abcd',
	'abcdefg'
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const permutations = getPermutationsWithoutDups(test);
	console.log(`${test} -----> [${permutations.join(', ')}]`);
}
