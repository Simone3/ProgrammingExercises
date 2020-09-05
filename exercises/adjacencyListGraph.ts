import { AdjacencyListGraphNode, SimpleAdjacencyListGraphNode } from './data-structures/graph';

const tests: AdjacencyListGraphNode<string>[] = [
	new SimpleAdjacencyListGraphNode('a'),
	new SimpleAdjacencyListGraphNode('a', [ new SimpleAdjacencyListGraphNode('b') ]),
	new SimpleAdjacencyListGraphNode('a', [ new SimpleAdjacencyListGraphNode('b'), new SimpleAdjacencyListGraphNode('c'), new SimpleAdjacencyListGraphNode('d') ]),
	new SimpleAdjacencyListGraphNode('a', [ new SimpleAdjacencyListGraphNode('b'), new SimpleAdjacencyListGraphNode('c', [ new SimpleAdjacencyListGraphNode('d'), new SimpleAdjacencyListGraphNode('e'), new SimpleAdjacencyListGraphNode('f') ]), new SimpleAdjacencyListGraphNode('g', [ new SimpleAdjacencyListGraphNode('h', [ new SimpleAdjacencyListGraphNode('i') ]) ]) ])
];

const nodeA = new SimpleAdjacencyListGraphNode('a');
const nodeB = new SimpleAdjacencyListGraphNode('b');
const nodeC = new SimpleAdjacencyListGraphNode('c');
const nodeD = new SimpleAdjacencyListGraphNode('d');
const nodeE = new SimpleAdjacencyListGraphNode('e');
const nodeF = new SimpleAdjacencyListGraphNode('f');
const nodeG = new SimpleAdjacencyListGraphNode('g');
const nodeH = new SimpleAdjacencyListGraphNode('h');
const nodeI = new SimpleAdjacencyListGraphNode('i');
nodeA.children = [ nodeB, nodeA, nodeC ];
nodeB.children = [ nodeD ];
nodeC.children = [ nodeA, nodeD ];
nodeD.children = [ nodeE ];
nodeE.children = [ nodeE, nodeF, nodeG, nodeH ];
nodeH.children = [ nodeA, nodeI ];
tests.push(nodeA);

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const toString = test.toString();

	let breadthFirst = '';
	test.breadthFirstTraversal((data, _, depth) => {

		breadthFirst += `${' '.repeat(depth)}${data}\n`;
	});

	let interruptedBreadthFirst = '';
	test.breadthFirstTraversal((data, _, depth) => {

		interruptedBreadthFirst += `${' '.repeat(depth)}${data}\n`;
		return data === 'c';
	});

	let depthFirst = '';
	test.depthFirstTraversal((data, _, depth) => {

		depthFirst += `${' '.repeat(depth)}${data}\n`;
	});

	let interruptedDepthFirst = '';
	test.depthFirstTraversal((data, _, depth) => {

		interruptedDepthFirst += `${' '.repeat(depth)}${data}\n`;
		return data === 'c';
	});

	console.log(`toString = ${toString}\n\n`);
	console.log(`breadthFirst =\n${breadthFirst}\n\n`);
	console.log(`interruptedBreadthFirst =\n${interruptedBreadthFirst}\n\n`);
	console.log(`depthFirst =\n${depthFirst}\n\n`);
	console.log(`interruptedDepthFirst =\n${interruptedDepthFirst}\n\n\n------------------\n\n\n\n`);
}
