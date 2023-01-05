
/**
 * Helper type
 */
type MapValue = {
	searchStringIndex: number,
	searchStringCharacterIndex: number
}

/**
 * Helper to add a new value to a "chars" map
 * @param map the map
 * @param char the key
 * @param value the value
 */
const addToCharsMap = (map: {[key: string]: MapValue[]}, char: string, value: MapValue): void => {

	let array = map[char];

	if(!array) {

		array = [];
		map[char] = array;
	}

	array.push(value);
};

/**
 * Helper to get a value from a "chars" map
 * @param map the map
 * @param char the key
 * @returns the value (defaulted to empty array if undefined)
 */
const getFromCharsMap = (map: {[key: string]: MapValue[]}, char: string): MapValue[] => {

	const array = map[char];
	return array ? array : [];
};

/**
 * Given a string b and an array of smaller strings T, this method searches b for each small string in T
 * @param string the main string (b)
 * @param searchStrings the search strings (T)
 * @returns the search result
 *
 * T = O(B * M + T) where B = length of main string, T = number of search strings, M = average number of possible matches (depends on the data but on average may be assumed to be small, worst case would be T)
 * S = O(T)
 */
export const multiSearchV2 = (string: string, searchStrings: string[]): boolean[] => {

	const result = [];
	const searchStringsStarterCharsMap: {[key: string]: MapValue[]} = {};

	// Initialize variables based on search strings
	for(let i = 0; i < searchStrings.length; i++) {

		if(searchStrings[i].length > 0) {

			// Add each string to the "starters" map (key is the first character of each search string, value is the arry of all search strings that start with that character)
			result[i] = false;
			addToCharsMap(searchStringsStarterCharsMap, searchStrings[i][0], {
				searchStringIndex: i,
				searchStringCharacterIndex: 0
			});
		}
		else {

			// Empty strings are a match by default
			result[i] = true;
		}
	}

	let searchStringsCurrentMatchesMap: {[key: string]: MapValue[]} = {};

	// Loop once the main string
	for(let i = 0; i < string.length; i++) {

		const currentChar = string[i];

		// Get all possible matches, i.e. all search strings that start with the current char and all search strings that continue with the current char
		const possibleMatches: MapValue[] = [];
		possibleMatches.push(...getFromCharsMap(searchStringsStarterCharsMap, currentChar));
		possibleMatches.push(...getFromCharsMap(searchStringsCurrentMatchesMap, currentChar));

		// Reset the map containing the current search strings (i.e. we throw away all partial matches that did not make it to possibleMatches)
		searchStringsCurrentMatchesMap = {};

		for(const possibleMatch of possibleMatches) {

			const { searchStringIndex, searchStringCharacterIndex } = possibleMatch;
			const searchString = searchStrings[searchStringIndex];

			if(searchStringCharacterIndex === searchString.length - 1) {

				// The current match is complete: search string found!
				result[searchStringIndex] = true;
			}
			else {

				// The current match is not complete: add it back to the current search map (with its next char as the key)
				addToCharsMap(searchStringsCurrentMatchesMap, searchString[searchStringCharacterIndex + 1], {
					searchStringIndex: searchStringIndex,
					searchStringCharacterIndex: searchStringCharacterIndex + 1
				});
			}
		}
	}

	return result;
};
