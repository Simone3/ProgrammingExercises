import { BinaryTreeNode, SimpleBinaryTreeNode } from './data-structures/tree';

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
const isBalanced = <T> (tree: BinaryTreeNode<T>): boolean => {

	return isBalancedRecursiveHelper(tree) >= 0;
};

const tests: BinaryTreeNode<string>[] = [

	new SimpleBinaryTreeNode(
		'a'
	),

	new SimpleBinaryTreeNode(
		'a',
		new SimpleBinaryTreeNode(
			'b'
		)
	),

	new SimpleBinaryTreeNode(
		'a',
		new SimpleBinaryTreeNode(
			'b'
		),
		new SimpleBinaryTreeNode(
			'c'
		)
	),
	
	new SimpleBinaryTreeNode(
		'a',
		new SimpleBinaryTreeNode(
			'b',
			new SimpleBinaryTreeNode(
				'd',
				new SimpleBinaryTreeNode(
					'h'
				),
				new SimpleBinaryTreeNode(
					'i'
				)
			),
			new SimpleBinaryTreeNode(
				'e',
				new SimpleBinaryTreeNode(
					'j'
				),
				new SimpleBinaryTreeNode(
					'k'
				)
			)
		),
		new SimpleBinaryTreeNode(
			'c',
			new SimpleBinaryTreeNode(
				'f',
				new SimpleBinaryTreeNode(
					'l'
				),
				new SimpleBinaryTreeNode(
					'm'
				)
			),
			new SimpleBinaryTreeNode(
				'g',
				new SimpleBinaryTreeNode(
					'n'
				),
				new SimpleBinaryTreeNode(
					'o'
				)
			)
		)
	),
	
	new SimpleBinaryTreeNode(
		'a',
		new SimpleBinaryTreeNode(
			'b',
			new SimpleBinaryTreeNode(
				'd',
				new SimpleBinaryTreeNode(
					'i'
				)
			),
			new SimpleBinaryTreeNode(
				'e',
				new SimpleBinaryTreeNode(
					'j'
				)
			)
		),
		new SimpleBinaryTreeNode(
			'c',
			new SimpleBinaryTreeNode(
				'f',
				new SimpleBinaryTreeNode(
					'm'
				)
			),
			new SimpleBinaryTreeNode(
				'g',
				new SimpleBinaryTreeNode(
					'n'
				),
				new SimpleBinaryTreeNode(
					'o'
				)
			)
		)
	),
	
	new SimpleBinaryTreeNode(
		'a',
		new SimpleBinaryTreeNode(
			'b',
			new SimpleBinaryTreeNode(
				'd',
				new SimpleBinaryTreeNode(
					'h'
				),
				new SimpleBinaryTreeNode(
					'i'
				)
			),
			new SimpleBinaryTreeNode(
				'e',
				new SimpleBinaryTreeNode(
					'j'
				),
				new SimpleBinaryTreeNode(
					'k'
				)
			)
		),
		new SimpleBinaryTreeNode(
			'c',
			new SimpleBinaryTreeNode(
				'f',
				new SimpleBinaryTreeNode(
					'l',
					new SimpleBinaryTreeNode(
						'x'
					),
					new SimpleBinaryTreeNode(
						'y'
					)
				),
				new SimpleBinaryTreeNode(
					'm'
				)
			),
			new SimpleBinaryTreeNode(
				'g',
				new SimpleBinaryTreeNode(
					'n'
				),
				new SimpleBinaryTreeNode(
					'o'
				)
			)
		)
	),
	
	new SimpleBinaryTreeNode(
		'a',
		new SimpleBinaryTreeNode(
			'b',
			new SimpleBinaryTreeNode(
				'd',
				new SimpleBinaryTreeNode(
					'i'
				)
			),
			new SimpleBinaryTreeNode(
				'e',
				new SimpleBinaryTreeNode(
					'j'
				)
			)
		),
		new SimpleBinaryTreeNode(
			'c',
			new SimpleBinaryTreeNode(
				'f',
				new SimpleBinaryTreeNode(
					'm'
				)
			),
			new SimpleBinaryTreeNode(
				'g',
				new SimpleBinaryTreeNode(
					'n'
				),
				new SimpleBinaryTreeNode(
					'o',
					new SimpleBinaryTreeNode(
						'p',
						new SimpleBinaryTreeNode(
							'q'
						)
					)
				)
			)
		)
	),
	
	new SimpleBinaryTreeNode(
		'a',
		new SimpleBinaryTreeNode(
			'b',
			new SimpleBinaryTreeNode(
				'd',
				new SimpleBinaryTreeNode(
					'i'
				)
			),
			new SimpleBinaryTreeNode(
				'e',
				new SimpleBinaryTreeNode(
					'j',
					new SimpleBinaryTreeNode(
						'x'
					),
					new SimpleBinaryTreeNode(
						'y',
						new SimpleBinaryTreeNode(
							'z'
						)
					)
				)
			)
		),
		new SimpleBinaryTreeNode(
			'c',
			new SimpleBinaryTreeNode(
				'f',
				new SimpleBinaryTreeNode(
					'm'
				)
			),
			new SimpleBinaryTreeNode(
				'g',
				new SimpleBinaryTreeNode(
					'n'
				),
				new SimpleBinaryTreeNode(
					'o'
				)
			)
		)
	),
	
	new SimpleBinaryTreeNode(
		'a',
		new SimpleBinaryTreeNode(
			'b',
			new SimpleBinaryTreeNode(
				'd',
				new SimpleBinaryTreeNode(
					'i'
				)
			),
			new SimpleBinaryTreeNode(
				'e',
				new SimpleBinaryTreeNode(
					'j'
				)
			)
		),
		new SimpleBinaryTreeNode(
			'c',
			new SimpleBinaryTreeNode(
				'f',
				new SimpleBinaryTreeNode(
					'm',
					new SimpleBinaryTreeNode(
						'w',
						new SimpleBinaryTreeNode(
							'y'
						),
						new SimpleBinaryTreeNode(
							'z'
						)
					),
					new SimpleBinaryTreeNode(
						'x',
						new SimpleBinaryTreeNode(
							'0'
						),
						new SimpleBinaryTreeNode(
							'1'
						)
					)
				)
			),
			new SimpleBinaryTreeNode(
				'g',
				new SimpleBinaryTreeNode(
					'n'
				),
				new SimpleBinaryTreeNode(
					'o'
				)
			)
		)
	)
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`\n\n'${test}' -----> ${isBalanced(test)}`);
}
