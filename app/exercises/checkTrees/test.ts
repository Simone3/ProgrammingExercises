import { BinaryTreeNode, SimpleBinaryTreeNode } from '../../data-structures/tree';
import { checkTrees } from './v1';

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
