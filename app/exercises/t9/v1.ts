/**
 * Number (array index) -> corresponding T9 characters
 */
const NUMBER_TRANSLATIONS = [
	[],
	[],
	[ 'a', 'b', 'c' ],
	[ 'd', 'e', 'f' ],
	[ 'g', 'h', 'i' ],
	[ 'j', 'k', 'l' ],
	[ 'm', 'n', 'o' ],
	[ 'p', 'q', 'r', 's' ],
	[ 't', 'u', 'v' ],
	[ 'w', 'x', 'y', 'z' ]
];

type WordTreeNode = {[key: string]: WordTreeNode | undefined};

/**
 * Example of data structure to store words. Each word is a path in the tree that ends with the special child with '' key.
 */
const WORD_TREE: WordTreeNode = {
	t: {
		h: {
			a: {
				k: {
					'': undefined,
					s: {
						'': undefined
					}
				}
			},
			r: {
				e: {
					e: {
						'': undefined
					}
				}
			}
		},
		r: {
			e: {
				e: {
					'': undefined,
					l: {
						i: {
							n: {
								e: {
									'': undefined
								}
							}
						}
					}
				},
				k: {
					'': undefined
				}
			}
		}
	},
	u: {
		p: {
			'': undefined
		},
		s: {
			e: {
				'': undefined,
				d: {
					'': undefined
				}
			}
		}
	}
};

/**
 * Recursive helper to build the result
 * @param numbers the input numbers array
 * @param index the current number index
 * @param wordTreeNode the current word tree node
 * @param currentWord the current partial word
 * @param t9Matches all T9 matches (full valid words) so far
 */
const getT9MatchesHelper = (numbers: number[], index: number, wordTreeNode: WordTreeNode, currentWord: string, t9Matches: string[]): void => {

	// End of the numbers input
	if(index === numbers.length) {

		// If the current word tree node has the special child with '' key, there's a valid word that ends here
		if('' in wordTreeNode) {

			t9Matches.push(currentWord);
		}

		return;
	}

	// Loop all characters corresponding to the current number
	const number = numbers[index];
	const numberCharacters = NUMBER_TRANSLATIONS[number];
	for(const numberCharacter of numberCharacters) {

		// If the word tree continues, there's a valid (so far) word: recurse to the next number
		const childNode = wordTreeNode[numberCharacter];
		if(childNode) {

			getT9MatchesHelper(numbers, index + 1, childNode, currentWord + numberCharacter, t9Matches);
		}
	}
};

/**
 * On old cell phones, users typed on a numeric keypad and the phone would provide a list of words that matched these numbers.
 * Each digit mapped to a set of O - 4 letters.
 * This function returns a list of matching words, given a sequence of digits.
 * @param numbers the input numbers array
 * @returns all T9 matches (full valid words)
 */
export const getT9Matches = (numbers: number[]): string[] => {

	if(numbers.length === 0) {

		return [];
	}

	const t9Matches: string[] = [];
	getT9MatchesHelper(numbers, 0, WORD_TREE, '', t9Matches);
	return t9Matches;
};
