/**
 * Second implementation of the exercise
 */
export class SparseSearchV2 {

	/**
	 * Given a sorted array of strings that is interspersed with empty strings, this method finds the location of a given string.
	 * T = best O(log(N)), worst O(N), average between the two depending on "real strings" positions
	 * S = O(1)
	 * @param list the sorted list of strings interspersed with empty strings
	 * @param element the element to find
	 * @returns the element index or undefined if not found
	 */
	public search = (list: string[], element: string): number | undefined => {
	
		if(element === '') {
	
			throw Error('Can\' search empty string!');
		}
		
		let result;
		let start = 0;
		let end = list.length - 1;

		while(start <= end) {

			// Compute middle value
			const middle = start + Math.floor((end - start) / 2);

			// Find first real element on the left of middle (linear)
			let middleForLeft = middle;
			let middleValueForLeft = list[middleForLeft];
			while(middleValueForLeft === '' && start <= middleForLeft) {
		
				middleForLeft -= 1;
				middleValueForLeft = list[middleForLeft];
			}

			if(middleValueForLeft === element) {

				// Found the element but there may be duplicates: try recursing left
				result = middleForLeft;
				end = middleForLeft - 1;
			}
			else if(middleValueForLeft > element) {

				// Recurse left
				end = middleForLeft - 1;
			}
			else {

				// Find first real element on the right of middle (linear)
				let middleForRight = middle;
				let middleValueForRight = list[middleForRight];
				while(middleValueForRight === '' && middleForRight <= end) {
			
					middleForRight += 1;
					middleValueForRight = list[middleForRight];
				}

				if(middleValueForRight === element) {

					// Found the element and there can't be duplicates (otherwise we would have matched the previous "middleValueForLeft === element" if)
					return middleForRight;
				}
				else {

					// Recurse right
					start = middleForRight + 1;
				}
			}
		}

		return result;
	};
}
