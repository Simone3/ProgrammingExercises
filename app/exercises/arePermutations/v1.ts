/**
 * Determines if two strings are permutations, assuming ASCII characters
 * T = O(N)
 * S = O(1) (map of max 128 keys)
 * @param first the first input string
 * @param second the second input string
 * @returns true if the strings are permutations
 */
export const arePermutations = (first: string, second: string): boolean => {

	// No need to check if the two strings have different length
	if(first.length !== second.length) {

		return false;
	}

	// Count all characters of the first string in a map
	const map: {[key: string]: number} = {};
	for(const char of first) {

		const current = map[char];
		map[char] = current ? current + 1 : 1;
	}

	// Decrease counts in the map for each character of the second
	for(const char of second) {

		const current = map[char];
		if(!current) {

			// If "char" is not in the first string or there are more "char" occurrences in the second string than in the first, they are not permutations
			return false;
		}
		else {

			map[char] = current - 1;
		}
	}

	// All counts are equal, they are permutations
	return true;
};
