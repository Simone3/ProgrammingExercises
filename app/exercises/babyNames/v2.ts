import { Queue, SimpleQueue } from '../../data-structures/queue';
import { NameFrequency, SynonymPair } from './common';

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
