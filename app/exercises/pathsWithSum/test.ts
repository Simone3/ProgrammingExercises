import { SimpleBinaryTreeNode } from '../../data-structures/tree';
import { getPathsWithSumV1 } from './v1';
import { getPathsWithSumV2 } from './v2';

const testTree = new SimpleBinaryTreeNode(
	8,
	new SimpleBinaryTreeNode(
		-1,
		new SimpleBinaryTreeNode(
			5,
			new SimpleBinaryTreeNode(
				1
			),
			new SimpleBinaryTreeNode(
				53
			)
		),
		new SimpleBinaryTreeNode(
			21,
			new SimpleBinaryTreeNode(
				5
			),
			new SimpleBinaryTreeNode(
				8,
				new SimpleBinaryTreeNode(
					2
				)
			)
		)
	),
	new SimpleBinaryTreeNode(
		3,
		new SimpleBinaryTreeNode(
			8,
			new SimpleBinaryTreeNode(
				-12,
				new SimpleBinaryTreeNode(
					20
				)
			),
			new SimpleBinaryTreeNode(
				12
			)
		),
		new SimpleBinaryTreeNode(
			11,
			new SimpleBinaryTreeNode(
				13
			),
			new SimpleBinaryTreeNode(
				-53,
				new SimpleBinaryTreeNode(
					-3,
					new SimpleBinaryTreeNode(
						3,
						new SimpleBinaryTreeNode(
							-3
						)
					)
				)
			)
		)
	)
);

const testSums = [
	13,
	22,
	-31,
	0,
	26,
	23,
	57,
	8,
	27
];

console.log('\n\n*********** V1 ***********\n\n');
console.log(`Full Tree: ${testTree}`);
for(const test of testSums) {

	console.log(`${test} -----> ${getPathsWithSumV1(testTree, test)}`);
}

console.log('\n\n*********** V2 ***********\n\n');
console.log(`Full Tree: ${testTree}`);
for(const test of testSums) {

	console.log(`${test} -----> ${getPathsWithSumV2(testTree, test)}`);
}
