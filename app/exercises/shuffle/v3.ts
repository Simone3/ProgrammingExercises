import { Node, SimpleNode, SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { randomInteger } from '../../helpers/utils';

// Version with indices linked list + support array
export const shuffleV3 = (array: string[]): void => {
	
	const length = array.length;
	let maxIndex = length - 1;

	// Build a linked list of all indices
	const indices = new SimpleSinglyLinkedList<number>();
	let newIndexNode = new SimpleNode(0);
	indices.head = newIndexNode;
	for(let i = 1; i < length; i++) {

		newIndexNode.next = new SimpleNode(i);
		newIndexNode = newIndexNode.next;
	}
	
	const shuffled: string[] = [];

	for(let i = 0; i < length; i++) {

		// Get a random destination index j for element i (remove its element from the indices linked list)
		let randomIndicesIndex = randomInteger(0, maxIndex);
		let currentIndexNode: Node<number>;
		if(randomIndicesIndex === 0) {

			currentIndexNode = indices.head!;
			indices.head = currentIndexNode.next;
		}
		else {

			let prevIndexNode: Node<number> = indices.head!;
			currentIndexNode = prevIndexNode.next!;
			while(randomIndicesIndex > 1) {

				randomIndicesIndex -= 1;
				prevIndexNode = currentIndexNode;
				currentIndexNode = currentIndexNode.next!;
			}
			prevIndexNode.next = currentIndexNode.next;
		}
		const j = currentIndexNode.data;
		maxIndex -= 1;
		
		shuffled[j] = array[i];
	}

	// Update the original array with the shuffled copy
	for(let i = 0; i < length; i++) {

		array[i] = shuffled[i];
	}
};
