/**
 * Determines if a string is one (or zero) edits (insert a character, remove a character, or replace a character) away from another string.
 * T = O(N)
 * S = O(1)
 * @param source the source input string
 * @param target the target input string
 * @returns true if the strings are 0 or 1 edits away from each other
 */
export const oneAway = (source: string, target: string): boolean => {

	// Compute some helper vars, for convenience
	const long = source.length > target.length ? source : target;
	const short = source.length <= target.length ? source : target;
	const areSameLength = source.length === target.length;

	// No need to check if the two strings are too different in length or they are both empty
	if(long.length - short.length > 1) {

		return false;
	}
	else if(!long && !short) {

		return true;
	}

	// Loop both strings in parallel
	let foundFirstDifference = false;
	for(let i = 0, j = 0; i < long.length; i++, j++) {

		if(long[i] !== short[j]) {

			// If we already found one difference in the past, they are not 1 edit away
			if(foundFirstDifference) {

				return false;
			}

			if(areSameLength) {

				// If the strings have the same length, we can only have one replace edit
				foundFirstDifference = true;
			}
			else {

				// If one is longer than the other, the only option is to remove the extra character from the long one
				i += 1;
				foundFirstDifference = true;
			}
		}
	}

	return true;
};

const tests: string[][] = [
	[ '', '' ],
	[ 'a', 'a' ],
	[ 'abcdef', 'abcdef' ],
	[ 'xbcdef', 'abcdef' ],
	[ 'abxdef', 'abcdef' ],
	[ 'abcdex', 'abcdef' ],
	[ 'abcef', 'abcdef' ],
	[ 'bcdef', 'abcdef' ],
	[ 'abcde', 'abcdef' ],
	[ 'abcdef', 'bcdef' ],
	[ 'abcdef', 'abcdf' ],
	[ 'abcdef', 'abcde' ],
	[ 'axcdyf', 'abcdef' ],
	[ 'xbcdey', 'abcdef' ],
	[ 'abxyef', 'abcdef' ],
	[ 'abcdef', 'abcdxy' ],
	[ 'xycdef', 'abcdef' ],
	[ 'abcdef', 'abcdefgh' ],
	[ 'abcdefgh', 'abcdef' ],
	[ 'xbcdef', 'abcde' ],
	[ 'xbcde', 'abcdef' ]
];

for(const test of tests) {

	console.log(`${test} -> ${oneAway(test[0], test[1])}`);
}
