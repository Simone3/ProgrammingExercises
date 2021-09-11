import { Node, SimpleNode, SimpleSinglyLinkedList, SinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { Multiple, newMultiple } from './common';

/**
 * Generator that builds the sequence of multiples with the same sum of exponents (a + b + c)
 */
class SameExponentSumGenerator {

	/**
	 * The generator sum of exponents (a + b + c)
	 */
	public readonly exponentSum: number;

	/**
	 * The generator uses mainly this linked list to keep track of the possible candidates for current multiple
	 * Each node has its unique "a" value and is updated each time with the current "b" and "c" values
	 * The list is sorted by node value
	 */
	private readonly options: SinglyLinkedList<Multiple>;

	/**
	 * Keeps track of the smallest "a" in the current options list
	 */
	private smallestAInOptions: number;

	/**
	 * The current smallest multiple
	 */
	private current: Multiple | undefined;

	constructor(exponentSum: number) {

		if(exponentSum < 0) {

			throw Error('Exponent sum must be non-negative');
		}

		this.exponentSum = exponentSum;
		this.options = new SimpleSinglyLinkedList();
		this.options.head = new SimpleNode(newMultiple(exponentSum, 0, 0));
		this.smallestAInOptions = exponentSum;
		this.updateCurrent();
	}

	/**
	 * Get ths current multiple, without changing anything internally
	 * @returns current multiple
	 */
	public peekCurrent(): Multiple | undefined {

		return this.current;
	}

	/**
	 * Get ths current multiple, updating the reference for next calls
	 * @returns current multiple
	 */
	public getCurrent(): Multiple | undefined {

		const current = this.current;
		this.updateCurrent();
		return current;
	}

	/**
	 * Updates the current multiple reference
	 */
	private updateCurrent(): void {

		// Smallest node is always the head
		const smallestNode = this.options.head;

		// No head means that this generator has completed all possible values
		if(!smallestNode) {

			this.current = undefined;
			return;
		}
		
		const smallestMultiple = smallestNode.data;

		// Remove the head from the list
		this.options.head = smallestNode.next;
		smallestNode.next = undefined;

		// If the current node can be incremented (a is fixed, therefore this can be done until b can be decremented), update it and readd it to the list
		if(smallestMultiple.b !== 0) {

			smallestNode.data = newMultiple(smallestMultiple.a, smallestMultiple.b - 1, smallestMultiple.c + 1);
			this.addNodeToSortedOptions(smallestNode);
		}

		// If the current node is the one with the smallest "a", add the next node with "a" - 1 because from this moment on "a" - 1 could be a valid candidate
		if(smallestMultiple.a > 0 && smallestMultiple.a === this.smallestAInOptions) {

			this.smallestAInOptions -= 1;
			const newNode = new SimpleNode(newMultiple(this.smallestAInOptions, this.exponentSum - this.smallestAInOptions, 0));
			this.addNodeToSortedOptions(newNode);
		}

		// Current is the smallest
		this.current = smallestMultiple;
	}

	/**
	 * Adds a node to the sorted list
	 * @param newNode the node to add
	 */
	private addNodeToSortedOptions(newNode: Node<Multiple>): void {

		const head = this.options.head;
		const newValue = newNode.data.value;

		if(head === undefined || newValue < head.data.value) {

			// New node is the new head
			this.options.head = newNode;
			newNode.next = head;
		}
		else {

			// Place the new node in the correct place
			let previous = head;
			let node = previous.next;
			while(node) {

				if(newValue < node.data.value) {

					previous.next = newNode;
					newNode.next = node;
					return;
				}
				
				previous = node;
				node = node.next;
			}

			previous.next = newNode;
		}
	}
}

/**
 * Generator that builds the sequence of multiples
 */
class MultipleGenerator {

	/**
	 * The generator uses mainly this linked list to keep track of the possible candidates for current multiple
	 * Each node is a generator with a unique sum of exponents
	 * The list is sorted by node value
	 */
	private readonly options: SinglyLinkedList<SameExponentSumGenerator>;

	/**
	 * Keeps track of the greatest sum of exponents in the current options list
	 */
	private greatestExponentSumInOptions: number;

	public constructor() {

		this.options = new SimpleSinglyLinkedList();
		this.options.head = new SimpleNode(new SameExponentSumGenerator(0));
		this.greatestExponentSumInOptions = 0;
	}

	/**
	 * Generates the next multiple
	 * @returns the multiple
	 */
	public generate(): Multiple {

		// Smallest node is always the head
		const smallestNode = this.options.head;
		if(!smallestNode) {

			throw Error('I should always have a smallest node...!');
		}
		
		// Call the sub-generator to get its best value
		const smallestMultiple = smallestNode.data.getCurrent();
		if(!smallestMultiple) {

			throw Error('I should always have a current...!');
		}
		
		// Remove the head from the list
		this.options.head = smallestNode.next;
		smallestNode.next = undefined;

		// If the current node can be incremented (sub-generator still has values), readd it to the list
		if(smallestNode.data.peekCurrent() !== undefined) {

			this.addNodeToSortedOptions(smallestNode);
		}

		// If the current node is the one with the greatest sum of exponents, add the next node with sum + 1 because from this moment on sum + 1 could be a valid candidate
		if(smallestMultiple.exponentSum === this.greatestExponentSumInOptions) {

			this.greatestExponentSumInOptions += 1;
			const newNode = new SimpleNode(new SameExponentSumGenerator(this.greatestExponentSumInOptions));
			this.addNodeToSortedOptions(newNode);
		}

		return smallestMultiple;
	}
	
	/**
	 * Adds a node to the sorted list
	 * @param newNode the node to add
	 */
	private addNodeToSortedOptions(newNode: Node<SameExponentSumGenerator>): void {

		const head = this.options.head;
		const headValue = head?.data.peekCurrent()?.value;

		const newNodeMultiple = newNode.data.peekCurrent();
		if(newNodeMultiple === undefined) {

			throw Error('A new node should always have a current value...!');
		}

		const newValue = newNodeMultiple.value;
		
		if(head === undefined || headValue === undefined || newValue < headValue) {

			this.options.head = newNode;
			newNode.next = head;
		}
		else {

			let previous = head;
			let node = previous.next;
			while(node) {

				const value = node.data.peekCurrent()?.value;
				if(value !== undefined && newValue < value) {

					previous.next = newNode;
					newNode.next = node;
					return;
				}
				
				previous = node;
				node = node.next;
			}
			
			previous.next = newNode;
		}
	}
}

let generator = new MultipleGenerator();
let lastK = 0;

/**
 * Finds the k-th number such that the only prime factors are 3, 5, and 7.
 * Note that 3, 5, and 7 do not have to be factors, but it should not have any other prime factors.
 * For example, the first several multiples would be (in order) 1, 3, 5, 7, 9, 15, 21.
 * T = O(k * f1) for a generic k, O(f1) if called after computing k-1
 * S = O(f2)
 * where
 * - f1 is a factor that increases when k increases (number of active "generators" in the lists that need to be looped to maintain options order) but f1 <<< k (e.g. k = 100000 -> f1 = 50 (28 in outer generator and 22 in inner generator))
 * - f2 is a factor that increases when k increases (number of active "generators" in the lists) but f2 << k (e.g. k = 100000 -> f2 = 806 (50 options in the outer generator with an average of 16 options each in the inner generators))
 * @param k the requested k
 * @returns the k-th multiple
 */
export const kthMultipleV2 = (k: number): Multiple => {

	if(k <= 0) {

		throw Error('k must start at 1');
	}

	// If the requested k is before the last k, reset everything (if needed, this could probably be handled better by backtracking/caching the generator)
	if(k <= lastK) {

		generator = new MultipleGenerator();
	}

	// Generate numbers until we get to k
	let kthMultiple;
	for(let i = lastK; i < k; i++) {

		kthMultiple = generator.generate();
	}
	if(kthMultiple === undefined) {

		throw Error('I should always have a k-th multiple...!');
	}

	lastK = k;

	return kthMultiple;
};

