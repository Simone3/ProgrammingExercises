import { SimpleBinaryTreeNode } from './data-structures/tree';

/**
 * Helper class for the exercise function
 */
class BinaryTreeNodeWithParentLink extends SimpleBinaryTreeNode<number> {

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
const getSuccessor = (node: BinaryTreeNodeWithParentLink): BinaryTreeNodeWithParentLink | undefined => {

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

const n10 = new BinaryTreeNodeWithParentLink(10);
const n27a = new BinaryTreeNodeWithParentLink(27);
const n29 = new BinaryTreeNodeWithParentLink(29);
const n28 = new BinaryTreeNodeWithParentLink(28, undefined, n29);
const n27b = new BinaryTreeNodeWithParentLink(27, n27a, n28);
const n25 = new BinaryTreeNodeWithParentLink(25, n10, n27b);
const n30 = new BinaryTreeNodeWithParentLink(30, n25, undefined);
const n52 = new BinaryTreeNodeWithParentLink(52);
const n53 = new BinaryTreeNodeWithParentLink(53, n52, undefined);
const n56 = new BinaryTreeNodeWithParentLink(56);
const n55 = new BinaryTreeNodeWithParentLink(55, n53, n56);
const n70 = new BinaryTreeNodeWithParentLink(70);
const n60 = new BinaryTreeNodeWithParentLink(60, n55, n70);
const n50 = new BinaryTreeNodeWithParentLink(50, n30, n60);

const tests = [
	n10,
	n27a,
	n29,
	n28,
	n27b,
	n25,
	n30,
	n52,
	n53,
	n56,
	n55,
	n70,
	n60,
	n50
];

console.log('\n\n**********************\n\n');
console.log(`Full Tree: ${n50}`);
for(const test of tests) {

	const successor = getSuccessor(test);
	console.log(`'${test.data}' -----> ${successor ? successor.data : '-'}`);
}
