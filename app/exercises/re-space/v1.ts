import { Queue, SimpleQueue } from '../../data-structures/queue';
import { SimpleTreeNode, TreeNode } from '../../data-structures/tree';
import { ReSpaceResult } from './common';

/**
 * All spaces, punctuation, and capitalization have been removed in a lengthy document.
 * A sentence like "I reset the computer. It still didn't boot!" became "iresetthecomputeritstilldidntboot".
 * The goal is to re-insert the spaces. Most of the words are in a dictionary but a few are not.
 *
 * Initial setup (dictionary):
 * - T = O(D * W) where D = number of words in dictionary and W = average length of each word
 * - S = O(D * W)
 *
 * Processing single text:
 * - T = O(N * C) where N = length of the text and C = average number of "concurrent" data holders (i.e. number of dictionary words that "overlap")
 * - S = O(C)
 */
export class ReSpaceV1 {

	static readonly ROOT_VALUE = 'root';
	static readonly END_VALUE = 'end';

	/**
	 * A tree that contains all words in the dictionary
	 * Each node is a single character of a string
	 * The root is a static node with value "root", whose children are the first characters of all words
	 * All words are terminated by nodes with value "end"
	 * This could probably be implemented more efficiently (e.g. with a fixed array of characters as children), but using SimpleTreeNode for simplicity
	 */
	private readonly dictionaryTreeRoot: TreeNode<string> = new SimpleTreeNode(ReSpaceV1.ROOT_VALUE);

	/**
	 * Constructor
	 * @param dictionary list of words in the dictionary
	 */
	public constructor(dictionary: string[]) {

		this.initDictionary(dictionary);
	}

	/**
	 * Re-spaces a text
	 * @param text the text
	 * @returns the re-spacing result
	 */
	public process(text: string): ReSpaceResult {

		// Hold current temporary results in a queue
		const dataHolders: Queue<ReSpaceDataHolder> = new SimpleQueue([ this.firstDataHolder() ]);

		// Loop all characters in the text
		for(let i = 0; i < text.length; i++) {

			const character = text[i];

			let bestRestartDataHolder;

			// De-queue all current temporary results
			while(!dataHolders.isEmpty()) {

				// Only de-queue those that have been added in previous iterations
				if(dataHolders.peek().index !== i - 1) {

					break;
				}

				const dataHolder = dataHolders.remove();

				const newWord = dataHolder.currentWord + character;

				// Check if the current temporary result can continue (= there's a matching character among the current dictionary node children)
				const currentCharChild = this.getChild(dataHolder.currentNode, character);

				if(currentCharChild) {

					// There's a valid character in the dictionary: we can continue the current word
					const newContinueDataHolder = this.continueCurrentWord(dataHolder, i, character, currentCharChild);
					dataHolders.add(newContinueDataHolder);

					// Check if the current word can be terminated here
					const endWordChild = this.getChild(currentCharChild, ReSpaceV1.END_VALUE);

					if(endWordChild) {

						// The current word can be terminated here, restart a new word in the next iteration
						const newRestartDataHolder = this.finalizeCurrentText(dataHolder, i, newWord, true);
						bestRestartDataHolder = this.getBestDataHolder(bestRestartDataHolder, newRestartDataHolder);
					}
					else {
					
						// The current word cannot be terminated here, restart a new word in the next iteration anyway (maybe it will end up being better than the "continue word" temporary result)
						const newRestartDataHolder = this.continueCurrentUnrecognizedPortion(dataHolder, i, character);
						bestRestartDataHolder = this.getBestDataHolder(bestRestartDataHolder, newRestartDataHolder);
					}
				}
				else {

					// There is no valid character in the dictionary: restart a new word in the next iteration
					const newRestartDataHolder = this.continueCurrentUnrecognizedPortion(dataHolder, i, character);
					bestRestartDataHolder = this.getBestDataHolder(bestRestartDataHolder, newRestartDataHolder);
				}
			}

			// Add to the queue only the best "restart" temporary result: since we are restarting the word in the next iteration, no need to keep track of all previous options
			if(bestRestartDataHolder) {

				dataHolders.add(bestRestartDataHolder);
			}
		}

		// Finalize all temporary results in the queue and pick the best one
		let resultDataHolder;
		while(!dataHolders.isEmpty()) {

			const dataHolder = dataHolders.remove();

			const finalizedDataHolder = this.finalizeCurrentText(dataHolder, Infinity, dataHolder.currentWord, false);
			resultDataHolder = this.getBestDataHolder(resultDataHolder, finalizedDataHolder);
		}

		if(resultDataHolder) {

			return {
				text: resultDataHolder.currentText,
				unrecognizedWords: resultDataHolder.unrecognizedWords,
				unrecognizedCharactersCount: resultDataHolder.unrecognizedCharactersCount
			};
		}
		else {

			return {
				text: '',
				unrecognizedWords: [],
				unrecognizedCharactersCount: 0
			};
		}
	}

	/**
	 * Helper that initializes the dictionary tree
	 * @param dictionary list of words in the dictionary
	 */
	private initDictionary(dictionary: string[]): void {

		// Loop all dictionary words
		for(const word of dictionary) {

			// Loop all charaters of the current dictionary word
			let node = this.dictionaryTreeRoot;
			for(const character of word) {

				// Find or create a child with the current character
				node = this.getOrCreateChild(node, character);
			}

			// Add the end of the word marker
			this.getOrCreateChild(node, ReSpaceV1.END_VALUE);
		}
	}

	/**
	 * Helper to get a child of a node with the given value (character or special values like 'end')
	 * @param node the current node
	 * @param childValue the value of the child
	 * @returns the child node or undefined if no child matches
	 */
	private getChild(node: TreeNode<string>, childValue: string): TreeNode<string> | undefined {

		for(const childNode of node.children) {

			if(childNode.data === childValue) {

				return childNode;
			}
		}

		return undefined;
	}

	/**
	 * Helper to get a child of a node with the given value (character or special values like 'end'), or to create it if it does not exist
	 * @param node the current node
	 * @param childValue the value of the child
	 * @returns the child node
	 */
	private getOrCreateChild(node: TreeNode<string>, childValue: string): TreeNode<string> {

		// Search node among the existing children
		const childNode = this.getChild(node, childValue);
		if(childNode) {

			return childNode;
		}

		// Child not found: create it
		const newChildNode = new SimpleTreeNode(childValue);
		node.children.push(newChildNode);
		return newChildNode;
	}

	/**
	 * Helper to initialize the first temporary result
	 * @returns the new data holder
	 */
	private firstDataHolder(): ReSpaceDataHolder {

		return {
			index: -1,
			currentNode: this.dictionaryTreeRoot,
			currentText: '',
			currentWord: '',
			currentUnrecognizedPortion: '',
			unrecognizedWords: [],
			unrecognizedCharactersCount: 0
		};
	}

	/**
	 * Helper to clone a data holder by continuing the current word
	 * @param sourceDataHolder source data holder
	 * @param index the current index
	 * @param currentChar the current character
	 * @param currentCharChild the node corresponding to the current character
	 * @returns the new data holder
	 */
	private continueCurrentWord(sourceDataHolder: ReSpaceDataHolder, index: number, currentChar: string, currentCharChild: TreeNode<string>): ReSpaceDataHolder {

		// Update current word with the new character
		return {
			index: index,
			currentNode: currentCharChild,
			currentText: sourceDataHolder.currentText,
			currentWord: sourceDataHolder.currentWord + currentChar,
			currentUnrecognizedPortion: sourceDataHolder.currentUnrecognizedPortion,
			unrecognizedWords: [ ...sourceDataHolder.unrecognizedWords ],
			unrecognizedCharactersCount: sourceDataHolder.unrecognizedCharactersCount
		};
	}

	/**
	 * Helper to clone a data holder by continuing the unrecognized portion
	 * @param sourceDataHolder source data holder
	 * @param index the current index
	 * @param currentChar the current character
	 * @returns the new data holder
	 */
	private continueCurrentUnrecognizedPortion(sourceDataHolder: ReSpaceDataHolder, index: number, currentChar: string): ReSpaceDataHolder {

		// Reset current node and current word, update the unrecognized portion and the related counter
		return {
			index: index,
			currentNode: this.dictionaryTreeRoot,
			currentText: sourceDataHolder.currentText,
			currentWord: '',
			currentUnrecognizedPortion: sourceDataHolder.currentUnrecognizedPortion + sourceDataHolder.currentWord + currentChar,
			unrecognizedWords: [ ...sourceDataHolder.unrecognizedWords ],
			unrecognizedCharactersCount: sourceDataHolder.unrecognizedCharactersCount + sourceDataHolder.currentWord.length + 1
		};
	}

	/**
	 * Helper to clone a data holder by updating the current text with the current word and/or current unrecognized portion
	 * @param sourceDataHolder source data holder
	 * @param index the current index
	 * @param newWord the new word that is being processed
	 * @param newWordRecognized if the new word is recognized or not
	 * @returns the new data holder
	 */
	private finalizeCurrentText(sourceDataHolder: ReSpaceDataHolder, index: number, newWord: string, newWordRecognized: boolean): ReSpaceDataHolder {

		const currentText = sourceDataHolder.currentText;
		const currentUnrecognizedPortion = newWordRecognized ? sourceDataHolder.currentUnrecognizedPortion : sourceDataHolder.currentUnrecognizedPortion + newWord;
		const currentRecognizedWord = newWordRecognized ? newWord : '';
		const currentUnrecognizedCharactersCount = newWordRecognized ? sourceDataHolder.unrecognizedCharactersCount : sourceDataHolder.unrecognizedCharactersCount + newWord.length;

		const newTextArray = [];
		const newUnrecognizedWords = [ ...sourceDataHolder.unrecognizedWords ];

		if(currentText) {

			newTextArray.push(currentText);
		}

		if(currentUnrecognizedPortion) {

			newUnrecognizedWords.push(currentUnrecognizedPortion);

			newTextArray.push(currentUnrecognizedPortion);
		}

		if(currentRecognizedWord) {

			newTextArray.push(currentRecognizedWord);
		}
		
		return {
			index: index,
			currentNode: this.dictionaryTreeRoot,
			currentText: newTextArray.join(' '),
			currentWord: '',
			currentUnrecognizedPortion: '',
			unrecognizedWords: newUnrecognizedWords,
			unrecognizedCharactersCount: currentUnrecognizedCharactersCount
		};
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

	index: number;
	currentNode: TreeNode<string>;
	currentText: string;
	currentWord: string;
	currentUnrecognizedPortion: string;
	unrecognizedWords: string[];
	unrecognizedCharactersCount: number;
}
