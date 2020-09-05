import { AdjacencyListGraphNode, SimpleAdjacencyListGraphNode } from './data-structures/graph';

/**
 * Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
 * T = O(K^D) where K = every node has at most K adjacent nodes and D = shortest path from source to target [O(N) worst case]
 * S = O(K^D) [O(N) worst case]
 * @param sourceNode the starting node
 * @param targetNode the ending node
 * @returns true if there's a path from sourceNode to targetNode
 */
export const areNodesConnected = <T> (sourceNode: AdjacencyListGraphNode<T>, targetNode: AdjacencyListGraphNode<T>): boolean => {

	let found = false;
	sourceNode.breadthFirstTraversal((_, node) => {

		found = node === targetNode;
		return found;
	});

	return found;
};

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

for(const test of tests) {

	console.log(`'${test[0].data}' ----> '${test[1].data}' =====> '${areNodesConnected(test[0], test[1])}'`);
}
