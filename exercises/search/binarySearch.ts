/**
 * Helper to binarySearch
 * @param list the ordered list
 * @param elementToFind the element to search
 * @param start the start of the current list portion
 * @param end the end of the current list portion
 * @returns the element index or undefined if not found
 */
const binarySearchHelper = (list: number[], elementToFind: number, start: number, end: number): number | undefined => {

	const diff = end - start;

	if(diff < 0) {

		// No elements in the list portion
		return undefined;
	}
	else {

		const middle = start + Math.floor(diff / 2);
		const middleElement = list[middle];
		if(middleElement === elementToFind) {

			if(middle > 0 && list[middle - 1] === elementToFind) {

				// Found the element but there is at least one duplicate on the left: recurse on left half of the list portion to find the first occurrence of the match
				return binarySearchHelper(list, elementToFind, start, middle - 1);
			}
			else {
				
				// Found the first matching element, return it
				return middle;
			}
		}
		else if(middleElement < elementToFind) {

			// Recurse on right half of the list portion
			return binarySearchHelper(list, elementToFind, middle + 1, end);
		}
		else {

			// Recurse on left half of the list portion
			return binarySearchHelper(list, elementToFind, start, middle - 1);
		}
	}
};

/**
 * Binary search implementation
 * T = O(log(N))
 * S = O(1)
 * @param list the ordered list
 * @param elementToFind the element to search
 * @returns the element index or undefined if not found
 */
export const binarySearch = (list: number[], elementToFind: number): number | undefined => {

	return binarySearchHelper(list, elementToFind, 0, list.length - 1);
};
