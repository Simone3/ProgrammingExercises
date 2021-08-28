import { NameFrequency, SynonymPair } from './common';

/**
 * Each year, the government releases a list of the 10,000 most common baby names and their frequencies (the number of babies with that name).
 * The only problem with this is that some names have multiple spellings. For example, "John" and "Jon" are essentially the same name but
 * would be listed separately in the list. Given two lists, one of names/frequencies and the other of pairs of equivalent names, write an
 * algorithm to print a new list of the true frequency of each name. Note that if John and Jon are synonyms, and Jon and Johnny are synonyms,
 * then John and Johnny are synonyms. (It is both transitive and symmetric.) In the final list, any name can be used as the "real" name.
 * S = O(F + S * log S)
 * T = O(F + S)
 * @param nameFrequencies list of names and their counts
 * @param synonyms list of synonym pairs
 * @returns the unique list of names and their counts
 */
export const babyNamesV1 = (nameFrequencies: NameFrequency[], synonyms: SynonymPair[]): NameFrequency[] => {

	// Trivial case without synonyms
	if(synonyms.length === 0) {

		return [ ...nameFrequencies ];
	}

	// Build a map of all synonyms (key is a name, value is the array of all its synonyms itself included)
	const synonymsMap: {[key: string]: string[]} = {};
	for(const synonym of synonyms) {

		const left = synonym.left;
		const leftArray = synonymsMap[left];
		const right = synonym.right;
		const rightArray = synonymsMap[right];

		if(leftArray === undefined && rightArray === undefined) {

			// Both left and right names are new, create new array
			const newArray = [ left, right ];
			synonymsMap[left] = newArray;
			synonymsMap[right] = newArray;
		}
		else if(leftArray !== undefined && rightArray === undefined) {

			// Left name was encoutered previously but right name wasn't: add right to lefts's array
			leftArray.push(right);
			synonymsMap[right] = leftArray;
		}
		else if(leftArray === undefined && rightArray !== undefined) {

			// Right name was encoutered previously but left name wasn't: add left to right's array
			rightArray.push(left);
			synonymsMap[left] = rightArray;
		}
		else if(leftArray !== rightArray) {

			// Both left and right names were encoutered previously and the two arrays are not the same: add all right array values to the left array
			for(const rightArrayName of rightArray) {

				leftArray.push(rightArrayName);
				synonymsMap[rightArrayName] = leftArray;
			}
		}
	}
 
	// Loop name frequencies and build the unique-names result
	const uniqueNameFrequenciesMap: {[key: string]: NameFrequency} = {};
	const uniqueNameFrequencies = [];
	for(const nameFrequency of nameFrequencies) {

		const name = nameFrequency.name;

		// If no synonym is present the name is unique, otherwise pick the first name in the synonyms array
		let uniqueName;
		const synonymArray = synonymsMap[name];
		if(synonymArray === undefined) {

			uniqueName = name;
		}
		else {

			uniqueName = synonymArray[0];
		}

		// If we already have a frequency for this unique name update it, otherwise add new frequency to the result
		let uniqueNameFrequency = uniqueNameFrequenciesMap[uniqueName];
		if(uniqueNameFrequency === undefined) {

			uniqueNameFrequency = { name: nameFrequency.name, count: nameFrequency.count };
			uniqueNameFrequenciesMap[uniqueName] = uniqueNameFrequency;
			uniqueNameFrequencies.push(uniqueNameFrequency);
		}
		else {

			uniqueNameFrequency.count += nameFrequency.count;
		}
	}

	return uniqueNameFrequencies;
};
