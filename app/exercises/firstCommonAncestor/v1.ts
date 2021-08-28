import { BinaryTreeNode } from '../../data-structures/tree';

/**
 * Recursive (DFS) helper for getFirstCommonAncestor
 * @param currentNode the current node
 * @param firstNode the first node to check
 * @param secondNode the secondo node to check
 * @returns the "found counter" for the current node and the (maybe) ancestor
 */
const getFirstCommonAncestorRecursiveHelper = <T> (currentNode: BinaryTreeNode<T>, firstNode: BinaryTreeNode<T>, secondNode: BinaryTreeNode<T>): { foundCount: number, ancestor: BinaryTreeNode<T>} => {

	let foundCount = 0;

	// Check if the current node is one of the target nodes
	if(currentNode === firstNode) {

		foundCount += 1;
	}
	if(currentNode === secondNode) {

		foundCount += 1;
	}

	if(foundCount !== 2) {

		// Recurse on left child and interrupt right away if both target nodes were found there
		if(currentNode.leftChild) {

			const leftResult = getFirstCommonAncestorRecursiveHelper(currentNode.leftChild, firstNode, secondNode);
			if(leftResult.foundCount === 2) {

				return leftResult;
			}
			
			foundCount += leftResult.foundCount;
		}

		// Recurse on right child and interrupt right away if both target nodes were found there
		if(foundCount !== 2 && currentNode.rightChild) {

			const rightResult = getFirstCommonAncestorRecursiveHelper(currentNode.rightChild, firstNode, secondNode);
			if(rightResult.foundCount === 2) {

				return rightResult;
			}
			
			foundCount += rightResult.foundCount;
		}
	}

	return {
		foundCount: foundCount,
		ancestor: currentNode
	};
};

/**
 * Finds the first common ancestor of two nodes in a binary tree
 * T = O(N)
 * S = from O(log N) (if balanced) to O(N) (if completely unbalanced)
 * @param rootNode the root node of the tree
 * @param firstNode the first node to check
 * @param secondNode the secondo node to check
 * @returns the first common ancestor of the first and second node
 */
export const getFirstCommonAncestor = <T> (rootNode: BinaryTreeNode<T>, firstNode: BinaryTreeNode<T>, secondNode: BinaryTreeNode<T>): BinaryTreeNode<T> => {

	const rootResult = getFirstCommonAncestorRecursiveHelper(rootNode, firstNode, secondNode);
	
	if(rootResult.foundCount !== 2) {

		throw Error('One or both nodes are not in the tree');
	}

	return rootResult.ancestor;
};
