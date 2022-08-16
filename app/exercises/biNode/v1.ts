import { SimpleQueue } from '../../data-structures/queue';

/**
 * The data structure BiNode could be used to represent both a binary tree (where nodel is the left
 * node and node2 is the right node) or a doubly linked list (where nodel is the previous node and
 * node2 is the next node).
 */
export class BiNode {

	/**
	 * The node data
	 */
	public data: number;

	/**
	 * Binary Tree: left
	 * Linked List: previous
	 */
	public node1: BiNode | undefined;

	/**
	 * Binary Tree: right
	 * Linked List: next
	 */
	public node2: BiNode | undefined;

	public constructor(data: number, node1?: BiNode, node2?: BiNode) {

		this.data = data;
		this.node1 = node1;
		this.node2 = node2;
	}

	public toString(): string {

		let result = '';

		const cycleCheckMap = new Map<BiNode, boolean>();
	
		const nodesQueue = new SimpleQueue<BiNode>();
		nodesQueue.add(this);
	
		while(!nodesQueue.isEmpty()) {
	
			const node = nodesQueue.remove();
			cycleCheckMap.set(node, true);
	
			result += `${result ? '\n' : ''}${node.data}: `;
	
			const node1 = node.node1;
			if(node1) {

				result += node1.data;
				
				if(cycleCheckMap.get(node1)) {

					result += ' (cycle)';
				}
				else {

					nodesQueue.add(node1);
				}
			}
			else {

				result += '/';
			}

			result += ', ';
	
			const node2 = node.node2;
			if(node2) {

				result += node2.data;
				
				if(cycleCheckMap.get(node2)) {

					result += ' (cycle)';
				}
				else {

					nodesQueue.add(node2);
				}
			}
			else {

				result += '/';
			}
		}

		return result;
	}
}

/**
 * Internal container for helper data
 */
interface HelperData {

	nodeToSwapWithRoot: BiNode | undefined;
	linkedListCurrent: BiNode;
}

/**
 * Recursive helper for convertBinarySearchTreeToDoublyLinkedList
 * @param node current node
 * @param helper helper data
 */
const convertBinarySearchTreeToDoublyLinkedListHelper = (node: BiNode, helper: HelperData): void => {

	const node1 = node.node1;
	const node2 = node.node2;

	if(node1) {

		// If current node has a left child, recurse (nodes in the left subtree will always be before this one in the linked list, since they are smaller)
		convertBinarySearchTreeToDoublyLinkedListHelper(node1, helper);
	}

	if(helper.nodeToSwapWithRoot) {

		// This is not the first node to be processed, simply add it as the next node of the linked list
		helper.linkedListCurrent.node2 = node;
		node.node1 = helper.linkedListCurrent;
		helper.linkedListCurrent = node;
	}
	else {

		// This is the first node we are processing (i.e. the smallest value in the tree), need to swap values with the tree root to keep it as the linked list root
		helper.linkedListCurrent.data = node.data;
		node.data = NaN;
		helper.nodeToSwapWithRoot = node;
	}

	if(node2) {

		// If current node has a right child, recurse (nodes in the right subtree will always be after this one in the linked list, since they are greater)
		convertBinarySearchTreeToDoublyLinkedListHelper(node2, helper);
	}
};

/**
 * Converts a binary search tree (implemented with BiNode) into a doubly linked list (implemented with BiNode).
 * The values should be kept in order and the operation should be performed in place (that is, on the original data structure).
 * @param root the root node
 */
export const convertBinarySearchTreeToDoublyLinkedList = (root: BiNode): void => {

	const data = root.data;
	const node1 = root.node1;
	const node2 = root.node2;

	const helper: HelperData = {
		nodeToSwapWithRoot: undefined,
		linkedListCurrent: root
	};

	// Reset root links
	root.node1 = undefined;
	root.node2 = undefined;

	// If root has a left child...
	if(node1) {

		// Call the recursive helper method
		convertBinarySearchTreeToDoublyLinkedListHelper(node1, helper);

		if(!helper.nodeToSwapWithRoot) {

			throw Error('Unexpected empty node to swap: this should never happen!');
		}

		// Overwite the value of the swap node with the root node value (note that this is not needed if root does not have a left child: tree root = linked list root)
		helper.nodeToSwapWithRoot.data = data;
		helper.linkedListCurrent.node2 = helper.nodeToSwapWithRoot;
		helper.nodeToSwapWithRoot.node1 = helper.linkedListCurrent;
		helper.linkedListCurrent = helper.nodeToSwapWithRoot;
	}
	else {

		// No left child means that the tree root is already the linked list root
		helper.nodeToSwapWithRoot = root;
	}

	if(node2) {

		// If root has a right child, call the recursive helper method
		convertBinarySearchTreeToDoublyLinkedListHelper(node2, helper);
	}
};
