import { BinaryTreeNode, SimpleBinaryTreeNode } from '../../data-structures/tree';
import { isBalanced } from './v1';

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
