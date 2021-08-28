import { BinaryTreeNode } from '../../data-structures/tree';

/**
 * Recursive helper for getPathsWithSumV1
 * @param currentNode the current node
 * @param currentSums the current partial sums that pass through this node
 * @param sum the target sum
 * @returns the number of paths that sum to the given value so far
 */
const getPathsWithSumRecursiveHelperV1 = (currentNode: BinaryTreeNode<number>, currentSums: number[], sum: number): number => {
	
	let result = 0;
	const newSums = [];

	for(const currentSum of currentSums) {

		const newSum = currentSum + currentNode.data;

		// If we reached the required sum, increase the count and do not add this sum back
		if(newSum === sum) {

			result += 1;
		}

		// Add it back to the new list of sums
		newSums.push(newSum);
	}

	// If the current node alone is the required sum, increase the count and do not add it to the list
	if(currentNode.data === sum) {

		result += 1;
	}

	// Add the current node to the list of sums (paths that start with this node)
	newSums.push(currentNode.data);

	// Recurse on the children
	if(currentNode.leftChild) {

		result += getPathsWithSumRecursiveHelperV1(currentNode.leftChild, newSums, sum);
	}
	if(currentNode.rightChild) {

		result += getPathsWithSumRecursiveHelperV1(currentNode.rightChild, newSums, sum);
	}

	return result;
};

/**
 * Counts the number of paths that sum to a given value.
 * The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
 * T = O(N * log N)
 * S = O((log N)^2) for a balanced tree
 * @param tree the tree
 * @param sum the sum
 * @returns the number of paths that sum to the given value
 */
export const getPathsWithSumV1 = (tree: BinaryTreeNode<number>, sum: number): number => {

	return getPathsWithSumRecursiveHelperV1(tree, [], sum);
};
