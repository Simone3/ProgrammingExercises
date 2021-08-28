/**
 * Recursive helper for `tripleStepV3()`
 * @param stepsNumber the number of steps
 * @param cache memoization array
 * @returns the number of all ways
 */
export const tripleStepRecursiveHelperV3 = (stepsNumber: number, cache: number[]): number => {

	let numberOfWays = 0;

	if(stepsNumber === 1 || stepsNumber === 2 || stepsNumber === 3) {

		numberOfWays += 1;
	}

	if(stepsNumber > 1) {

		const cachedNumberOfWays = cache[stepsNumber - 1];
		numberOfWays += cachedNumberOfWays === undefined ? tripleStepRecursiveHelperV3(stepsNumber - 1, cache) : cachedNumberOfWays;
	}

	if(stepsNumber > 2) {
		
		const cachedNumberOfWays = cache[stepsNumber - 2];
		numberOfWays += cachedNumberOfWays === undefined ? tripleStepRecursiveHelperV3(stepsNumber - 2, cache) : cachedNumberOfWays;
	}

	if(stepsNumber > 3) {
		
		const cachedNumberOfWays = cache[stepsNumber - 3];
		numberOfWays += cachedNumberOfWays === undefined ? tripleStepRecursiveHelperV3(stepsNumber - 3, cache) : cachedNumberOfWays;
	}

	cache[stepsNumber] = numberOfWays;

	return numberOfWays;
};

/**
 * @see `tripleStepV1()`
 * T = O(N)
 * S = O(N)
 * @param stepsNumber the number of steps
 * @returns the number of all ways
 */
export const tripleStepV3 = (stepsNumber: number): number => {

	if(stepsNumber <= 0) {

		throw Error('Invalid number of steps');
	}

	const cache: number[] = [];
	cache.length = stepsNumber;

	return tripleStepRecursiveHelperV3(stepsNumber, cache);
};

