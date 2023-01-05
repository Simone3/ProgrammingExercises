/**
 * Given a string b and an array of smaller strings T, this method searches b for each small string in T
 * @param string the main string (b)
 * @param searchStrings the search strings (T)
 * @returns the search result
 *
 * T = O(B * T * W) where B = length of main string, T = number of search strings, W = average length of each search string [single string "includes" is O(B * W) with a simple/naive implementation]
 * S = O(1)
 */
export const multiSearchV1 = (string: string, searchStrings: string[]): boolean[] => {

	const matches = [];

	for(let i = 0; i < searchStrings.length; i++) {

		matches[i] = string.includes(searchStrings[i]);
	}

	return matches;
};
