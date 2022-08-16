import { PriorityHeap, SimplePriorityHeap } from '../../data-structures/heap';

/**
 * Finds the smallest K numbers in an array
 * @param array the source array
 * @param count the number of elements to find (K)
 * @returns the K smallest numbers
 *
 * T = O(N * log K)
 * S = O(K)
 */
export const getSmallestV4 = (array: number[], count: number): number[] => {

	if(count <= 0 || count > array.length) {

		throw Error('Invalid number of elements!');
	}
	
	if(count === array.length) {

		return [ ...array ];
	}

	const heap: PriorityHeap<number> = new SimplePriorityHeap((a, b) => {
		return a - b;
	});

	for(let i = 0; i < count; i++) {

		heap.insert(array[i]);
	}

	for(let i = count; i < array.length; i++) {

		if(array[i] < heap.peek()) {

			heap.poll();
			heap.insert(array[i]);
		}
	}

	const result = [];

	while(!heap.isEmpty()) {

		result.push(heap.poll());
	}

	return result;
};
