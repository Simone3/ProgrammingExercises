import { SimpleBinaryTreeNode } from '../../data-structures/tree';

/**
 * Helper class for the exercise function
 */
export class BinaryTreeNodeWithParentLink extends SimpleBinaryTreeNode<number> {

	public parent: BinaryTreeNodeWithParentLink | undefined;
	public leftChild: BinaryTreeNodeWithParentLink | undefined;
	public rightChild: BinaryTreeNodeWithParentLink | undefined;

	public constructor(data: number, leftChild?: BinaryTreeNodeWithParentLink, rightChild?: BinaryTreeNodeWithParentLink) {

		super(data, leftChild, rightChild);

		if(leftChild) {

			leftChild.parent = this;
		}

		if(rightChild) {

			rightChild.parent = this;
		}
	}
}

/**
 * Finds the "next" node (i.e., in-order successor) of a given node in a binary search tree
 * T = O(log N) (on average)
 * S = O(1)
 * @param node the source tree
 * @returns the successor node, or undefined if no successor is present (= the node is the right-most in the tree)
 */
export const getSuccessor = (node: BinaryTreeNodeWithParentLink): BinaryTreeNodeWithParentLink | undefined => {

	if(node.rightChild) {

		// If we have a right subtree, the successor is the left-most element in this subtree
		let currentNode = node.rightChild;
		while(currentNode.leftChild) {

			currentNode = currentNode.leftChild;
		}
		return currentNode;
	}
	else {

		// If we have no right subtree, the successor is the first node that has this subtree as left child, if any (= move up to the parents until there's not parent or the current node is a right child)
		let currentNode = node;
		while(currentNode.parent && currentNode.parent.data < node.data) {

			currentNode = currentNode.parent;
		}
		return currentNode.parent;
	}
};
