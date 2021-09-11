/**
 * A majority element is an element that makes up more than half of the items in an array.
 * Given a positive integers array, finds the majority element.
 * T = O(N)
 * S = O(1)
 * @param array the array
 * @returns the majority element, if any
 */
export const majorityElementV2 = (array: number[]): number | undefined => {

	// Loop each element of the array as a possible candidate for majority element
	// The idea is to check "i" as a possible candidate until it's a valid majority element in the subarray starting from "i"
	// This works because, altough "i" could still be the majority element later on if all its peers are at the end of the array, I'll encounter those peers later on
	let currentCandidate;
	for(let i = 0; i < array.length; i++) {

		// Element at "i" is the value I'll check in the current sub-array
		currentCandidate = array[i];

		// Keep track of the number of elements equal and not equal to the candidate in the current sub-array
		let countEquals = 1;
		let countNotEquals = 0;

		// Sub-array starts at "i" but since "countEquals" is initialized to 1 I can start at "i + 1"
		let j = i + 1;

		// Interrupt the sub-array search if the candidate is not the majority element in the subarray
		while(countEquals > countNotEquals && j < array.length) {

			if(array[j] === currentCandidate) {

				countEquals += 1;
			}
			else {

				countNotEquals += 1;
			}

			// Move sub-array index
			j += 1;

			// Also move the main index:
			// - if the candidate is the majority element for sure no other element in the subarray can be
			// - if the candidate is not the majority element this is the last iteration and for sure we checked a number of non-candidate values that is less than the subarray length
			// therefore no need to subsequently check current "i" as a candidate
			i += 1;
		}
	}

	// We have a candidate but it's not the majority element for sure, simply verify it
	const targetCount = array.length / 2;
	let count = 0;
	for(const value of array) {

		if(value === currentCandidate) {

			count += 1;
		}

		if(count > targetCount) {
	
			return currentCandidate;
		}
	}

	return undefined;
};
