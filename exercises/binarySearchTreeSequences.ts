import { BinaryTreeNode, SimpleBinaryTreeNode } from './data-structures/tree';

/**
 * Recursive helper for getBinarySearchTreeSequencesV1
 * @param currentResult the current result array
 * @param activeNodes the currently "active nodes", i.e. those that may continue the "path" by generating a new result
 * @returns the array of results for the currently active nodes
 */
const getBinarySearchTreeSequencesRecursiveHelperV1 = (currentResult: number[], activeNodes: BinaryTreeNode<number>[]): number[][] => {

	const results = [];

	if(activeNodes.length === 0) {

		// No more active nodes: the whole tree has been traversed, add this complete result to the current node's results
		results.push(currentResult);
	}
	else {

		// Each active node generates a new "path", i.e. a new set of results
		for(let i = 0; i < activeNodes.length; i++) {

			const activeNode = activeNodes[i];

			// Pass down the current result array (as a copy), adding the active node value
			const activeNodeCurrentResult = [ ...currentResult ];
			activeNodeCurrentResult.push(activeNode.data);

			// Pass down the current active nodes (as a copy), removing the active node and if necessary adding its children
			const activeNodeActiveNodes = [ ...activeNodes ];
			activeNodeActiveNodes.splice(i, 1);
			if(activeNode.leftChild) {

				activeNodeActiveNodes.push(activeNode.leftChild);
			}
			if(activeNode.rightChild) {

				activeNodeActiveNodes.push(activeNode.rightChild);
			}

			// Recurse with the new result and the new active nodes
			const activeNodeResults = getBinarySearchTreeSequencesRecursiveHelperV1(activeNodeCurrentResult, activeNodeActiveNodes);
			
			// Add all recursive results to the current results
			results.push(...activeNodeResults);
		}
	}

	return results;
};

/**
 * "Waves" two arrays (all permutations keeping the elements of each array relatively sorted)
 * @param first the first array
 * @param second the second array
 * @param currentResult the current (possibly partial) weaving result
 * @param firstIndex the current first index
 * @param secondIndex the current second index
 * @returns all possible weaving results for the current indices
 */
const weaveArrays = (first: number[], second: number[], currentResult: number[], firstIndex: number, secondIndex: number): number[][] => {

	const results = [];

	if(firstIndex < first.length || secondIndex < second.length) {

		// Pick the current element from the first array and recurse with that
		if(firstIndex < first.length) {

			const firstCurrentResult = [ ...currentResult ];
			firstCurrentResult.push(first[firstIndex]);

			const firstRecursiveResults = weaveArrays(first, second, firstCurrentResult, firstIndex + 1, secondIndex);
			results.push(...firstRecursiveResults);
		}

		// Pick the current element from the second array and recurse with that
		if(secondIndex < second.length) {

			const secondCurrentResult = [ ...currentResult ];
			secondCurrentResult.push(second[secondIndex]);

			const firstRecursiveResults = weaveArrays(first, second, secondCurrentResult, firstIndex, secondIndex + 1);
			results.push(...firstRecursiveResults);
		}
	}
	else {

		// Both arrays are completely traversed, add the complete result to the list
		results.push(currentResult);
	}

	return results;
};

/**
 * Recursive helper for getBinarySearchTreeSequencesV2
 * @param currentNode the current node
 * @returns the array of results for the current node
 */
const getBinarySearchTreeSequencesRecursiveHelperV2 = (currentNode: BinaryTreeNode<number>): number[][] => {

	// Recurse on children
	const leftChildResults = currentNode.leftChild ? getBinarySearchTreeSequencesRecursiveHelperV2(currentNode.leftChild) : [];
	const rightChildResults = currentNode.rightChild ? getBinarySearchTreeSequencesRecursiveHelperV2(currentNode.rightChild) : [];

	let results;
	if(leftChildResults.length > 0 && rightChildResults.length > 0) {

		// If both children have results, weave them together
		results = [];
		for(const leftChildResult of leftChildResults) {

			for(const rightChildResult of rightChildResults) {

				results.push(...weaveArrays(leftChildResult, rightChildResult, [], 0, 0));
			}
		}
	}
	else if(leftChildResults.length > 0) {

		// If only the left child has results, the current results are simply those
		results = leftChildResults;
	}
	else if(rightChildResults.length > 0) {

		// If only the right child has results, the current results are simply those
		results = rightChildResults;
	}
	else {

		// If it's a leaf, the current results are just one array
		results = [[]];
	}

	// Add this node to the beginning of the results
	for(const result of results) {

		result.unshift(currentNode.data);
	}

	return results;
};

/**
 * A binary search tree was created by traversing through an array from left to right and inserting each element.
 * Given a binary search tree with distinct elements, it returns all possible arrays that could have led to this tree.
 * @param tree the root of the binary search tree (assumed to be a valid BST with unique elements)
 * @returns the "found counter" for the current node and the (maybe) ancestor
 */
const getBinarySearchTreeSequencesV1 = (tree: BinaryTreeNode<number>): number[][] => {

	return getBinarySearchTreeSequencesRecursiveHelperV1([], [ tree ]);
};

const getBinarySearchTreeSequencesV2 = (tree: BinaryTreeNode<number>): number[][] => {

	return getBinarySearchTreeSequencesRecursiveHelperV2(tree);
};

const tests: BinaryTreeNode<number>[] = [

	new SimpleBinaryTreeNode(
		50
	),

	new SimpleBinaryTreeNode(
		50,
		new SimpleBinaryTreeNode(
			30
		)
	),

	new SimpleBinaryTreeNode(
		50,
		new SimpleBinaryTreeNode(
			30
		),
		new SimpleBinaryTreeNode(
			60
		)
	),

	new SimpleBinaryTreeNode(
		50,
		new SimpleBinaryTreeNode(
			30,
			new SimpleBinaryTreeNode(
				25,
				new SimpleBinaryTreeNode(
					10,
					new SimpleBinaryTreeNode(
						1
					)
				)
			)
		)
	),
	
	new SimpleBinaryTreeNode(
		50,
		new SimpleBinaryTreeNode(
			30,
			new SimpleBinaryTreeNode(
				25
			)
		),
		new SimpleBinaryTreeNode(
			60,
			new SimpleBinaryTreeNode(
				55
			),
			new SimpleBinaryTreeNode(
				70
			)
		)
	)
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const sequences = getBinarySearchTreeSequencesV1(test);
	console.log(`\n\n'${test}' ----->`);
	for(const sequence of sequences) {
		
		console.log(sequence.join(','));
	}
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const sequences = getBinarySearchTreeSequencesV2(test);
	console.log(`\n\n'${test}' ----->`);
	for(const sequence of sequences) {
		
		console.log(sequence.join(','));
	}
}
