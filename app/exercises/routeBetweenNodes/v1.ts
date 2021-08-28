import { AdjacencyListGraphNode } from '../../data-structures/graph';

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
