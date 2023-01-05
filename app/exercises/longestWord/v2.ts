import { Queue, SimpleQueue } from '../../data-structures/queue';
import { LongestWordResult } from './common';

/**
 * Helper type for partial results
 */
interface PotentialResult {

	word: string;
	currentWordIndex: number;
	subWords: string[];
}

/**
 * Checks if the sub-word is a sub-string of the word starting from the given index
 * @param word the word
 * @param potentialSubWord the sub-word
 * @param wordStartIndex the starting index of the word
 * @returns true if it is a sub-string
 */
const subStringEqual = (word: string, potentialSubWord: string, wordStartIndex: number): boolean => {

	// Sub-word would overflow, not a match for sure
	if(word.length - wordStartIndex < potentialSubWord.length) {

		return false;
	}

	// Simply compare the (current section of the) word and the sub-word
	for(let i = wordStartIndex, j = 0; i < word.length && j < potentialSubWord.length; i++, j++) {

		if(word[i] !== potentialSubWord[j]) {

			return false;
		}
	}

	return true;
};

/**
 * Initializes a partial result, if the sub-word matches the start of the word
 * @param word the word
 * @param potentialSubWord the sub-word
 * @param potentialResultsQueue the queue of all partial results
 */
const initPotentialResult = (word: string, potentialSubWord: string, potentialResultsQueue: Queue<PotentialResult>): void => {

	// If the sub-word matches the start of the word, initialize a potential result
	if(subStringEqual(word, potentialSubWord, 0)) {

		potentialResultsQueue.add({
			word: word,
			subWords: [ potentialSubWord ],
			currentWordIndex: potentialSubWord.length
		});
	}
};

/**
 * Handles a partial result, cloning it in the queue if the sub-word continues the result
 * @param potentialResult the current partial result
 * @param potentialSubWord the sub-word
 * @param potentialResultsQueue  the queue of all partial results
 * @param result the current result
 * @returns possibly the new, better result
 */
const managePotentialResult = (potentialResult: PotentialResult, potentialSubWord: string, potentialResultsQueue: Queue<PotentialResult>, result: LongestWordResult | undefined): LongestWordResult | undefined => {

	const {
		word,
		currentWordIndex,
		subWords
	} = potentialResult;

	// Check if the sub-word continues the current potential result
	if(subStringEqual(word, potentialSubWord, currentWordIndex)) {

		const newWordIndex = currentWordIndex + potentialSubWord.length;
		const newSubWords = [ ...subWords, potentialSubWord ];

		if(newWordIndex === word.length) {

			// If the word is actually complete, check if we found a better final result
			if(!result || result.longestWord.length < word.length) {

				return {
					longestWord: word,
					words: newSubWords
				};
			}
		}
		else {

			// Re-add the potential result to the queue for next iterations
			potentialResultsQueue.add({
				word: word,
				subWords: newSubWords,
				currentWordIndex: newWordIndex
			});
		}
	}

	return result;
};

/**
 * Given a list of words, this function finds the longest word made of other words in the list
 * @param words the list of words
 * @returns the longest word made with other words or undefined if not present
 *
 * T = O(N^2 * W) where N is the number of words and W the average word length
 * S = O(N^2 * W)
 */
export const longestWordV2 = (words: string[]): LongestWordResult | undefined => {

	if(words.length <= 2) {

		return undefined;
	}

	const potentialResultsQueue: Queue<PotentialResult> = new SimpleQueue();

	// Loop on every non-empty pair of words (i and j)
	for(let i = 0; i < words.length - 1; i++) {

		const first = words[i];

		if(first.length > 0) {

			for(let j = i; j < words.length; j++) {

				const second = words[j];

				if(second.length > 0) {

					// If the shortest word matches the start of the longest word, add them to the potential results
					if(first.length > second.length) {

						initPotentialResult(first, second, potentialResultsQueue);
					}
					else if(first.length < second.length) {

						initPotentialResult(second, first, potentialResultsQueue);
					}
				}
			}
		}
	}

	let result: LongestWordResult | undefined;

	// Dequeue all potential results
	while(!potentialResultsQueue.isEmpty()) {

		const potentialResult = potentialResultsQueue.remove();

		for(const potentialSubWord of words) {

			if(potentialSubWord.length > 0) {
		
				// Check if a word can continue the potential result
				result = managePotentialResult(potentialResult, potentialSubWord, potentialResultsQueue, result);
			}
		}
	}

	return result;
};
