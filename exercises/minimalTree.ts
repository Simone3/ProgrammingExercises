import { BinaryTreeNode, SimpleBinaryTreeNode } from './data-structures/tree';

/**
 * Recursive helper for minimal binary search tree construction
 * @param source the full source array
 * @param startIndex the starting index of the current portion of the source array
 * @param endIndex the ending index of the current portion of the source array
 * @returns the root node of the current portion of the source array
 */
const buildMinimalTreeRecursiveHelper = (source: number[], startIndex: number, endIndex: number): BinaryTreeNode<number> => {

	// Build a new node with the middle element of the current portion as data (compensate the index to maintain the equality constraint as left <= current < right)
	let middleIndex = startIndex + Math.ceil((endIndex - startIndex) / 2);
	const middleValue = source[middleIndex];
	while(middleIndex + 1 <= endIndex && middleValue === source[middleIndex + 1]) {

		middleIndex += 1;
	}
	const currentRoot = new SimpleBinaryTreeNode(middleValue);

	// Split the current portion in two and recurse on left and right child
	if(startIndex <= middleIndex - 1) {

		currentRoot.leftChild = buildMinimalTreeRecursiveHelper(source, startIndex, middleIndex - 1);
	}
	if(middleIndex + 1 <= endIndex) {

		currentRoot.rightChild = buildMinimalTreeRecursiveHelper(source, middleIndex + 1, endIndex);
	}
	
	return currentRoot;
};

/**
 * Given a sorted (increasing order) array with unique integer elements, it creates a binary search tree with minimal height.
 * @param sortedValues the source sorted array (length > 0)
 * @returns the binary search tree with minimal height
 */
const buildMinimalTree = (sortedValues: number[]): BinaryTreeNode<number> => {

	if(sortedValues.length === 0) {

		throw Error('Source must have values');
	}

	return buildMinimalTreeRecursiveHelper(sortedValues, 0, sortedValues.length - 1);
};

const tests: number[][] = [
	[ 5 ],
	[ 5, 7 ],
	[ 5, 7, 8 ],
	[ 5, 7, 8, 10 ],
	[ 5, 7, 8, 10, 15 ],
	[ 5, 7, 8, 10, 15, 22 ],
	[ 5, 7, 8, 10, 15, 22, 30 ],
	[ 5, 7, 8, 10, 15, 22, 30, 30 ],
	[ 5, 7, 8, 10, 15, 22, 30, 30, 30 ],
	[ 5, 7, 8, 10, 15, 22, 30, 30, 30, 150 ],
	[ 5, 7, 8, 10, 15, 22, 30, 30, 30, 150, 200, 200, 245, 364, 564, 1000 ],
	[ 5, 5, 5, 5, 5, 5, 5, 5, 5 ]
];

for(const test of tests) {

	console.log(`'${test}' =====> '${buildMinimalTree(test)}'`);
}
