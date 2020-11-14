import { DoublyLinkedList, Node, SimpleDoublyLinkedList, SimpleNode } from './data-structures/doublyLinkedList';
import { randomInteger } from './helpers/utils';

/**
 * A box
 */
class Box {

	public readonly width: number;
	public readonly height: number;
	public readonly depth: number;

	/**
	 * Constructor
	 * @param width width
	 * @param height height
	 * @param depth depth
	 */
	public constructor(width: number, height: number, depth: number) {

		if(width <= 0 || height <= 0 || depth <= 0) {

			throw Error('Invalid box');
		}

		this.width = width;
		this.height = height;
		this.depth = depth;
	}

	/**
	 * Checks if this box can be stacked on top of the given box
	 * @param bottomBox the box to check
	 * @returns true if this box can be stacked on top of the given box
	 */
	public canBeStackedAbove(bottomBox: Box): boolean {

		return this.width < bottomBox.width && this.height < bottomBox.height && this.depth < bottomBox.depth;
	}

	/**
	 * Returns the box as a string
	 * @returns the string representation
	 */
	public toString(): string {

		return `{${this.width}, ${this.height}, ${this.depth}}`;
	}
}

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

/**
 * V2 of the solution (recursive check on array)
 */
export class StackOfBoxesSolverV2 {

	private readonly boxes: Box[] = [];

	/**
	 * Adds a box to the solution
	 * @param box the box
	 */
	public addBox(box: Box): void {

		// Add it to the array sorted by width (could be any of the 3 dimensions): this way we know that it's impossible for [i] to be above [j] in the solution for each i < j
		for(let i = 0; i < this.boxes.length; i++) {

			if(box.width > this.boxes[i].width) {

				this.boxes.splice(i, 0, box);
				return;
			}
		}
		this.boxes.push(box);
	}

	/**
	 * Returns the tallest possible stack of boxes
	 * @returns the tallest possible stack
	 */
	public getTallestPossibleStack(): Box[] {

		if(this.boxes.length <= 1) {

			return [ ...this.boxes ];
		}
		else {

			const heightsCache: Box[][] = [];
			return this.getTallestPossibleStackHelper(0, undefined, heightsCache);
		}
	}

	/**
	 * Returns the list of current boxes as a string
	 * @returns the string representation
	 */
	public toString(): string {

		return `[ ${this.boxes.join(', ')} ]`;
	}

	/**
	 * Recursive helper for getTallestPossibleStack()
	 * @param i current stack
	 * @param previousBase the previous base to check for compatibility
	 * @param solutionsCache memoization helper for solutions (index i is the best solution for the stack with i as the base)
	 * @returns the (current) tallest possible stack
	 */
	private getTallestPossibleStackHelper(i: number, previousBase: Box | undefined, solutionsCache: Box[][]): Box[] {
		
		const thisBox = this.boxes[i];

		if(previousBase && !thisBox.canBeStackedAbove(previousBase)) {

			return [];
		}
		
		if(i === this.boxes.length - 1) {

			return [ this.boxes[i] ];
		}

		if(solutionsCache[i] !== undefined) {

			return solutionsCache[i];
		}

		let bestSolutionAboveThisBox: Box[] = [];
		for(let j = i + 1; j < this.boxes.length; j++) {

			const solutionAboveThisBox = this.getTallestPossibleStackHelper(j, thisBox, solutionsCache);
			if(!bestSolutionAboveThisBox || bestSolutionAboveThisBox.length < solutionAboveThisBox.length) {

				bestSolutionAboveThisBox = solutionAboveThisBox;
			}
		}

		const solutionWithThisBox = [ this.boxes[i] ].concat(bestSolutionAboveThisBox);
		solutionsCache[i] = solutionWithThisBox;

		const nextSolutionWithoutThisBox = this.getTallestPossibleStackHelper(i + 1, previousBase, solutionsCache);

		return solutionWithThisBox.length > nextSolutionWithoutThisBox.length ? solutionWithThisBox : nextSolutionWithoutThisBox;
	}
}

const tests: Box[][] = [
	[
		new Box(10, 10, 10),
		new Box(3, 3, 3),
		new Box(4, 4, 4),
		new Box(1, 1, 1),
		new Box(11, 11, 11)
	],
	[
		new Box(10, 10, 10),
		new Box(3, 3, 3),
		new Box(4, 4, 4),
		new Box(4, 3, 4),
		new Box(2, 50, 5),
		new Box(1, 1, 1),
		new Box(11, 11, 11)
	],
	[
		new Box(3, 3, 3),
		new Box(3, 3, 3),
		new Box(3, 3, 3),
		new Box(4, 1, 3),
		new Box(4, 4, 4),
		new Box(3, 3, 3),
		new Box(3, 3, 3)
	]
];
const randomTest = [];
for(let i = 0; i < 100; i++) {

	randomTest.push(new Box(randomInteger(1, 15), randomInteger(1, 15), randomInteger(1, 15)));
}
tests.push(randomTest);

console.log('\n\n**********************\n\n');
for(let i = 0; i < tests.length; i++) {

	const test = tests[i];

	console.log(`\n\n########## TEST ${i}`);

	const solver = new StackOfBoxesSolverV2();
	
	for(const box of test) {

		solver.addBox(box);
		console.log(`\n----- ADD BOX ${box.toString()}:\n${solver.toString()}\nSOLUTION: ${solver.getTallestPossibleStack().toString()}`);
	}
}
