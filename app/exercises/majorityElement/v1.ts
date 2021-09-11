/**
 * A majority element is an element that makes up more than half of the items in an array.
 * Given a positive integers array, finds the majority element.
 * If there is no majority element, returns undefined.
 * T = O(N)
 * S = O(N)
 * @param array the array
 * @returns the majority element, if any
 */
export const majorityElementV1 = (array: number[]): number | undefined => {

	const counterMap: {[key: number]: number} = {};

	for(const value of array) {

		let count = counterMap[value];
		count = count === undefined ? 1 : count + 1;
		counterMap[value] = count;

		if(count > array.length / 2) {

			return value;
		}
	}

	return undefined;
};
