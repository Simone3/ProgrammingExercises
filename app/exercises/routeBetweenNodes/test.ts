import { AdjacencyListGraphNode, SimpleAdjacencyListGraphNode } from '../../data-structures/graph';
import { areNodesConnected } from './v1';

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

const tests: AdjacencyListGraphNode<string>[][] = [
	[ nodeA, nodeA ],
	[ nodeA, nodeB ],
	[ nodeA, nodeC ],
	[ nodeA, nodeD ],
	[ nodeA, nodeE ],
	[ nodeA, nodeF ],
	[ nodeA, nodeG ],
	[ nodeA, nodeH ],
	[ nodeA, nodeI ],
	[ nodeB, nodeA ],
	[ nodeC, nodeA ],
	[ nodeD, nodeA ],
	[ nodeE, nodeA ],
	[ nodeF, nodeA ],
	[ nodeG, nodeA ],
	[ nodeH, nodeA ],
	[ nodeI, nodeA ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`'${test[0].data}' ----> '${test[1].data}' =====> '${areNodesConnected(test[0], test[1])}'`);
}
