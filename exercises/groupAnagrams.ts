/**
 * Sorts an array of strings so that all the anagrams are next to each other
 * T = O(N log(N) M) where N is the length of the array and M the average length of the strings
 * S = O(N M)
 */
export class GroupAnagramsV1 {

	public readonly array: string[];
	private readonly cachedCharsCounts: Map<string, number>[];

	public constructor(array: string[]) {

		this.array = array;
		this.cachedCharsCounts = [];
	}

	/**
	 * Main method for the algorithm
	 */
	public groupAnagrams = (): void => {

		if(this.array.length > 1) {

			this.groupAnagramsHelper(0, this.array.length - 1);
		}
	};

	/**
	 * Recursive helper for groupAnagrams()
	 * @param start start of the current array portion
	 * @param end end of the current array portion
	 */
	private groupAnagramsHelper = (start: number, end: number): void => {

		// Base case (length 0 or 1), no need to sort
		if(end - start <= 0) {

			return;
		}

		// Quick-sort-like algorithm: given a pivot interval (pivotStart to pivotEnd), shift inside the pivot interval all equal values (= anagrams), shift before the pivot interval all lesser values and shift after the pivot interval all greater values
		let pivotStart = start;
		let pivotEnd = start;
		for(let i = start + 1; i <= end; i++) {

			// Compare i-th string with the main pivot value (important to do firstIndex = pivotEnd and secondIndex = i because it's the pivot that guides, see above)
			const compare = this.compareStrings(pivotEnd, i);
			if(compare >= 0) {

				// Shift elements in the original array and in the cache array
				this.switchArrayElements(this.array, compare, i, pivotStart, pivotEnd);
				this.switchArrayElements(this.cachedCharsCounts, compare, i, pivotStart, pivotEnd);

				// Change pivot interval indices
				pivotEnd += 1;
				if(compare > 0) {

					pivotStart += 1;
				}
			}
		}

		// Recurse on left and right portions, excluding the pivot interval (which we know to be all anagrams)
		this.groupAnagramsHelper(start, pivotStart - 1);
		this.groupAnagramsHelper(pivotEnd + 1, end);
	};

	/**
	 * Helper to switch elements in a generic array
	 * @param array the source array
	 * @param compare the comparison value
	 * @param i the current index
	 * @param pivotStart the pivot interval start
	 * @param pivotEnd the pivot interval end
	 */
	private switchArrayElements = <T> (array: T[], compare: number, i: number, pivotStart: number, pivotEnd: number): void => {

		// For both cases, move (pivotEnd) to (pivotEnd + 1) and (pivotEnd + 1) to (i)
		const arrayI = array[i];
		array[i] = array[pivotEnd + 1];
		array[pivotEnd + 1] = array[pivotEnd];

		if(compare === 0) {

			// If they are anagrams, move (i) to (pivotEnd) ==> put (i) inside the pivot interval
			array[pivotEnd] = arrayI;
		}
		else {

			// If they are not anagrams, move (pivotStart) to (pivotEnd) and (i) to (pivotStart) ==> put (i) outside the pivot interval
			array[pivotEnd] = array[pivotStart];
			array[pivotStart] = arrayI;
		}
	};

	/**
	 * Helper to compare strings according to them being anagrams or not.
	 * IMPORTANT: order of firstIndex and secondIndex matters for negative and positive result values
	 * @param firstIndex the first string index
	 * @param secondIndex the second string index
	 * @returns a negative integer, zero, or a positive integer as first string is "less than", an anagram of, or "greater than" second string
	 */
	private compareStrings = (firstIndex: number, secondIndex: number): number => {

		const first = this.array[firstIndex];
		const second = this.array[secondIndex];
		const firstLength = first.length;
		const secondLength = second.length;

		// If the strings are of different length (or both empty!) there's no need to check for anagrams, they are not for sure
		if(firstLength < secondLength) {

			return -1;
		}
		else if(firstLength > secondLength) {

			return 1;
		}
		else if(firstLength === 0) {

			return 0;
		}

		// Get the {character -> count} maps for both string (possibly cached)
		const firstCharsCount = this.countChars(firstIndex);
		const secondCharsCount = this.countChars(secondIndex);

		// Compare all character counts and exit if they mismatch
		const firstEntries = firstCharsCount.entries();
		for(const firstEntry of firstEntries) {

			const firstCount = firstEntry[1];
			const secondCount = secondCharsCount.get(firstEntry[0]);
			if(!secondCount || firstCount > secondCount) {

				return 1;
			}
			else if(firstCount < secondCount) {

				return -1;
			}
		}

		// Strings have same length and all character counts are equal: they are anagrams
		return 0;
	};

	/**
	 * Helper to count all characters in a string
	 * @param index the current string index
	 * @returns a {character -> count} map
	 */
	private countChars = (index: number): Map<string, number> => {

		if(this.cachedCharsCounts[index] !== undefined) {

			return this.cachedCharsCounts[index];
		}
		else {
		
			const charsArray = this.array[index].split('');
			const charsCount = new Map<string, number>();
			for(const char of charsArray) {

				const charMapValue = charsCount.get(char);
				if(charMapValue) {

					charsCount.set(char, charMapValue + 1);
				}
				else {

					charsCount.set(char, 1);
				}
			}

			this.cachedCharsCounts[index] = charsCount;

			return charsCount;
		}
	};
}

/**
 * Sorts an array of strings so that all the anagrams are next to each other
 * T = O(N M log(M))
 * S = O(N M)
 */
export class GroupAnagramsV2 {

	public readonly array: string[];
	private readonly buckets: Map<string, string[]>;

	public constructor(array: string[]) {

		this.array = array;
		this.buckets = new Map();
	}

	/**
	 * Main method for the algorithm
	 */
	public groupAnagrams = (): void => {

		if(this.array.length > 1) {

			// Build the buckets as a map {sorted string -> list of anagrams}
			for(let i = 0; i < this.array.length; i++) {

				const string = this.array[i];
				const sortedString = string.split('').sort().join('');

				let bucketList = this.buckets.get(sortedString);
				if(bucketList === undefined) {

					bucketList = [];
					this.buckets.set(sortedString, bucketList);
				}
				bucketList.push(string);
			}

			// Put all bucket strings inside the original array
			const bucketEntries = this.buckets.entries();
			let i = 0;
			for(const bucketEntry of bucketEntries) {

				for(const string of bucketEntry[1]) {

					this.array[i] = string;
					i += 1;
				}
			}
		}
	};
}

const tests = [
	[ '' ],
	[ 'aaaaaaa' ],
	[ '', '' ],
	[ 'abc', 'bba', 'abb', 'bab', 'cac', 'cca', 'cba' ],
	[ 'aa', 'abc', 'bb', 'a', 'c', 'cc', 'ba', 'bca', 'baa', '', 'ccb', 'b', 'aab', 'cba', 'cab', 'acb', 'caa', 'cb', 'bc', 'abc', 'ac', 'a', '', 'bac', 'aca', 'ca', 'ab', 'cca' ],
	[ 'a', 'c', 'b', 'a', 'c', 'b' ],
	[ 'abcdef', 'dabfce', 'afbced', 'ebcdef', 'abceef', 'abcdff', 'dbcddf', 'adcddf' ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const clonedTest = [ ...test ];
	const input = clonedTest.join(', ');
	const solver = new GroupAnagramsV1(clonedTest);
	solver.groupAnagrams();
	const output = clonedTest.join(', ');
	console.log(`[${input}] ---> [${output}]`);
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const clonedTest = [ ...test ];
	const input = clonedTest.join(', ');
	const solver = new GroupAnagramsV2(clonedTest);
	solver.groupAnagrams();
	const output = clonedTest.join(', ');
	console.log(`[${input}] ---> [${output}]`);
}
