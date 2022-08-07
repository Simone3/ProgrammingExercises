/**
 * Given any two words in a large text file, finds the shortest distance (in terms of number of words) between them in the file.
 */
export class WordDistanceV1 {

	private readonly SEPARATORS = [ ' ', '\r', '\n', '.', ',', '!', '?', ':', '"' ];

	private readonly wordsOccurrences: {[key: string]: number[]} = {};

	public constructor(text: string) {

		this.parseText(text);
	}

	/**
	 * Gets the sorted distane between two words
	 * @param word1 first word
	 * @param word2 second word
	 * @returns shorted distance or undefined if one or both words are not in the text
	 */
	public getDistance(word1: string, word2: string): number | undefined {

		const word1Occurrences = this.wordsOccurrences[word1.toLowerCase()];
		const word2Occurrences = this.wordsOccurrences[word2.toLowerCase()];

		if(!word1Occurrences || !word2Occurrences) {

			// One or both words are not in the text
			return undefined;
		}

		if(word1 === word2) {

			// Word is the same
			return 0;
		}

		// To get the sortest distance simply loop both arrays advancing one index or the other
		let smallestDistance = Infinity;
		let i1 = 0;
		let i2 = 0;
		while(i1 < word1Occurrences.length && i2 < word2Occurrences.length) {

			const currentOccurrence1 = word1Occurrences[i1];
			const currentOccurrence2 = word2Occurrences[i2];

			const currentDistance = Math.abs(currentOccurrence2 - currentOccurrence1);
			if(currentDistance < smallestDistance) {

				smallestDistance = currentDistance;
			}

			if(currentOccurrence2 > currentOccurrence1) {

				i1 += 1;
			}
			else {

				i2 += 1;
			}
		}

		return smallestDistance - 1;
	}

	/**
	 * Very basic text parser
	 * @param text source text
	 */
	private parseText(text: string): void {

		let wordIndex = 0;
		let currentWord = '';
		for(let i = 0; i < text.length; i++) {

			const char = text[i];
			if(this.SEPARATORS.includes(char)) {

				if(currentWord.length > 0) {

					this.addWordOccurrence(currentWord, wordIndex);
					currentWord = '';
					wordIndex += 1;
				}
			}
			else {

				currentWord += char.toLowerCase();
			}
		}

		if(currentWord.length > 0) {

			this.addWordOccurrence(currentWord, wordIndex);
		}
	}

	private addWordOccurrence(word: string, wordIndex: number): void {

		let occurrences = this.wordsOccurrences[word];
		if(occurrences === undefined) {

			occurrences = [];
			this.wordsOccurrences[word] = occurrences;
		}
		occurrences.push(wordIndex);
	}
}
