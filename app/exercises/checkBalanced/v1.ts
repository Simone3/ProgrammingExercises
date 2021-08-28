import { BinaryTreeNode } from '../../data-structures/tree';

/**
 * Recursive helper for isBalanced
 * @param node the current node
 * @returns the relative node height in the tree, or -1 if this subtree is unbalanced somewhere
 */
const isBalancedRecursiveHelper = <T> (node: BinaryTreeNode<T>): number => {

	// Recurse on left child and interrupt the algorithm if its subtree is unbalanced
	const leftHeight = node.leftChild ? isBalancedRecursiveHelper(node.leftChild) : 0;
	if(leftHeight < 0) {

		return -1;
	}

	// Recurse on right child and interrupt the algorithm if its subtree is unbalanced
	const rightHeight = node.rightChild ? isBalancedRecursiveHelper(node.rightChild) : 0;
	if(rightHeight < 0) {

		return -1;
	}

	// Interrupt the algorithm if the two subtrees differ by more than 1 in height
	if(Math.abs(leftHeight - rightHeight) > 1) {

		return -1;
	}

	return 1 + Math.max(leftHeight, rightHeight);
};

/**
 * Checks if a binary tree is balanced. A balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.
 * T = O(N)
 * S = from O(log N) (if balanced) to O(N) (if completely unbalanced)
 * @param tree the source tree
 * @returns true if the tree is balanced
 */
export const isBalanced = <T> (tree: BinaryTreeNode<T>): boolean => {

	return isBalancedRecursiveHelper(tree) >= 0;
};
