import { AdjacencyMatrixGraph, SimpleAdjacencyMatrixGraph } from './data-structures/graph';

const tests: AdjacencyMatrixGraph<string>[] = [
	new SimpleAdjacencyMatrixGraph([]),
	new SimpleAdjacencyMatrixGraph([ 'a' ]),
	new SimpleAdjacencyMatrixGraph([ 'a', 'b' ], [{ i: 0, j: 1 }]),
	new SimpleAdjacencyMatrixGraph([ 'a', 'b', 'c', 'd' ], [{ i: 0, j: 1 }, { i: 0, j: 2 }, { i: 0, j: 3 }]),
	new SimpleAdjacencyMatrixGraph([ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ], [{ i: 0, j: 1 }, { i: 0, j: 2 }, { i: 0, j: 6 }, { i: 2, j: 3 }, { i: 2, j: 4 }, { i: 2, j: 5 }, { i: 6, j: 7 }, { i: 7, j: 8 }])
];

const additionalTest = new SimpleAdjacencyMatrixGraph([ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ]);
additionalTest.addConnection(0, 1);
additionalTest.addConnection(0, 0);
additionalTest.addConnection(0, 2);
additionalTest.addConnection(1, 3);
additionalTest.addConnection(2, 0);
additionalTest.addConnection(2, 3);
additionalTest.addConnection(3, 4);
additionalTest.addConnection(4, 4);
additionalTest.addConnection(4, 5);
additionalTest.addConnection(4, 6);
additionalTest.addConnection(4, 7);
additionalTest.addConnection(7, 0);
additionalTest.addConnection(7, 8);
tests.push(additionalTest);

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const toString = test.toString();

	let breadthFirst = '';
	test.breadthFirstTraversal((data, depth) => {

		breadthFirst += `${' '.repeat(depth)}${data}\n`;
	});

	let interruptedBreadthFirst = '';
	test.breadthFirstTraversal((data, depth) => {

		interruptedBreadthFirst += `${' '.repeat(depth)}${data}\n`;
		return data === 'c';
	});

	let depthFirst = '';
	test.depthFirstTraversal((data, depth) => {

		depthFirst += `${' '.repeat(depth)}${data}\n`;
	});

	let interruptedDepthFirst = '';
	test.depthFirstTraversal((data, depth) => {

		interruptedDepthFirst += `${' '.repeat(depth)}${data}\n`;
		return data === 'c';
	});

	console.log(`toString = ${toString}\n\n`);
	console.log(`breadthFirst =\n${breadthFirst}\n\n`);
	console.log(`interruptedBreadthFirst =\n${interruptedBreadthFirst}\n\n`);
	console.log(`depthFirst =\n${depthFirst}\n\n`);
	console.log(`interruptedDepthFirst =\n${interruptedDepthFirst}\n\n\n------------------\n\n\n\n`);
}

