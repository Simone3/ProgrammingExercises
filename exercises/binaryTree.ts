import { BinaryTreeNode, SimpleBinaryTreeNode } from './data-structures/tree';

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
			'b'
		),
		new SimpleBinaryTreeNode(
			'c',
			new SimpleBinaryTreeNode(
				'd'
			),
			new SimpleBinaryTreeNode(
				'e',
				new SimpleBinaryTreeNode(
					'f'
				),
				new SimpleBinaryTreeNode(
					'g',
					new SimpleBinaryTreeNode(
						'h',
						new SimpleBinaryTreeNode(
							'i'
						)
					)
				)
			)
		)
	)
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const toString = test.toString();

	console.log(`toString = ${toString}\n\n`);
}
