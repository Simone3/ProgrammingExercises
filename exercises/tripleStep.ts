import { Queue, SimpleQueue } from './data-structures/queue';

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

/**
 * @see `tripleStepV1()`
 * T = O(3^N)
 * S = O(N)
 * @param stepsNumber the number of steps
 * @returns the number of all ways
 */
export const tripleStepV2 = (stepsNumber: number): number => {

	const queue: Queue<number> = new SimpleQueue();
	queue.add(stepsNumber);

	let numberOfWays = 0;

	while(!queue.isEmpty()) {

		const current = queue.remove();
		
		if(current === 1 || current === 2 || current === 3) {

			numberOfWays += 1;
		}

		if(current > 1) {

			queue.add(current - 1);
		}

		if(current > 2) {
			
			queue.add(current - 2);
		}

		if(current > 3) {
			
			queue.add(current - 3);
		}
	}

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

console.log('\n\n**********************\n\n');
for(let stepsNumber = 1; stepsNumber <= 30; stepsNumber++) {

	console.log(`${stepsNumber} -> ${tripleStepV3(stepsNumber)}`);
}
