import { BinaryTreeNode, SimpleBinaryTreeNode } from '../../data-structures/tree';
import { getListOfDepths } from './v1';

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

	console.log(`\n\n'${test}' ----->`);
	let node = getListOfDepths(test).head;
	let i = 0;
	while(node) {

		console.log(`${i}: ${node.data}`);
		node = node.next;
		i += 1;
	}
}
