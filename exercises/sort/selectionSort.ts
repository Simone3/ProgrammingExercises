/**
 * Selection sort implementation
 * T = O(N^2)
 * S = O(1)
 * @param array the array
 */
export const selectionSort = (array: number[]): void => {

	const length = array.length;
	for(let i = 0; i < length; i++) {

		let minJ = i;
		for(let j = i + 1; j < length; j++) {

			if(array[minJ] > array[j]) {

				minJ = j;
			}
		}

		const value = array[i];
		array[i] = array[minJ];
		array[minJ] = value;
	}
};
