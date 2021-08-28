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
