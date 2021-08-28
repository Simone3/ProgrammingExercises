import { Listy } from './common';

/**
 * Finds the given element inside the given listy
 * T = O(log(N))
 * S = O(1)
 * @param listy the input listy (sorted)
 * @param element the element to find
 * @returns the index of the element or undefined if not found
 */
export const sortedSearchNoSizeV2 = (listy: Listy, element: number): number | undefined => {

	// Jump by power of 2 to get the start and end indices of the portion of listy where the element might be ("end" may be an upper bound of the actual array length)
	let start = 0;
	let end = 1;
	while(listy.elementAt(end) !== -1 && listy.elementAt(end) < element) {
		
		start = end;
		end *= 2;
	}

	// Use an almost normal binary search to find the element
	while(start <= end) {

		// Compute middle index and value
		const middle = start + Math.floor((end - start) / 2);
		const middleValue = listy.elementAt(middle);

		if(middleValue === element) {

			if(middle > 0 && listy.elementAt(middle - 1) === element) {

				// Found the element but there are duplicates: recurse on left half
				end = middle - 1;
			}
			else {

				// Found the element and there are no duplicates
				return middle;
			}
		}
		else if(middleValue === -1 || middleValue > element) {

			// Middle is outside the bounds or is bigger than the element: recurse on left half
			end = middle - 1;
		}
		else {

			// Middle is smaller than the element: recurse on right half
			start = middle + 1;
		}
	}

	// Element not found
	return undefined;
};
