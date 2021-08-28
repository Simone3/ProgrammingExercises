/**
 * Bubble sort implementation
 * T = O(N^2)
 * S = O(1)
 * @param array the array
 */
export const bubbleSort = (array: number[]): void => {

	const length = array.length;
	for(let i = 1; i < length; i++) {

		let j = i;
		while(j > 0 && array[j - 1] > array[j]) {

			const value = array[j];
			array[j] = array[j - 1];
			array[j - 1] = value;

			j -= 1;
		}
	}
};
