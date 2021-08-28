/**
 * Recursive helper for `tripleStepV1()`
 * @param stepsNumber the number of steps
 * @returns the number of all ways
 */
export const tripleStepRecursiveHelperV1 = (stepsNumber: number): number => {

	let numberOfWays = 0;

	if(stepsNumber === 1 || stepsNumber === 2 || stepsNumber === 3) {

		numberOfWays += 1;
	}

	if(stepsNumber > 1) {

		numberOfWays += tripleStepRecursiveHelperV1(stepsNumber - 1);
	}

	if(stepsNumber > 2) {
		
		numberOfWays += tripleStepRecursiveHelperV1(stepsNumber - 2);
	}

	if(stepsNumber > 3) {
		
		numberOfWays += tripleStepRecursiveHelperV1(stepsNumber - 3);
	}

	return numberOfWays;
};

/**
 * A child is running up a staircase with `stepsNumber` steps and can hop either 1 step, 2 steps, or 3 steps at a time.
 * This function counts how many possible ways the child can run up the stairs.
 * T = O(3^N)
 * S = O(N)
 * @param stepsNumber the number of steps
 * @returns the number of all ways
 */
export const tripleStepV1 = (stepsNumber: number): number => {

	if(stepsNumber <= 0) {

		throw Error('Invalid number of steps');
	}

	return tripleStepRecursiveHelperV1(stepsNumber);
};
