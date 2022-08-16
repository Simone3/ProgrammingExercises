import { DoublyLinkedList, SimpleDoublyLinkedList } from './doublyLinkedList';
import { SimpleQueue } from './queue';

/**
 * Internal helper class for tree nodes
 */
class HeapNode<T> {

	public data: T;
	public parent: HeapNode<T> | undefined;
	public leftChild: HeapNode<T> | undefined;
	public rightChild: HeapNode<T> | undefined;

	public constructor(data: T, parent?: HeapNode<T>, leftChild?: HeapNode<T>, rightChild?: HeapNode<T>) {

		this.data = data;
		this.parent = parent;
		this.leftChild = leftChild;
		this.rightChild = rightChild;
	}

	/**
	 * @override
	 */
	public toString(): string {

		let result = '';

		// Init a queue for the nodes
		const nodesQueue = new SimpleQueue<HeapNode<T>>();
		nodesQueue.add(this);

		// Add each node to the queue and print each one
		while(!nodesQueue.isEmpty()) {

			const node = nodesQueue.remove();

			result += `${result ? ' --- ' : ''}${node.data}: `;

			result += `${node.leftChild ? node.leftChild.data : '/'}, ${node.rightChild ? node.rightChild.data : '/'}`;
			
			if(node.leftChild) {
				
				nodesQueue.add(node.leftChild);
			}

			if(node.rightChild) {

				nodesQueue.add(node.rightChild);
			}
		}

		return result;
	}
}

/**
 * A generic priority heap
 */
export interface PriorityHeap<T> {

	/**
	 * Returns the empty status
	 * @returns true if the heap is empty
	 */
	isEmpty(): boolean;

	/**
	 * Gets the first (root) element of the heap
	 * @returns the root element
	 */
	peek(): T;

	/**
	 * Removes and returns the first (root) element of the heap
	 * @returns the root element
	 */
	poll(): T;

	/**
	 * Inserts a new element in the heap
	 * @param newValue the new element
	 */
	insert(newValue: T): void;

	/**
	 * Prints the heap as a string
	 * @returns the string representation
	 */
	toString(): string;
}

/**
 * A simple priority heap implementation
 */
export class SimplePriorityHeap<T = number> implements PriorityHeap<T> {

	/**
	 * The heap is implemented as a binary tree, with each node always greater or equal than its children and therefore the max as root
	 */
	private binaryTreeRoot: HeapNode<T> | undefined;

	/**
	 * Helper list to keep track of all current leaves
	 * The head points to the first added leaves, i.e. those that will be assigned children fist
	 * The tail points to the last added leaves, i.e. those that will be assigned children last
	 */
	private readonly leavesList: DoublyLinkedList<HeapNode<T>> = new SimpleDoublyLinkedList();

	/**
	 * The comparator that decides which element is the max
	 */
	private readonly comparator: (a: T, b: T) => number;

	/**
	 * Constructor that decides which element is the max
	 * @param comparator function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise
	 */
	public constructor(comparator: (a: T, b: T) => number) {

		this.comparator = comparator;
	}

	/**
	 * @override
	 */
	public isEmpty(): boolean {

		return !this.binaryTreeRoot;
	}

	/**
	 * @override
	 */
	public peek(): T {

		if(this.binaryTreeRoot) {

			return this.binaryTreeRoot.data;
		}
		else {

			throw Error('Heap is empty!');
		}
	}
	
	/**
	 * @override
	 */
	public poll(): T {

		if(this.binaryTreeRoot) {

			const originalRootData = this.binaryTreeRoot.data;

			// Get last added leaf (linked list tail = last added leaf)
			const leavesListTail = this.leavesList.tail;
			if(!leavesListTail) {

				throw new Error('Leaves list tail is undefined: this should never happen!');
			}
			const lastAddedLeaf = leavesListTail.data;
			const lastAddedLeafParent = lastAddedLeaf.parent;

			if(lastAddedLeafParent) {

				// Put the last leaf's data as the root
				this.binaryTreeRoot.data = lastAddedLeaf.data;

				// Remove the last leaf from the tree
				const leafWasRightChild = lastAddedLeafParent.rightChild === lastAddedLeaf;
				if(leafWasRightChild) {

					lastAddedLeafParent.rightChild = undefined;
				}
				else {

					lastAddedLeafParent.leftChild = undefined;
				}

				// Remove the last leaf from the list
				this.leavesList.removeTail();

				// If the leaf was the left child, also add its parent to the head (it will be picked up during next insertion to add back the removed child)
				if(!leafWasRightChild) {

					this.leavesList.addToHead(lastAddedLeafParent);
				}

				// Fix the tree to keep the heap sorting
				this.bubbleDown(this.binaryTreeRoot);
			}
			else {

				// There's just 1 element in the tree, clear everything
				this.binaryTreeRoot = undefined;
				this.leavesList.clear();
			}

			return originalRootData;
		}
		else {

			throw Error('Heap is empty!');
		}
	}

	/**
	 * @override
	 */
	public insert(newValue: T): void {

		const newNode = new HeapNode(newValue);

		if(this.binaryTreeRoot) {

			// Get current leaf (linked list head = first added leaf)
			const leavesListHead = this.leavesList.head;
			if(!leavesListHead) {

				throw new Error('Leaves list head is undefined: this should never happen!');
			}
			const leaf = leavesListHead.data;

			// Add the new node as a child of the current leaf
			newNode.parent = leaf;
			if(!leaf.rightChild) {

				leaf.rightChild = newNode;
			}
			else if(!leaf.leftChild) {

				leaf.leftChild = newNode;
			}

			// If the leaf has both right and left children, dequeue it from the list
			if(leaf.rightChild && leaf.leftChild) {

				this.leavesList.removeHead();
			}

			// Fix the tree to keep the heap sorting
			this.bubbleUp(newNode);
		}
		else {

			// Tree is empty, so the new node is the root of the tree
			this.binaryTreeRoot = newNode;
		}

		// Add the new leaf to the tail of the list (linked list tail = last added leaf)
		this.leavesList.addToTail(newNode);
	}

	/**
	 * @override
	 */
	public toString(): string {

		if(this.binaryTreeRoot) {

			return this.binaryTreeRoot.toString();
		}
		else {

			return '/';
		}
	}

	/**
	 * Helper to fix the heap sorting by moving up the current node if it does not satisfy the constraints
	 * @param node the current node
	 */
	private bubbleUp(node: HeapNode<T>): void {

		const parent = node.parent;

		// Node is the root, exit
		if(!parent) {

			return;
		}

		const parentData = parent.data;
		const nodeData = node.data;

		// Parent is greater than node, exit
		if(this.comparator(parentData, nodeData) >= 0) {

			return;
		}

		// Swap parent and child and recurse on parent
		parent.data = nodeData;
		node.data = parentData;
		this.bubbleUp(parent);
	}

	/**
	 * Helper to fix the heap sorting by moving down the current node if it does not satisfy the constraints
	 * @param node the current node
	 */
	private bubbleDown(node: HeapNode<T>): void {

		const left = node.leftChild;
		const right = node.rightChild;

		// No children, exit
		if(!left && !right) {

			return;
		}

		// Get greatest child
		let greatestChild;
		if(left && right && this.comparator(left.data, right.data) < 1) {

			greatestChild = right;
		}
		else if(left) {

			greatestChild = left;
		}
		else if(right) {

			greatestChild = right;
		}
		else {

			throw Error('This else should never happen!');
		}

		const nodeData = node.data;
		const greatestChildData = greatestChild.data;

		// Node is greater than child, exit
		if(this.comparator(nodeData, greatestChildData) >= 0) {

			return;
		}

		// Swap parent and child and recurse on child
		greatestChild.data = nodeData;
		node.data = greatestChildData;
		this.bubbleDown(greatestChild);
	}
}
