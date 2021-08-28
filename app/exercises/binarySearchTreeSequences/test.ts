import { BinaryTreeNode, SimpleBinaryTreeNode } from '../../data-structures/tree';
import { getBinarySearchTreeSequencesV1 } from './v1';
import { getBinarySearchTreeSequencesV2 } from './v2';

const tests: BinaryTreeNode<number>[] = [

	new SimpleBinaryTreeNode(
		50
	),

	new SimpleBinaryTreeNode(
		50,
		new SimpleBinaryTreeNode(
			30
		)
	),

	new SimpleBinaryTreeNode(
		50,
		new SimpleBinaryTreeNode(
			30
		),
		new SimpleBinaryTreeNode(
			60
		)
	),

	new SimpleBinaryTreeNode(
		50,
		new SimpleBinaryTreeNode(
			30,
			new SimpleBinaryTreeNode(
				25,
				new SimpleBinaryTreeNode(
					10,
					new SimpleBinaryTreeNode(
						1
					)
				)
			)
		)
	),
	
	new SimpleBinaryTreeNode(
		50,
		new SimpleBinaryTreeNode(
			30,
			new SimpleBinaryTreeNode(
				25
			)
		),
		new SimpleBinaryTreeNode(
			60,
			new SimpleBinaryTreeNode(
				55
			),
			new SimpleBinaryTreeNode(
				70
			)
		)
	)
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const sequences = getBinarySearchTreeSequencesV1(test);
	console.log(`\n\n'${test}' ----->`);
	for(const sequence of sequences) {
		
		console.log(sequence.join(','));
	}
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const sequences = getBinarySearchTreeSequencesV2(test);
	console.log(`\n\n'${test}' ----->`);
	for(const sequence of sequences) {
		
		console.log(sequence.join(','));
	}
}
