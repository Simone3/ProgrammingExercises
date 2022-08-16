
import { ReSpaceResult } from './common';

/**
 * All spaces, punctuation, and capitalization have been removed in a lengthy document.
 * A sentence like "I reset the computer. It still didn't boot!" became "iresetthecomputeritstilldidntboot".
 * The goal is to re-insert the spaces. Most of the words are in a dictionary but a few are not.
 */
export class ReSpaceV2 {

	/**
	 * Map whose keys are all dictionary words
	 */
	private readonly dictionaryMap: {[key: string]: boolean} = {};

	/**
	 * Map whose keys are all sub(texts)
	 */
	private readonly memoizationMap: {[key: string]: ReSpaceDataHolder} = {};

	/**
	 * Constructor
	 * @param dictionary list of words in the dictionary
	 */
	public constructor(dictionary: string[]) {

		for(const word of dictionary) {

			this.dictionaryMap[word] = true;
		}
	}

	/**
	 * Re-spaces a text
	 * @param text the text
	 * @returns the re-spacing result
	 */
	public process(text: string): ReSpaceResult {

		if(!text) {

			return {
				text: '',
				unrecognizedWords: [],
				unrecognizedCharactersCount: 0
			};
		}

		const memoizationMap: {[key: string]: ReSpaceDataHolder} = {};

		const resultDataHolder = this.recursiveProcess(text, memoizationMap);

		return {
			text: resultDataHolder.text,
			unrecognizedWords: resultDataHolder.unrecognizedWords,
			unrecognizedCharactersCount: resultDataHolder.unrecognizedCharactersCount
		};
	}

	/**
	 * Recursive helper
	 * @param text current (sub)text
	 * @param memoizationMap the helper map to avoid re-processing
	 * @returns the best result for the current (sub)text
	 */
	private recursiveProcess(text: string, memoizationMap: {[key: string]: ReSpaceDataHolder}): ReSpaceDataHolder {

		// Memoization map holds all (sub)texts that have previously been processed, simply return the result if found
		const memoizedDataHolder = memoizationMap[text];
		if(memoizedDataHolder) {

			return memoizedDataHolder;
		}

		// If the whole text is in the dictionary, return immediately: there cannot be a better result
		if(this.dictionaryMap[text]) {

			return {
				text: text,
				unrecognizedWords: [],
				unrecognizedCharactersCount: 0,
				firstWordRecognized: true,
				lastWordRecognized: true
			};
		}

		// The initial best result is the whole word completely unrecognized
		let bestResult: ReSpaceDataHolder = {
			text: text,
			unrecognizedWords: [ text ],
			unrecognizedCharactersCount: text.length,
			firstWordRecognized: false,
			lastWordRecognized: false
		};

		// If the string is a single character, no need to go further: the character is unrecognized
		if(text.length === 1) {

			return bestResult;
		}

		for(let i = 1; i < text.length; i++) {

			// Split the string in two "moving" parts
			const firstPart = text.substring(0, i);
			const secondPart = text.substring(i, text.length);

			// Recurse on both halves
			const firstDataHolder = this.recursiveProcess(firstPart, memoizationMap);
			const secondDataHolder = this.recursiveProcess(secondPart, memoizationMap);

			// Join the results of the two halves
			const newDataHolder: ReSpaceDataHolder = {
				text: firstDataHolder.text + (firstDataHolder.lastWordRecognized || secondDataHolder.firstWordRecognized ? ' ' : '') + secondDataHolder.text,
				unrecognizedWords: [ ...firstDataHolder.unrecognizedWords, ...secondDataHolder.unrecognizedWords ],
				unrecognizedCharactersCount: firstDataHolder.unrecognizedCharactersCount + secondDataHolder.unrecognizedCharactersCount,
				firstWordRecognized: firstDataHolder.firstWordRecognized,
				lastWordRecognized: secondDataHolder.lastWordRecognized
			};

			// Keep track of the best result for the current text
			bestResult = this.getBestDataHolder(bestResult, newDataHolder);
		}

		this.memoizationMap[text] = bestResult;

		return bestResult;
	}

	/**
	 * Helper to pick the best data holder between two
	 * @param referenceDataHolder the reference data holder
	 * @param newDataHolder the new data holder
	 * @returns one of the two input data holders
	 */
	private getBestDataHolder(referenceDataHolder: ReSpaceDataHolder | undefined, newDataHolder: ReSpaceDataHolder): ReSpaceDataHolder {

		if(!referenceDataHolder) {

			return newDataHolder;
		}

		if(referenceDataHolder.unrecognizedCharactersCount === newDataHolder.unrecognizedCharactersCount) {

			if(referenceDataHolder.unrecognizedWords.length > newDataHolder.unrecognizedWords.length) {

				return newDataHolder;
			}
			else {

				return referenceDataHolder;
			}
		}
		else if(referenceDataHolder.unrecognizedCharactersCount > newDataHolder.unrecognizedCharactersCount) {

			return newDataHolder;
		}
		else {

			return referenceDataHolder;
		}
	}
}

/**
 * Helper object for temporary data
 */
interface ReSpaceDataHolder {

	text: string;
	unrecognizedWords: string[];
	unrecognizedCharactersCount: number;
	firstWordRecognized: boolean;
	lastWordRecognized: boolean;
}
