/**
 * Determines if a string has all unique characters, assuming ASCII characters
 * T = O(N) (or even O(1), no more than 128 iterations!)
 * S = O(1) (map of max 128 keys)
 * @param input the input string
 * @returns true if all characters are unique
 */
export const hasUniqueCharacters = (input: string): boolean => {

	// At most 128 characters in ASCII, if the string is longer than than it must have duplicates
	if(input.length > 128) {

		return false;
	}

	// Use a map to check for duplicates
	const map: {[key: string]: boolean} = {};
	for(const char of input) {

		if(map[char]) {

			return false;
		}

		map[char] = true;
	}

	return true;
};

/**
 * Determines if a string has all unique characters without using any other collection, assuming ASCII characters
 * T = O(N logN) (sort)
 * S = O(N) (split)
 * @param input the input string
 * @returns true if all characters are unique
 */
export const hasUniqueCharactersWithoutOtherCollections = (input: string): boolean => {

	// At most 128 characters in ASCII, if the string is longer than than it must have duplicates
	if(input.length > 128) {

		return false;
	}

	// Sort the input string
	input = input.split('').sort().join('');

	// Check if there are two adjacent duplicates
	for(let i = 1; i < input.length; i++) {

		if(input[i - 1] === input[i]) {

			return false;
		}
	}
	
	return true;
};
