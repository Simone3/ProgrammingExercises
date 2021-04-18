type Color = 'R' | 'Y' | 'G' | 'B';

const COLORS: Color[] = [ 'R', 'Y', 'G', 'B' ];

/**
 * The Game of Master Mind is played as follows: the computer has four slots, and each slot will contain a ball that is red (R), yellow (Y), green (G) or blue (B).
 * For example, the computer might have RGGB (Slot #1 is red, Slots #2 and #3 are green, Slot #4 is blue).
 * You, the user, are trying to guess the solution. You might, for example, guess YRGB.
 * When you guess the correct color for the correct slot, you get a "hit". If you guess a color that exists but is in the wrong slot, you get a "pseudo-hit".
 * Note that a slot that is a hit can never count as a pseudo-hit. For example, if the actual solution is RGBY and you guess GGRR, you have one hit and one pseudohit.
 * This method, given a guess and a solution, returns the number of hits and pseudo-hits.
 * @param solution the solution
 * @param guess the guess
 * @returns the result
 */
export const getMasterMindResult = (solution: Color[], guess: Color[]): { hits: number, pseudohits: number } => {

	if(solution.length !== guess.length) {

		throw Error('Invalid guess');
	}

	let hits = 0;
	const solutionCounters: {[key: string]: number} = {};
	const guessCounters: {[key: string]: number} = {};
	for(let i = 0; i < solution.length; i++) {

		const solutionColor = solution[i];
		const guessColor = guess[i];
		if(solutionColor === guessColor) {

			// Simply count hits
			hits += 1;
		}
		else {

			// Count all color occurrences in the solution (hits excluded)
			const solutionCounter = solutionCounters[solutionColor];
			solutionCounters[solutionColor] = solutionCounter ? solutionCounter + 1 : 1;
			
			// Count all color occurrences in the guess (hits excluded)
			const guessCounter = guessCounters[guessColor];
			guessCounters[guessColor] = guessCounter ? guessCounter + 1 : 1;
		}
	}

	// Compare color occurrences in the solution and the guess for pseudohits
	let pseudohits = 0;
	for(const color of COLORS) {

		const solutionCounter = solutionCounters[color];
		const guessCounter = guessCounters[color];

		if(solutionCounter && guessCounter) {

			pseudohits += Math.min(solutionCounter, guessCounter);
		}
	}

	return { hits, pseudohits };
};

const tests: [ Color[], Color[] ][] = [
	[[ 'R', 'G', 'B', 'Y' ], [ 'R', 'G', 'B', 'Y' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'R', 'G', 'B', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'B', 'G', 'B', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'B', 'B', 'B', 'B' ]],
	[[ 'R', 'G', 'B', 'B' ], [ 'R', 'G', 'B', 'Y' ]],
	[[ 'B', 'G', 'B', 'B' ], [ 'R', 'G', 'B', 'Y' ]],
	[[ 'B', 'B', 'B', 'B' ], [ 'R', 'G', 'B', 'Y' ]],
	[[ 'R', 'G', 'B', 'B' ], [ 'R', 'G', 'B', 'B' ]],
	[[ 'B', 'G', 'B', 'B' ], [ 'B', 'G', 'B', 'B' ]],
	[[ 'B', 'B', 'G', 'B' ], [ 'B', 'G', 'B', 'B' ]],
	[[ 'B', 'B', 'B', 'B' ], [ 'B', 'B', 'B', 'B' ]],
	[[ 'B', 'B', 'B', 'B' ], [ 'Y', 'Y', 'Y', 'Y' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'Y', 'B', 'G', 'R' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'Y', 'B', 'G', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'G', 'B', 'G', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'G', 'G', 'G', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'G', 'G', 'R', 'R' ]]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const result = getMasterMindResult(test[0], test[1]);
	console.log(`${test[0].join('')} = ${test[1].join('')} ---> ${result.hits} hit(s), ${result.pseudohits} pseudohit(s)`);
}
