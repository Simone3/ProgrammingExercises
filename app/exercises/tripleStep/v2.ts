import { Queue, SimpleQueue } from '../../data-structures/queue';

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
