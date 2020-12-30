/**
 * An array that does not publicly expose its length
 */
class Listy {

	private readonly array: number[];

	public constructor(sourceArray: number[]) {

		const negativeValue = sourceArray.find((element) => {
			return element < 0;
		});
		if(negativeValue !== undefined) {
			throw Error('Listy can\'t contain negative numbers');
		}

		this.array = sourceArray;
	}

	public elementAt(index: number): number {

		const value = this.array[index];
		return value === undefined ? -1 : value;
	}

	public toString(): string {

		return `[${this.array.join(', ')}]`;
	}
}

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

const tests = [
	{ listy: new Listy([]), element: 2 },
	{ listy: new Listy([ 2 ]), element: 2 },
	{ listy: new Listy([ 2 ]), element: 1 },
	{ listy: new Listy([ 2 ]), element: 3 },
	{ listy: new Listy([ 2, 4 ]), element: 2 },
	{ listy: new Listy([ 2, 4 ]), element: 4 },
	{ listy: new Listy([ 2, 4 ]), element: 1 },
	{ listy: new Listy([ 2, 4 ]), element: 3 },
	{ listy: new Listy([ 2, 4 ]), element: 5 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 2 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 4 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 6 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 8 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 10 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 12 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 1 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 3 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 5 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 7 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 9 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 11 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12 ]), element: 13 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 2 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 18 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 50 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 1 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 23 },
	{ listy: new Listy([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ]), element: 51 },
	{ listy: new Listy([ 2, 4, 4, 4, 6, 6 ]), element: 4 },
	{ listy: new Listy([ 2, 4, 4, 4, 6, 6 ]), element: 6 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 2 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 4 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 6 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 8 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 10 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 12 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 14 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 16 },
	{ listy: new Listy([ 2, 2, 2, 4, 4, 4, 4, 6, 6, 8, 10, 10, 10, 10, 10, 12, 12, 14, 14, 14, 14, 16, 16, 16, 18 ]), element: 18 }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test.listy} contains ${test.element} -----> V1 = ${sortedSearchNoSizeV1(test.listy, test.element)} | V2 = ${sortedSearchNoSizeV2(test.listy, test.element)}`);
}
