import { Queue, SimpleQueue } from './data-structures/queue';

type NameFrequency = {
	name: string;
	count: number;
}

type SynonymPair = {
	left: string;
	right: string;
}

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

type SynonymNode = {
	name: string;
	adjacencyList: SynonymNode[],
	visited: boolean;
	uniqueName: string;
};

/**
 * Each year, the government releases a list of the 10,000 most common baby names and their frequencies (the number of babies with that name).
 * The only problem with this is that some names have multiple spellings. For example, "John" and "Jon" are essentially the same name but
 * would be listed separately in the list. Given two lists, one of names/frequencies and the other of pairs of equivalent names, write an
 * algorithm to print a new list of the true frequency of each name. Note that if John and Jon are synonyms, and Jon and Johnny are synonyms,
 * then John and Johnny are synonyms. (It is both transitive and symmetric.) In the final list, any name can be used as the "real" name.
 * S = O(F + S)
 * T = O(F + S)
 * @param nameFrequencies list of names and their counts
 * @param synonyms list of synonym pairs
 * @returns the unique list of names and their counts
 */
export const babyNamesV2 = (nameFrequencies: NameFrequency[], synonyms: SynonymPair[]): NameFrequency[] => {

	// Trivial case without synonyms
	if(synonyms.length === 0) {

		return [ ...nameFrequencies ];
	}

	// Keep a map with the name as the key and the corresponding graph node as the value
	const nodesMap: {[key: string]: SynonymNode} = {};
	const getNode = (name: string): SynonymNode => {

		let node: SynonymNode = nodesMap[name];
		if(node === undefined) {

			node = { name: name, adjacencyList: [], visited: false, uniqueName: '' };
			nodesMap[name] = node;
		}
		return node;
	};

	// Add all synonyms to map and graph
	for(const synonym of synonyms) {

		const leftNode = getNode(synonym.left);
		const rightNode = getNode(synonym.right);
		leftNode.adjacencyList.push(rightNode);
		rightNode.adjacencyList.push(leftNode);
	}

	// Traverse all sub-graphs (all nodes visited once) and set the unique name (all nodes in a sub-graph have the same unique name)
	for(const rootNode of Object.values(nodesMap)) {

		if(!rootNode.visited) {

			const uniqueName = rootNode.name;
			const queue: Queue<SynonymNode> = new SimpleQueue();
			queue.add(rootNode);
			while(!queue.isEmpty()) {

				const node = queue.remove();
				if(!node.visited) {

					node.uniqueName = uniqueName;
					node.visited = true;
					for(const adjacentNode of node.adjacencyList) {

						queue.add(adjacentNode);
					}
				}
			}
		}
	}
 
	// Loop name frequencies and build the unique-names result
	const uniqueNameFrequenciesMap: {[key: string]: NameFrequency} = {};
	const uniqueNameFrequencies = [];
	for(const nameFrequency of nameFrequencies) {

		const name = nameFrequency.name;

		// If no synonym is present the name is unique, otherwise pick its unique name
		let uniqueName;
		const synonymNode = nodesMap[name];
		if(synonymNode === undefined) {

			uniqueName = name;
		}
		else {

			uniqueName = synonymNode.uniqueName;
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

const tests: { nameFrequencies: NameFrequency[], synonyms: SynonymPair[] }[] = [
	{
		nameFrequencies: [],
		synonyms: []
	},
	{
		nameFrequencies: [{ name: 'A', count: 733 }, { name: 'B', count: 410 }, { name: 'C', count: 593 }, { name: 'D', count: 201 }, { name: 'E', count: 499 }, { name: 'F', count: 935 }, { name: 'G', count: 159 }, { name: 'H', count: 234 }, { name: 'I', count: 930 }, { name: 'J', count: 215 }, { name: 'K', count: 150 }, { name: 'L', count: 685 }, { name: 'M', count: 726 }, { name: 'N', count: 257 }, { name: 'O', count: 718 }, { name: 'P', count: 674 }, { name: 'Q', count: 403 }, { name: 'R', count: 976 }, { name: 'S', count: 511 }, { name: 'T', count: 488 }, { name: 'U', count: 816 }, { name: 'V', count: 820 }, { name: 'W', count: 974 }, { name: 'X', count: 364 }, { name: 'Y', count: 756 }, { name: 'Z', count: 392 }],
		synonyms: []
	},
	{
		nameFrequencies: [{ name: 'A', count: 733 }, { name: 'B', count: 410 }, { name: 'C', count: 593 }, { name: 'D', count: 201 }, { name: 'E', count: 499 }, { name: 'F', count: 935 }, { name: 'G', count: 159 }, { name: 'H', count: 234 }, { name: 'I', count: 930 }, { name: 'J', count: 215 }, { name: 'K', count: 150 }, { name: 'L', count: 685 }, { name: 'M', count: 726 }, { name: 'N', count: 257 }, { name: 'O', count: 718 }, { name: 'P', count: 674 }, { name: 'Q', count: 403 }, { name: 'R', count: 976 }, { name: 'S', count: 511 }, { name: 'T', count: 488 }, { name: 'U', count: 816 }, { name: 'V', count: 820 }, { name: 'W', count: 974 }, { name: 'X', count: 364 }, { name: 'Y', count: 756 }, { name: 'Z', count: 392 }],
		synonyms: [{ left: 'A', right: 'B' }, { left: 'N', right: 'G' }]
	},
	{
		nameFrequencies: [{ name: 'A', count: 733 }, { name: 'B', count: 410 }, { name: 'C', count: 593 }, { name: 'D', count: 201 }, { name: 'E', count: 499 }, { name: 'F', count: 935 }, { name: 'G', count: 159 }, { name: 'H', count: 234 }, { name: 'I', count: 930 }, { name: 'J', count: 215 }, { name: 'K', count: 150 }, { name: 'L', count: 685 }, { name: 'M', count: 726 }, { name: 'N', count: 257 }, { name: 'O', count: 718 }, { name: 'P', count: 674 }, { name: 'Q', count: 403 }, { name: 'R', count: 976 }, { name: 'S', count: 511 }, { name: 'T', count: 488 }, { name: 'U', count: 816 }, { name: 'V', count: 820 }, { name: 'W', count: 974 }, { name: 'X', count: 364 }, { name: 'Y', count: 756 }, { name: 'Z', count: 392 }],
		synonyms: [{ left: 'A', right: 'B' }, { left: 'N', right: 'G' }, { left: 'Z', right: 'W' }, { left: 'W', right: 'A' }, { left: 'G', right: 'Z' }, { left: 'H', right: 'J' }, { left: 'J', right: 'H' }, { left: 'Q', right: 'R' }, { left: 'S', right: 'R' }]
	},
	{
		nameFrequencies: [{ name: 'A', count: 733 }, { name: 'B', count: 410 }, { name: 'C', count: 593 }, { name: 'D', count: 201 }, { name: 'E', count: 499 }, { name: 'F', count: 935 }, { name: 'G', count: 159 }, { name: 'H', count: 234 }, { name: 'I', count: 930 }, { name: 'J', count: 215 }, { name: 'K', count: 150 }, { name: 'L', count: 685 }, { name: 'M', count: 726 }, { name: 'N', count: 257 }, { name: 'O', count: 718 }, { name: 'P', count: 674 }, { name: 'Q', count: 403 }, { name: 'R', count: 976 }, { name: 'S', count: 511 }, { name: 'T', count: 488 }, { name: 'U', count: 816 }, { name: 'V', count: 820 }, { name: 'W', count: 974 }, { name: 'X', count: 364 }, { name: 'Y', count: 756 }, { name: 'Z', count: 392 }],
		synonyms: [{ left: 'A', right: 'B' }, { left: 'N', right: 'G' }, { left: 'Z', right: 'W' }, { left: 'W', right: 'A' }, { left: 'G', right: 'Z' }, { left: 'H', right: 'J' }, { left: 'J', right: 'H' }, { left: 'Q', right: 'R' }, { left: 'S', right: 'R' }, { left: 'J', right: 'N' }, { left: 'J', right: 'N' }, { left: 'J', right: 'N' }, { left: 'F', right: 'B' }, { left: 'F', right: 'G' }, { left: 'E', right: 'C' }, { left: 'D', right: 'E' }, { left: 'C', right: 'Z' }, { left: 'I', right: 'L' }, { left: 'M', right: 'L' }, { left: 'K', right: 'L' }, { left: 'K', right: 'J' }, { left: 'O', right: 'V' }, { left: 'P', right: 'U' }, { left: 'T', right: 'Q' }, { left: 'O', right: 'P' }, { left: 'Q', right: 'P' }, { left: 'V', right: 'W' }, { left: 'W', right: 'U' }, { left: 'X', right: 'H' }, { left: 'R', right: 'Y' }]
	}
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const nameFrequenciesString = test.nameFrequencies.map((nameFrequency) => {
		return `${nameFrequency.name}:${nameFrequency.count}`;
	}).join(', ');

	const synonymsString = test.synonyms.map((synonym) => {
		return `${synonym.left}-${synonym.right}`;
	}).join(', ');

	const resultV1 = babyNamesV1(test.nameFrequencies, test.synonyms);
	const resultStringV1 = resultV1.map((nameFrequency) => {
		return `${nameFrequency.name}:${nameFrequency.count}`;
	}).join(', ');

	const resultV2 = babyNamesV2(test.nameFrequencies, test.synonyms);
	const resultStringV2 = resultV2.map((nameFrequency) => {
		return `${nameFrequency.name}:${nameFrequency.count}`;
	}).join(', ');
	
	console.log(`\n\n---\n\nInput Names: ${nameFrequenciesString}\nInput Synonyms: ${synonymsString}\nOutput Names (V1): ${resultStringV1}\nOutput Names (V2): ${resultStringV2}`);
}

