import { SimpleBinaryTreeNode } from '../../data-structures/tree';
import { getFirstCommonAncestor } from './v1';

const n10 = new SimpleBinaryTreeNode(10);
const n27a = new SimpleBinaryTreeNode(27);
const n29 = new SimpleBinaryTreeNode(29);
const n28 = new SimpleBinaryTreeNode(28, undefined, n29);
const n27b = new SimpleBinaryTreeNode(27, n27a, n28);
const n25 = new SimpleBinaryTreeNode(25, n10, n27b);
const n30 = new SimpleBinaryTreeNode(30, n25, undefined);
const n52 = new SimpleBinaryTreeNode(52);
const n53 = new SimpleBinaryTreeNode(53, n52, undefined);
const n56 = new SimpleBinaryTreeNode(56);
const n55 = new SimpleBinaryTreeNode(55, n53, n56);
const n70 = new SimpleBinaryTreeNode(70);
const n60 = new SimpleBinaryTreeNode(60, n55, n70);
const n50 = new SimpleBinaryTreeNode(50, n30, n60);

const tests = [
	[ n50, n50 ],
	[ n10, n10 ],
	[ n55, n55 ],
	[ n10, n50 ],
	[ n52, n70 ],
	[ n29, n56 ],
	[ n29, n25 ],
	[ n53, n52 ]
];

console.log('\n\n**********************\n\n');
console.log(`Full Tree: ${n50}`);
for(const test of tests) {

	console.log(`'${test[0].data}' & '${test[1].data}' -----> ${getFirstCommonAncestor(n50, test[0], test[1]).data}`);
}

console.log(`Extra test with non-valid node -----> ${getFirstCommonAncestor(n60, n56, n27b)}`);
