import { BinaryTreeNode, SimpleBinaryTreeNode } from './data-structures/tree';

/**
 * Checks if two trees are equal (either by reference or by values)
 * T = O(N) [where N is the number of nodes in the smallest tree]
 * S = O(log N) for balanced trees
 * @param firstTree the first tree
 * @param secondTree the second tree
 * @returns true if they are identical
 */
const areTreesEqual = (firstTree: BinaryTreeNode<number> | undefined, secondTree: BinaryTreeNode<number> | undefined): boolean => {

	if(firstTree === secondTree) {

		return true;
	}
	else if(firstTree && secondTree && firstTree.data === secondTree.data) {

		return areTreesEqual(firstTree.leftChild, secondTree.leftChild) && areTreesEqual(firstTree.rightChild, secondTree.rightChild);
	}
	else {

		return false;
	}
};

/**
 * Recursive helper for checkTrees
 * @param firstTreeCurrentNode the current node of the first tree
 * @param secondTree the second tree
 * @returns true if T2 is a subtree of T1
 */
const checkTreesRecursiveHelper = (firstTreeCurrentNode: BinaryTreeNode<number>, secondTree: BinaryTreeNode<number>): boolean => {

	if(areTreesEqual(firstTreeCurrentNode, secondTree)) {

		return true;
	}

	const leftCheck = firstTreeCurrentNode.leftChild ? checkTreesRecursiveHelper(firstTreeCurrentNode.leftChild, secondTree) : false;
	if(leftCheck) {

		return true;
	}

	const rightCheck = firstTreeCurrentNode.rightChild ? checkTreesRecursiveHelper(firstTreeCurrentNode.rightChild, secondTree) : false;
	if(rightCheck) {

		return true;
	}

	return false;
};

/**
 * Determines if a tree T2 is a subtree of another tree T1. A tree T2 is a subtree of T1 if there exists a node n in T1 such that the subtree of n is identical to T2.
 * T = O(N1 + k * N2) where k is the number of nodes in T1 equal to the root of T2
 * S = O(log N1 + log N2) for balanced trees
 * @param firstTree the T1 tree
 * @param secondTree the T2 tree
 * @returns true if T2 is a subtree of T1
 */
const checkTrees = (firstTree: BinaryTreeNode<number>, secondTree: BinaryTreeNode<number>): boolean => {

	return checkTreesRecursiveHelper(firstTree, secondTree);
};

const testA = new SimpleBinaryTreeNode(
	50
);

const testB = new SimpleBinaryTreeNode(
	11,
	new SimpleBinaryTreeNode(
		12,
		new SimpleBinaryTreeNode(
			50
		)
	)
);

const testC = new SimpleBinaryTreeNode(
	1,
	new SimpleBinaryTreeNode(
		2,
		new SimpleBinaryTreeNode(
			4,
			new SimpleBinaryTreeNode(
				8
			),
			new SimpleBinaryTreeNode(
				9
			)
		),
		new SimpleBinaryTreeNode(
			5,
			new SimpleBinaryTreeNode(
				10
			),
			new SimpleBinaryTreeNode(
				11
			)
		)
	),
	new SimpleBinaryTreeNode(
		3,
		new SimpleBinaryTreeNode(
			6,
			new SimpleBinaryTreeNode(
				12
			),
			new SimpleBinaryTreeNode(
				13
			)
		),
		new SimpleBinaryTreeNode(
			7,
			new SimpleBinaryTreeNode(
				14
			),
			new SimpleBinaryTreeNode(
				15
			)
		)
	)
);

const testD = new SimpleBinaryTreeNode(
	6,
	new SimpleBinaryTreeNode(
		12
	),
	new SimpleBinaryTreeNode(
		13
	)
);
	
const testE = new SimpleBinaryTreeNode(
	6,
	new SimpleBinaryTreeNode(
		11
	),
	new SimpleBinaryTreeNode(
		13
	)
);
	
const testF = new SimpleBinaryTreeNode(
	6,
	undefined,
	new SimpleBinaryTreeNode(
		13
	)
);

const tests: BinaryTreeNode<number>[][] = [
	[ testA, testB ],
	[ testB, testA ],
	[ testC, testC ],
	[ testC, testD ],
	[ testC, testE ],
	[ testC, testF ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`'${test[0]}' + '${test[1]}' -----> ${checkTrees(test[0], test[1])}`);
}
