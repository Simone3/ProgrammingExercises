import { BinaryTreeNode } from '../../data-structures/tree';

/**
 * Recursive helper for isBinarySearchTree
 * @param node the current node
 * @returns an helper object to tell if the tree is valid so far and the subtree min and max elements
 */
const isBinarySearchTreeRecursiveHelper = (node: BinaryTreeNode<number>): { validSoFar: boolean, min: number, max: number } => {

	// Recurse on left child and interrupt the algorithm if the subtree is not valid
	let min;
	if(node.leftChild) {

		const leftResult = isBinarySearchTreeRecursiveHelper(node.leftChild);
		if(!leftResult.validSoFar || leftResult.max > node.data) {
			
			return {
				validSoFar: false,
				min: 0,
				max: 0
			};
		}
		else {

			min = leftResult.min;
		}
	}

	// Recurse on right child and interrupt the algorithm if the subtree is not valid
	let max;
	if(node.rightChild) {

		const rightResult = isBinarySearchTreeRecursiveHelper(node.rightChild);
		if(!rightResult.validSoFar || rightResult.min <= node.data) {
			
			return {
				validSoFar: false,
				min: 0,
				max: 0
			};
		}
		else {

			max = rightResult.max;
		}
	}

	return {
		validSoFar: true,
		min: min === undefined ? node.data : min,
		max: max === undefined ? node.data : max
	};
};

/**
 * Checks if a binary tree is a binary search tree
 * T = O(N)
 * S = from O(log N) (if balanced) to O(N) (if completely unbalanced)
 * @param tree the source tree
 * @returns true if the tree is a binary search tree
 */
export const isBinarySearchTree = (tree: BinaryTreeNode<number>): boolean => {

	return isBinarySearchTreeRecursiveHelper(tree).validSoFar;
};
