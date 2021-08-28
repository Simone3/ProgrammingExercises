import { SimpleTreeNode, TreeNode } from '../../data-structures/tree';

const tests: TreeNode<string>[] = [

	new SimpleTreeNode('a'),

	new SimpleTreeNode('a', [
		new SimpleTreeNode('b')
	]),

	new SimpleTreeNode('a', [
		new SimpleTreeNode('b'),
		new SimpleTreeNode('c'),
		new SimpleTreeNode('d')
	]),
	
	new SimpleTreeNode('a', [
		new SimpleTreeNode('b'),
		new SimpleTreeNode('c', [
			new SimpleTreeNode('d'),
			new SimpleTreeNode('e'),
			new SimpleTreeNode('f')
		]),
		new SimpleTreeNode('g', [
			new SimpleTreeNode('h', [
				new SimpleTreeNode('i')
			])
		])
	])
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const toString = test.toString();

	console.log(`toString = ${toString}\n\n`);
}
