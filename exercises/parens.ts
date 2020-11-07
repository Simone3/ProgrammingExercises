/**
 * Recursive helper for getParensCombinations()
 * @param parensToOpen parens to be opened remaining
 * @param parensToClose parens to be closed remaining
 * @param combinationSoFar current partial result
 * @param combinations all results so far
 */
const getParensCombinationsHelper = (parensToOpen: number, parensToClose: number, combinationSoFar: string, combinations: string[]): void => {

	if(parensToOpen === 0 && parensToClose === 0) {

		combinations.push(combinationSoFar);
		return;
	}
	
	if(parensToOpen > 0) {

		getParensCombinationsHelper(parensToOpen - 1, parensToClose, `${combinationSoFar}(`, combinations);
	}

	if(parensToClose > 0 && parensToOpen < parensToClose) {

		getParensCombinationsHelper(parensToOpen, parensToClose - 1, `${combinationSoFar})`, combinations);
	}
};

/**
 * Returns all valid (e.g., properly opened and closed) combinations of n pairs of parentheses
 * @param parensNumber the number of parens
 * @returns all valid combinations
 */
export const getParensCombinations = (parensNumber: number): string[] => {

	if(parensNumber <= 0) {

		return [];
	}
	else {

		const combinations: string[] = [];
		getParensCombinationsHelper(parensNumber - 1, parensNumber, '(', combinations);
		return combinations;
	}
};

const tests: number[] = [
	0,
	1,
	2,
	3,
	4
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const combinations = getParensCombinations(test);
	console.log(`${test} -----> ${combinations.join(', ')}`);
}
