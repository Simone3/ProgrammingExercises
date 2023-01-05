import { PriorityHeap, SimplePriorityHeap } from '../../data-structures/heap';
import { Queue, SimpleQueue } from '../../data-structures/queue';

/**
 * Helper type
 */
type HeapNode = {
	arrayIndex: number,
	searchArrayIndex: number
}

/**
 * Given two arrays, one shorter (with all distinct elements) and one longer, this method finds the shortest subarray
 * in the longer array that contains all the elements in the shorter array. The items can appear in any order.
 * @param array the longer array
 * @param searchArray the shorter array
 * @returns the start and end indices (inclusive) in the longer array, undefined if no super-sequence exists
 *
 * T = O(N * log(M)) where N is the longest array length and M is the shortest array length
 * S = O(N)
 * (worst-case where each element of the longest array is in the search array)
 */
export const shortestSuperSequenceV3 = (array: number[], searchArray: number[]): [ number, number ] | undefined => {

	if(searchArray.length > array.length) {

		throw Error('Search array cannot be longer than the array!');
	}

	if(array.length === 0) {

		throw Error('Array cannot be empty!');
	}

	// Create a map starting from the search array (value -> index)
	const searchMap: {[key: number]: number} = {};
	for(let i = 0; i < searchArray.length; i++) {

		const searchElement = searchArray[i];

		if(searchMap[searchElement]) {

			throw Error('Search array elements must be unique!');
		}

		searchMap[searchElement] = i;
	}

	// Build a list of queues of search matches: each array element corresponds to the searchArray elements and its queue contains the array indices (in order) that contain that element
	// i.e. searching [ 2, 3 ] in [ 7, 2, 3, 4, 2, 1 ] we'd have:
	// [[ 1, 4 ]] -> this corresponds to search element "2": it's at indices 1 and 4 in the array
	// [[ 2 ]] -> this corresponds to search element "3": it's at index 2 in the array
	const matches: Queue<number>[] = [];
	for(let i = 0; i < array.length; i++) {

		const searchArrayIndex = searchMap[array[i]];
		if(searchArrayIndex !== undefined) {

			if(!matches[searchArrayIndex]) {

				matches[searchArrayIndex] = new SimpleQueue<number>();
			}

			matches[searchArrayIndex].add(i);
		}
	}

	// Initialize a min-heap containing the current heads of the queues of the "matches" array and a number that keeps track of the max of the heads
	const matchesHeadsHeap: PriorityHeap<HeapNode> = new SimplePriorityHeap((a, b) => {
		return b.arrayIndex - a.arrayIndex;
	});
	let maxHeadIndex = -Infinity;
	for(let i = 0; i < searchArray.length; i++) {

		if(!matches[i]) {

			// Special case: no match was found for searchArray[j] element: no super-sequence for sure
			return undefined;
		}
		
		const matchIndex = matches[i].peek();
		matchesHeadsHeap.insert({ arrayIndex: matchIndex, searchArrayIndex: i });
		maxHeadIndex = Math.max(maxHeadIndex, matchIndex);
	}

	let smallestSuperSequence: [ number, number ] = [ -Infinity, Infinity ];

	// eslint-disable-next-line no-constant-condition
	while(true) {

		// Get the data of the smallest queue head (i.e. the start of the current super-sequence)
		const currentSuperSequenceStartDescriptor = matchesHeadsHeap.poll();
		const currentSuperSequenceStartArrayIndex = currentSuperSequenceStartDescriptor.arrayIndex;
		const currentSuperSequenceStartSearchArrayIndex = currentSuperSequenceStartDescriptor.searchArrayIndex;
		const currentSuperSequenceStartQueue = matches[currentSuperSequenceStartSearchArrayIndex];

		// Get the super-sequence described by the current queue heads
		const currentSuperSequence: [ number, number ] = [ currentSuperSequenceStartArrayIndex, maxHeadIndex ];

		// Update best super-sequence if needed
		if(currentSuperSequence[1] - currentSuperSequence[0] < smallestSuperSequence[1] - smallestSuperSequence[0]) {

			smallestSuperSequence = currentSuperSequence;
		}

		// Move the column corresponding to the start of the current super-sequence, i.e. try to find a smaller super-sequence moving right
		currentSuperSequenceStartQueue.remove();

		if(currentSuperSequenceStartQueue.isEmpty()) {

			// The start of the current super-sequence cannot be moved to the right: we've explored all options
			break;
		}
		else {

			// Update min-heap and max index with new queue head
			const newSuperSequenceStartQueueHead = currentSuperSequenceStartQueue.peek();
			matchesHeadsHeap.insert({ arrayIndex: newSuperSequenceStartQueueHead, searchArrayIndex: currentSuperSequenceStartSearchArrayIndex });
			maxHeadIndex = Math.max(maxHeadIndex, newSuperSequenceStartQueueHead);
		}
	}

	return smallestSuperSequence;
};
