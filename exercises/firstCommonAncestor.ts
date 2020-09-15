import { BinaryTreeNode, SimpleBinaryTreeNode } from './data-structures/tree';

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
const getFirstCommonAncestor = <T> (rootNode: BinaryTreeNode<T>, firstNode: BinaryTreeNode<T>, secondNode: BinaryTreeNode<T>): BinaryTreeNode<T> => {

	const rootResult = getFirstCommonAncestorRecursiveHelper(rootNode, firstNode, secondNode);
	
	if(rootResult.foundCount !== 2) {

		throw Error('One or both nodes are not in the tree');
	}

	return rootResult.ancestor;
};

const n10 = new SimpleBinaryTreeNode(10);
const n27a = new SimpleBinaryTreeNode(27);
const n29 = new SimpleBinaryTreeNode(29);
const n28 = new SimpleBinaryTreeNode(28, undefined, n29);
const n27b = new SimpleBinaryTreeNode(27, n27a, n28);
const n25 = new SimpleBinaryTreeNode(25, n10, n27b);
const n30 = new SimpleBinaryTreeNode(30, n25, undefined);
const n52 = new SimpleBinaryTreeNode(52);
const n53 = new SimpleBinaryTreeNode(53, n52, undefined);
const n56 = new SimpleBinaryTreeNode(56);
const n55 = new SimpleBinaryTreeNode(55, n53, n56);
const n70 = new SimpleBinaryTreeNode(70);
const n60 = new SimpleBinaryTreeNode(60, n55, n70);
const n50 = new SimpleBinaryTreeNode(50, n30, n60);

const tests = [
	[ n50, n50 ],
	[ n10, n10 ],
	[ n55, n55 ],
	[ n10, n50 ],
	[ n52, n70 ],
	[ n29, n56 ],
	[ n29, n25 ],
	[ n53, n52 ]
];

console.log('\n\n**********************\n\n');
console.log(`Full Tree: ${n50}`);
for(const test of tests) {

	console.log(`'${test[0].data}' & '${test[1].data}' -----> ${getFirstCommonAncestor(n50, test[0], test[1]).data}`);
}

console.log(`Extra test with non-valid node -----> ${getFirstCommonAncestor(n60, n56, n27b)}`);
