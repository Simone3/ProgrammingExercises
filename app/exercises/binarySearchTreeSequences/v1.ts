import { BinaryTreeNode } from '../../data-structures/tree';

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
 * A binary search tree was created by traversing through an array from left to right and inserting each element.
 * Given a binary search tree with distinct elements, it returns all possible arrays that could have led to this tree.
 * @param tree the root of the binary search tree (assumed to be a valid BST with unique elements)
 * @returns the "found counter" for the current node and the (maybe) ancestor
 */
export const getBinarySearchTreeSequencesV1 = (tree: BinaryTreeNode<number>): number[][] => {

	return getBinarySearchTreeSequencesRecursiveHelperV1([], [ tree ]);
};
