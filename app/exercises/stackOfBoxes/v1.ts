import { DoublyLinkedList, Node, SimpleDoublyLinkedList, SimpleNode } from '../../data-structures/doublyLinkedList';
import { Box } from './common';

/**
 * V1 of the solution (dynamic stack construction)
 */
export class StackOfBoxesSolverV1 {

	private readonly stacks: DoublyLinkedList<DoublyLinkedList<Box>> = new SimpleDoublyLinkedList();

	/**
	 * Adds a box to the solution
	 * @param box the box
	 */
	public addBox(box: Box): void {

		if(this.stacks.head) {

			// Loop all current stacks and add the box to each of them
			let stackNode: Node<DoublyLinkedList<Box>> | undefined = this.stacks.head;
			while(stackNode) {

				const stack = stackNode.data;
				this.addBoxToStack(stack, box);
				stackNode = stackNode.next;
			}
		}
		else {

			// Add the first element of the first stack
			const newStack = new SimpleDoublyLinkedList<Box>();
			newStack.head = new SimpleNode(box);
			this.stacks.head = this.stacks.tail = new SimpleNode(newStack);
		}
	}

	/**
	 * Returns the tallest possible stack of boxes
	 * @returns the tallest possible stack
	 */
	public getTallestPossibleStack(): DoublyLinkedList<Box> {

		if(this.stacks.head) {

			let tallestStack = this.stacks.head.data;
			let tallestStackLength = tallestStack.length();

			let stackNode: Node<DoublyLinkedList<Box>> | undefined = this.stacks.head;
			while(stackNode) {

				const stack = stackNode.data;
				const stackLength = stack.length();

				if(stackLength > tallestStackLength) {

					tallestStack = stack;
					tallestStackLength = stackLength;
				}

				stackNode = stackNode.next;
			}

			return tallestStack;
		}
		else {

			return new SimpleDoublyLinkedList();
		}
	}

	/**
	 * Returns all current stack options as a string
	 * @returns the string representation
	 */
	public toString(): string {

		if(this.stacks.head) {

			const result: string[] = [];

			let stackNode: Node<DoublyLinkedList<Box>> | undefined = this.stacks.head;
			while(stackNode) {

				const stack = stackNode.data;
				result.push(stack.toString());
				stackNode = stackNode.next;
			}

			return result.join('\n');
		}
		else {

			return '-';
		}
	}

	/**
	 * Adds the box to the given stack, possibly cloning it if it does not fit perfectly anywhere
	 * @param stack the stack
	 * @param box the new box
	 */
	private addBoxToStack(stack: DoublyLinkedList<Box>, box: Box): void {

		// Find the first node on which the new box can be stacked upon, if any
		let prevNode: Node<Box> | undefined;
		let node: Node<Box> | undefined = stack.head;
		while(node) {

			const currentBox = node.data;

			if(box.canBeStackedAbove(currentBox)) {

				break;
			}

			prevNode = node;
			node = node.next;
		}

		if(node) {

			if(prevNode) {

				if(prevNode.data.canBeStackedAbove(box)) {

					// New box fits perfectly between "prevNode" and "node", simply add it between them
					this.placeNodeBetween(stack, box, prevNode, node);
				}
				else {
					
					// New box fits on top of "node" but not below "prevNode": clone the stack, place the new box and remove all non-compatible boxes on top
					this.cloneStackWithNewBox(box, prevNode, node);
				}
			}
			else {

				// New box fits on top of "node" and "node" is the top of the stack, simply add the new one as the head
				this.placeNodeBetween(stack, box, undefined, node);
			}
		}
		else if(prevNode) {

			if(prevNode.data.canBeStackedAbove(box)) {

				// New box fits below "prevNode" (i.e. at the bottom of the stack), simply add it as the tail
				this.placeNodeBetween(stack, box, prevNode, undefined);
			}
			else {

				// New box does not fit anywhere in the stack: place the new box as the bottom and clone all boxes that fit on top
				this.cloneStackWithNewBox(box, prevNode, undefined);
			}
		}
		else {

			throw Error('There should always be at least a prevNode...!');
		}
	}

	/**
	 * Adds the new box on top of "nextNode", clones all boxes below it, clones all stackable boxes above it
	 * @param newBox the new box
	 * @param prevNode the box above "nextNode"
	 * @param nextNode the starting point of the new stack (if null, new box is the stack bottom)
	 */
	private cloneStackWithNewBox(newBox: Box, prevNode: Node<Box>, nextNode: Node<Box> | undefined): void {

		const newStack = new SimpleDoublyLinkedList<Box>();

		const newNode = new SimpleNode(newBox);

		// Clone as-is the part from "nextNode" to the bottom
		if(nextNode) {

			this.cloneStackFromNodeToBottom(nextNode, newStack, newNode);
		}
		else {
			
			newStack.tail = newNode;
		}

		// Remove all incompatible boxes from "prevNode" to the top
		let firstCompatibleTopNode: Node<Box> | undefined = prevNode;
		while(firstCompatibleTopNode && !firstCompatibleTopNode.data.canBeStackedAbove(newBox)) {

			firstCompatibleTopNode = firstCompatibleTopNode.prev;
		}

		// Clone as-is the remaining top part
		if(firstCompatibleTopNode) {

			this.cloneStackFromNodeToTop(firstCompatibleTopNode, newStack, newNode);
		}
		else {

			newStack.head = newNode;
		}

		// Add the stack to the list of stacks (at the beginning to avoid impacting the current stacks loop)
		if(!this.stacks.head) {

			throw Error('There should always be a stacks head...!');
		}
		const newStackNode = new SimpleNode(newStack);
		const oldStacksHead = this.stacks.head;
		this.stacks.head = newStackNode;
		newStackNode.next = oldStacksHead;
		oldStacksHead.prev = newStackNode;
	}

	/**
	 * Places a box between two nodes (all three are assumed to be stackable)
	 * @param stack the stack
	 * @param newBox the box to add
	 * @param prevNode the box to be above the new one (if any)
	 * @param nextNode the box to be below the new one (if any)
	 */
	private placeNodeBetween(stack: DoublyLinkedList<Box>, newBox: Box, prevNode: Node<Box> | undefined, nextNode: Node<Box> | undefined): void {

		const newNode = new SimpleNode(newBox);
		newNode.prev = prevNode;
		newNode.next = nextNode;

		if(prevNode) {

			prevNode.next = newNode;
		}
		else {

			stack.head = newNode;
		}

		if(nextNode) {

			nextNode.prev = newNode;
		}
		else {

			stack.tail = newNode;
		}
	}

	/**
	 * Copies to "newStack" (on top of "currentNewNode") all nodes from "fromOriginalNode" to the top
	 * @param fromOriginalNode the starting point of the original stack
	 * @param newStack the new stack
	 * @param currentNewNode the starting point of the new stack
	 */
	private cloneStackFromNodeToTop(fromOriginalNode: Node<Box>, newStack: DoublyLinkedList<Box>, currentNewNode: Node<Box>): void {

		let prevClonedNode: Node<Box> = currentNewNode;
		let clonedNode: Node<Box> | undefined;
		let originalNode: Node<Box> | undefined = fromOriginalNode;
		while(originalNode) {

			clonedNode = new SimpleNode(originalNode.data);
			prevClonedNode.prev = clonedNode;
			clonedNode.next = prevClonedNode;

			prevClonedNode = clonedNode;
			originalNode = originalNode.prev;
		}
		newStack.head = clonedNode;
	}

	/**
	 * Copies to "newStack" (below "currentNewNode") all nodes from "fromOriginalNode" to the bottom
	 * @param fromOriginalNode the starting point of the original stack
	 * @param newStack the new stack
	 * @param currentNewNode the starting point of the new stack
	 */
	private cloneStackFromNodeToBottom(fromOriginalNode: Node<Box>, newStack: DoublyLinkedList<Box>, currentNewNode: Node<Box>): void {

		let prevClonedNode: Node<Box> = currentNewNode;
		let clonedNode: Node<Box> | undefined;
		let originalNode: Node<Box> | undefined = fromOriginalNode;
		while(originalNode) {

			clonedNode = new SimpleNode(originalNode.data);
			prevClonedNode.next = clonedNode;
			clonedNode.prev = prevClonedNode;

			prevClonedNode = clonedNode;
			originalNode = originalNode.next;
		}
		newStack.tail = clonedNode;
	}
}
