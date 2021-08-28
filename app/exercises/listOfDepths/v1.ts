import { SimpleQueue } from '../../data-structures/queue';
import { SimpleNode, SimpleSinglyLinkedList, SinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { BinaryTreeNode } from '../../data-structures/tree';

/**
 * Given a binary tree, it creates a linked list of all the nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).
 * T = O(N)
 * S = O(N)
 * @param tree the source tree
 * @returns the list of lists of values at each depth
 */
export const getListOfDepths = <T> (tree: BinaryTreeNode<T>): SinglyLinkedList<SinglyLinkedList<T>> => {

	// Init the first list of values (depth 0)
	let currentDepthList;
	let currentDepthListNode;

	// Init the list of lists of values
	const listOfDepths = new SimpleSinglyLinkedList<SinglyLinkedList<T>>();
	let listOfDepthsNode;
	
	// Init two queues for nodes and depths
	const nodesQueue = new SimpleQueue<BinaryTreeNode<T>>();
	const depthsQueue = new SimpleQueue<number>();
	nodesQueue.add(tree);
	depthsQueue.add(0);

	// Loop while the queue contains nodes
	let currentDepth = -1;
	while(!nodesQueue.isEmpty()) {

		const node = nodesQueue.remove();
		const depth = depthsQueue.remove();

		// If the depth changes, create a new list for the nodes in this depth and add it to the list of lists
		if(depth !== currentDepth) {

			currentDepth = depth;

			currentDepthList = new SimpleSinglyLinkedList<T>();
			currentDepthListNode = undefined;

			const newListOfListsOfDepthsNode = new SimpleNode<SinglyLinkedList<T>>(currentDepthList);
			if(listOfDepthsNode) {

				listOfDepthsNode.next = newListOfListsOfDepthsNode;
			}
			else {

				listOfDepths.head = newListOfListsOfDepthsNode;
			}
			listOfDepthsNode = newListOfListsOfDepthsNode;
		}

		// Create a new element for the node and add it to the current list
		const newListOfDepthsNode = new SimpleNode<T>(node.data);
		if(currentDepthListNode) {

			currentDepthListNode.next = newListOfDepthsNode;
		}
		else if(currentDepthList) {

			currentDepthList.head = newListOfDepthsNode;
		}
		currentDepthListNode = newListOfDepthsNode;

		// Add the children to the queues
		if(node.leftChild) {

			nodesQueue.add(node.leftChild);
			depthsQueue.add(depth + 1);
		}
		if(node.rightChild) {

			nodesQueue.add(node.rightChild);
			depthsQueue.add(depth + 1);
		}
	}

	return listOfDepths;
};
