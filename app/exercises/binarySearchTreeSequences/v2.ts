import { BinaryTreeNode } from '../../data-structures/tree';

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
const getBinarySearchTreeSequencesRecursiveHelper = (currentNode: BinaryTreeNode<number>): number[][] => {

	// Recurse on children
	const leftChildResults = currentNode.leftChild ? getBinarySearchTreeSequencesRecursiveHelper(currentNode.leftChild) : [];
	const rightChildResults = currentNode.rightChild ? getBinarySearchTreeSequencesRecursiveHelper(currentNode.rightChild) : [];

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

export const getBinarySearchTreeSequencesV2 = (tree: BinaryTreeNode<number>): number[][] => {

	return getBinarySearchTreeSequencesRecursiveHelper(tree);
};
