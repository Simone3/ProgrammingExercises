import { BinaryTreeNode } from '../../data-structures/tree';

/**
 * Recursive helper for getPathsWithSumV2
 * @param currentNode the current node
 * @param currentSum the current sum from root
 * @param targetSum the target sum
 * @param sumsMap tha map of currentSum -> number of paths
 * @returns the number of paths that sum to the given value so far
 */
const getPathsWithSumRecursiveHelperV2 = (currentNode: BinaryTreeNode<number>, currentSum: number, targetSum: number, sumsMap: {[key: number]: number}): number => {

	let result = 0;

	const newSum = currentSum + currentNode.data;

	// If the new sum is the target sum, there's a valid path from root to current node, add it
	if(newSum === targetSum) {

		result += 1;
	}

	// If newSum - targetSum is in the map, then there's a valid path from the corresponding node to the current one
	// This is because, if a node X has currentSum = S1 from root and the current node has currentSum = S2 from root and S2 - T = S1, then the path from X to current node has sum T!
	const complementary = newSum - targetSum;
	const complementaryCount = sumsMap[complementary];
	if(complementaryCount) {

		result += complementaryCount;
	}

	// Put the new sum into the map for the children
	sumsMap[newSum] = sumsMap[newSum] ? sumsMap[newSum] + 1 : 1;

	// Recurse on the children
	if(currentNode.leftChild) {

		result += getPathsWithSumRecursiveHelperV2(currentNode.leftChild, newSum, targetSum, sumsMap);
	}
	if(currentNode.rightChild) {

		result += getPathsWithSumRecursiveHelperV2(currentNode.rightChild, newSum, targetSum, sumsMap);
	}

	// Remove the new sum from the map (we are done with this node)
	sumsMap[newSum] -= 1;
	if(!sumsMap[newSum]) {

		delete sumsMap[newSum];
	}

	return result;
};

/**
 * Counts the number of paths that sum to a given value.
 * The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
 * T = O(N)
 * S = O(log N) in a balanced tree
 * @param tree the tree
 * @param sum the sum
 * @returns the number of paths that sum to the given value
 */
export const getPathsWithSumV2 = (tree: BinaryTreeNode<number>, sum: number): number => {

	return getPathsWithSumRecursiveHelperV2(tree, 0, sum, {});
};
