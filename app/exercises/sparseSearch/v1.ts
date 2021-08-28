/**
 * First implementation of the exercise
 */
export class SparseSearchV1 {

	/**
	 * Given a sorted array of strings that is interspersed with empty strings, this method finds the location of a given string.
	 * T = best O(log(N)), worst O(N), average between the two depending on "real strings" positions
	 * S = best O(log(N)), worst O(N) (recursion)
	 * @param list the sorted list of strings interspersed with empty strings
	 * @param element the element to find
	 * @returns the element index or undefined if not found
	 */
	public search = (list: string[], element: string): number | undefined => {
	
		if(element === '') {
	
			throw Error('Can\' search empty string!');
		}
		return this.recursiveSearch(list, element, 0, list.length - 1);
	};

	/**
	 * Helper to handle the recursion
	 * @param list the list
	 * @param element the element
	 * @param start the start of the current list portion
	 * @param end the end of the current list portion
	 * @returns the element index or undefined if not found
	 */
	private recursiveSearch(list: string[], element: string, start: number, end: number): number | undefined {

		if(end - start < 0) {
	
			// Base case, element not found
			return undefined;
		}
	
		// Compute middle value
		const middle = start + Math.floor((end - start) / 2);

		// Find first real element on the left of middle (linear but it would also be linear in a pure binary search: it would still visit each node unless super-lucky to find the element quickly!)
		const middleForLeft = this.trimRight(list, start, middle);
		const middleValueForLeft = list[middleForLeft];

		if(middleValueForLeft === element) {

			if(middleForLeft > 0) {
	
				// Found the element but there may be duplicates: try to recurse on left half
				const leftResult = this.recurseLeft(list, element, start, middleForLeft);
				return leftResult === undefined ? middleForLeft : leftResult;
			}
			else {
	
				// Found the element and there can't be duplicates
				return middleForLeft;
			}
		}
		else if(middleValueForLeft > element) {

			// Recurse on left half
			return this.recurseLeft(list, element, start, middleForLeft);
		}

		// Find first real element on the right of middle (linear but it would also be linear in a pure binary search: it would still visit each node unless super-lucky to find the element quickly!)
		const middleForRight = this.trimLeft(list, middle, end);
		const middleValueForRight = list[middleForRight];

		if(middleValueForRight === element) {

			// Found the element and there can't be duplicates (it would have entered the previous "middleValueForLeft === element" if)
			return middleForRight;
		}
		else {

			// Recurse on right half
			return this.recurseRight(list, element, middleForRight, end);
		}
	}

	/**
	 * Helper to recurse left
	 * @param list the list
	 * @param element the element
	 * @param start the start of the current list portion
	 * @param middle the middle element
	 * @returns the element index or undefined if not found
	 */
	private recurseLeft(list: string[], element: string, start: number, middle: number): number | undefined {

		// Ignore all interspersed empty strings at the beginning (linear but it would also be linear in a pure binary search: it would still visit each node unless super-lucky to find the element quickly!)
		start = this.trimLeft(list, start, middle);

		if(middle < start) {
	
			// Base case, left half is empty
			return undefined;
		}

		if(element < list[start] || list[middle] < element) {
	
			// Element can't be inside right half, shortcircuit
			return undefined;
		}

		// Proper recursion
		return this.recursiveSearch(list, element, start, middle - 1);
	}

	/**
	 * Helper to recurse right
	 * @param list the list
	 * @param element the element
	 * @param middle the middle element
	 * @param end the end of the current list portion
	 * @returns the element index or undefined if not found
	 */
	private recurseRight(list: string[], element: string, middle: number, end: number): number | undefined {

		// Ignore all interspersed empty strings at the end (linear but it would also be linear in a pure binary search: it would still visit each node unless super-lucky to find the element quickly!)
		end = this.trimRight(list, middle, end);

		if(end < middle) {
	
			// Base case, right half is empty
			return undefined;
		}

		if(element < list[middle] || list[end] < element) {
	
			// Element can't be inside right half, shortcircuit
			return undefined;
		}

		// Proper recursion
		return this.recursiveSearch(list, element, middle + 1, end);
	}

	/**
	 * Removes all empty strings from the left part of the current portion
	 * @param list the list
	 * @param start the start of the current list portion
	 * @param end the end of the current list portion
	 * @returns the new start
	 */
	private trimLeft(list: string[], start: number, end: number): number {

		let startValue = list[start];
		while(startValue === '' && start <= end) {
	
			start += 1;
			startValue = list[start];
		}
		return start;
	}

	/**
	 * Removes all empty strings from the right part of the current portion
	 * @param list the list
	 * @param start the start of the current list portion
	 * @param end the end of the current list portion
	 * @returns the new end
	 */
	private trimRight(list: string[], start: number, end: number): number {

		let endValue = list[end];
		while(endValue === '' && start <= end) {
	
			end -= 1;
			endValue = list[end];
		}
		return end;
	}
}
