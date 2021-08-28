import { Listy } from './common';

/**
 * A constant for array exploration in V1. For best performance, this should be as close as possible to the average length of all possible inputs.
 */
const MAGIC_NUMBER = 10;

/**
 * Helper for sortedSearchNoSize()
 * @param listy the input listy (sorted)
 * @param element the element to find
 * @param start the current portion start
 * @param end the current portion end (possibly "guessed")
 * @param endUpperBound the maximun upper bound for the real listy length, possibly undefined
 * @returns the index of the element or undefined if not found
 */
const sortedSearchNoSizeHelperV1 = (listy: Listy, element: number, start: number, end: number, endUpperBound: number | undefined): number | undefined => {

	if(end - start < 0) {

		if(end === endUpperBound) {

			// Base case: end is correct and current array portion is empty
			return undefined;
		}
		else {

			// Current array is empty but the end is guessed: try again
			const newStart = end;
			const newEnd = endUpperBound && end + MAGIC_NUMBER >= endUpperBound ? endUpperBound : end + MAGIC_NUMBER;
			return sortedSearchNoSizeHelperV1(listy, element, newStart, newEnd, endUpperBound);
		}
	}

	const startValue = listy.elementAt(start);
	if(startValue === -1 || startValue > element) {

		// Base case: element can't be inside the current array portion (start is outside listy bounds or bigger than element)
		return undefined;
	}

	const endValue = listy.elementAt(end);
	if(endValue !== -1 && endValue < element) {

		if(end === endUpperBound) {

			// Base case: element can't be inside the current array portion (end is correct and is smaller than element)
			return undefined;
		}
		else {

			// Element can't be inside the current array portion but the end is guessed: try shifting the whole array portion
			const newStart = end + 1;
			const newEnd = endUpperBound && end + MAGIC_NUMBER >= endUpperBound ? endUpperBound : end + MAGIC_NUMBER;
			return sortedSearchNoSizeHelperV1(listy, element, newStart, newEnd, endUpperBound);
		}
	}

	// Compute middle index and value
	const middle = start + Math.floor((end - start) / 2);
	const middleValue = listy.elementAt(middle);

	if(middleValue === -1) {

		// Middle value is out of listy bounds: recurse on left half
		const newStart = start;
		const newEnd = middle - 1;
		return sortedSearchNoSizeHelperV1(listy, element, newStart, newEnd, newEnd);
	}
	else if(middleValue === element) {

		if(middle > 0 && listy.elementAt(middle - 1) === middleValue) {

			// Middle value is the element but there are duplicates: recurse on left half
			const newStart = start;
			const newEnd = middle - 1;
			return sortedSearchNoSizeHelperV1(listy, element, newStart, newEnd, newEnd);
		}
		else {

			// Middle value is the element and there are no duplicates: found it!
			return middle;
		}
	}
	else if(middleValue < element) {

		// Middle values is smaller than the element, recurse on right half
		const newStart = middle + 1;
		const newEnd = end;
		return sortedSearchNoSizeHelperV1(listy, element, newStart, newEnd, endUpperBound);
	}
	else {

		// Middle value is bigger than the element, recurse on left half
		const newStart = start;
		const newEnd = middle - 1;
		return sortedSearchNoSizeHelperV1(listy, element, newStart, newEnd, newEnd);
	}
};

/**
 * Finds the given element inside the given listy
 * T = O(log(N) + N / MAGIC_NUMBER)
 * S = O(log(N) + N / MAGIC_NUMBER) (recursion)
 * @param listy the input listy (sorted)
 * @param element the element to find
 * @returns the index of the element or undefined if not found
 */
export const sortedSearchNoSizeV1 = (listy: Listy, element: number): number | undefined => {

	return sortedSearchNoSizeHelperV1(listy, element, 0, MAGIC_NUMBER, undefined);
};
