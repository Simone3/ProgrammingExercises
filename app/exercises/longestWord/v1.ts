import { LongestWordResult } from './common';

/**
 * Recursive helper for longestWord
 * @param word current word
 * @param wordsMap a map of all words
 * @param memoMap map of memoized results
 * @returns the subwords that make up the given word (empty array if none found)
 */
const longestWordHelper = (word: string, wordsMap: {[key: string]: boolean}, memoMap: {[key: string]: string[] | undefined}): string[] => {

	// Base case: just check if word is in the dictionary
	if(word.length === 1) {

		return wordsMap[word] ? [ word ] : [];
	}

	// Memoized results
	const memoizedResult = memoMap[word];
	if(memoizedResult) {

		return memoizedResult;
	}

	// Iterate on all possible splits of the current word
	let result: string[] = [];
	for(let splitIndex = 1; splitIndex < word.length; splitIndex++) {

		// Recurse on left side
		const subStringLeft = word.slice(0, splitIndex);
		const subResultLeft = wordsMap[subStringLeft] ? [ subStringLeft ] : longestWordHelper(subStringLeft, wordsMap, memoMap);

		if(subResultLeft.length > 0) {
			
			// Recurse on right side
			const subStringRight = word.slice(splitIndex, word.length);
			const subResultRight = wordsMap[subStringRight] ? [ subStringRight ] : longestWordHelper(subStringRight, wordsMap, memoMap);

			// Both left and right have matches, we found a result
			if(subResultRight.length > 0) {

				result = [ ...subResultLeft, ...subResultRight ];
				break;
			}
		}
	}

	memoMap[word] = result;

	return result;
};

/**
 * Given a list of words, this function finds the longest word made of other words in the list
 * @param words the list of words
 * @returns the longest word made with other words or undefined if not present
 *
 * T = O(N * W!) where N is the number of words and W the average word length |
 * S = O(N * W!)                                                              |-- these are without memoization
 */
export const longestWordV1 = (words: string[]): LongestWordResult | undefined => {

	if(words.length <= 2) {

		return undefined;
	}

	const wordsMap: {[key: string]: boolean} = {};
	for(const word of words) {

		if(word.length > 0) {

			wordsMap[word] = true;
		}
	}

	const memoMap: {[key: string]: string[] | undefined} = {};

	let result: LongestWordResult | undefined;
	for(const word of words) {

		if(word.length > 0) {

			// Try all words that may be a valid result
			if(!result || result.longestWord.length < word.length) {

				// Call the helper and try to split the current word in 2 or more other words
				const helperResult = longestWordHelper(word, wordsMap, memoMap);
				if(helperResult.length > 0) {

					result = {
						longestWord: word,
						words: helperResult
					};
				}
			}
		}
	}

	return result;
};
