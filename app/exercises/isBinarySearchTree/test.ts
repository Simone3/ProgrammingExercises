import { BinaryTreeNode, SimpleBinaryTreeNode } from '../../data-structures/tree';
import { isBinarySearchTree } from './v1';

const tests: BinaryTreeNode<number>[] = [

	new SimpleBinaryTreeNode(
		5
	),

	new SimpleBinaryTreeNode(
		5,
		new SimpleBinaryTreeNode(
			2
		),
		new SimpleBinaryTreeNode(
			7
		)
	),

	new SimpleBinaryTreeNode(
		5,
		new SimpleBinaryTreeNode(
			2
		),
		new SimpleBinaryTreeNode(
			3
		)
	),

	new SimpleBinaryTreeNode(
		5,
		new SimpleBinaryTreeNode(
			8
		),
		new SimpleBinaryTreeNode(
			7
		)
	),

	new SimpleBinaryTreeNode(
		5,
		undefined,
		new SimpleBinaryTreeNode(
			7
		)
	),

	new SimpleBinaryTreeNode(
		5,
		new SimpleBinaryTreeNode(
			2
		)
	),

	new SimpleBinaryTreeNode(
		40,
		new SimpleBinaryTreeNode(
			30,
			new SimpleBinaryTreeNode(
				8,
				new SimpleBinaryTreeNode(
					7,
					new SimpleBinaryTreeNode(
						1
					)
				),
				new SimpleBinaryTreeNode(
					10,
					new SimpleBinaryTreeNode(
						9
					),
					new SimpleBinaryTreeNode(
						14
					)
				)
			),
			new SimpleBinaryTreeNode(
				31,
				undefined
			)
		),
		new SimpleBinaryTreeNode(
			245,
			new SimpleBinaryTreeNode(
				230,
				new SimpleBinaryTreeNode(
					230,
					new SimpleBinaryTreeNode(
						230
					)
				),
				new SimpleBinaryTreeNode(
					235,
					new SimpleBinaryTreeNode(
						231
					),
					new SimpleBinaryTreeNode(
						236
					)
				)
			),
			new SimpleBinaryTreeNode(
				1000,
				undefined,
				new SimpleBinaryTreeNode(
					1007,
					new SimpleBinaryTreeNode(
						1001
					),
					new SimpleBinaryTreeNode(
						1008
					)
				)
			)
		)
	),

	new SimpleBinaryTreeNode(
		40,
		new SimpleBinaryTreeNode(
			30,
			new SimpleBinaryTreeNode(
				8,
				new SimpleBinaryTreeNode(
					7,
					new SimpleBinaryTreeNode(
						1
					)
				),
				new SimpleBinaryTreeNode(
					10,
					new SimpleBinaryTreeNode(
						9
					),
					new SimpleBinaryTreeNode(
						14
					)
				)
			),
			new SimpleBinaryTreeNode(
				31,
				undefined
			)
		),
		new SimpleBinaryTreeNode(
			245,
			new SimpleBinaryTreeNode(
				230,
				new SimpleBinaryTreeNode(
					230,
					new SimpleBinaryTreeNode(
						230
					)
				),
				new SimpleBinaryTreeNode(
					235,
					new SimpleBinaryTreeNode(
						231
					),
					new SimpleBinaryTreeNode(
						235
					)
				)
			),
			new SimpleBinaryTreeNode(
				1000,
				undefined,
				new SimpleBinaryTreeNode(
					1007,
					new SimpleBinaryTreeNode(
						1001
					),
					new SimpleBinaryTreeNode(
						1008
					)
				)
			)
		)
	),

	new SimpleBinaryTreeNode(
		40,
		new SimpleBinaryTreeNode(
			30,
			new SimpleBinaryTreeNode(
				8,
				new SimpleBinaryTreeNode(
					7,
					new SimpleBinaryTreeNode(
						1
					)
				),
				new SimpleBinaryTreeNode(
					10,
					new SimpleBinaryTreeNode(
						11
					),
					new SimpleBinaryTreeNode(
						14
					)
				)
			),
			new SimpleBinaryTreeNode(
				31,
				undefined
			)
		),
		new SimpleBinaryTreeNode(
			245,
			new SimpleBinaryTreeNode(
				230,
				new SimpleBinaryTreeNode(
					230,
					new SimpleBinaryTreeNode(
						230
					)
				),
				new SimpleBinaryTreeNode(
					235,
					new SimpleBinaryTreeNode(
						231
					),
					new SimpleBinaryTreeNode(
						236
					)
				)
			),
			new SimpleBinaryTreeNode(
				1000,
				undefined,
				new SimpleBinaryTreeNode(
					1007,
					new SimpleBinaryTreeNode(
						1001
					),
					new SimpleBinaryTreeNode(
						1008
					)
				)
			)
		)
	),

	new SimpleBinaryTreeNode(
		40,
		new SimpleBinaryTreeNode(
			32,
			new SimpleBinaryTreeNode(
				8,
				new SimpleBinaryTreeNode(
					7,
					new SimpleBinaryTreeNode(
						1
					)
				),
				new SimpleBinaryTreeNode(
					10,
					new SimpleBinaryTreeNode(
						9
					),
					new SimpleBinaryTreeNode(
						14
					)
				)
			),
			new SimpleBinaryTreeNode(
				31,
				undefined
			)
		),
		new SimpleBinaryTreeNode(
			245,
			new SimpleBinaryTreeNode(
				230,
				new SimpleBinaryTreeNode(
					230,
					new SimpleBinaryTreeNode(
						230
					)
				),
				new SimpleBinaryTreeNode(
					235,
					new SimpleBinaryTreeNode(
						231
					),
					new SimpleBinaryTreeNode(
						236
					)
				)
			),
			new SimpleBinaryTreeNode(
				1000,
				undefined,
				new SimpleBinaryTreeNode(
					1007,
					new SimpleBinaryTreeNode(
						1001
					),
					new SimpleBinaryTreeNode(
						1008
					)
				)
			)
		)
	),

	new SimpleBinaryTreeNode(
		246,
		new SimpleBinaryTreeNode(
			30,
			new SimpleBinaryTreeNode(
				8,
				new SimpleBinaryTreeNode(
					7,
					new SimpleBinaryTreeNode(
						1
					)
				),
				new SimpleBinaryTreeNode(
					10,
					new SimpleBinaryTreeNode(
						9
					),
					new SimpleBinaryTreeNode(
						14
					)
				)
			),
			new SimpleBinaryTreeNode(
				31,
				undefined
			)
		),
		new SimpleBinaryTreeNode(
			245,
			new SimpleBinaryTreeNode(
				230,
				new SimpleBinaryTreeNode(
					230,
					new SimpleBinaryTreeNode(
						230
					)
				),
				new SimpleBinaryTreeNode(
					235,
					new SimpleBinaryTreeNode(
						231
					),
					new SimpleBinaryTreeNode(
						236
					)
				)
			),
			new SimpleBinaryTreeNode(
				1000,
				undefined,
				new SimpleBinaryTreeNode(
					1007,
					new SimpleBinaryTreeNode(
						1001
					),
					new SimpleBinaryTreeNode(
						1008
					)
				)
			)
		)
	)
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`\n\n'${test}' -----> ${isBinarySearchTree(test)}`);
}
