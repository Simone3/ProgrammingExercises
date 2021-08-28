import { Node, SimpleNode, SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { randomInteger } from '../../helpers/utils';

// Version with indices linked list + element swap in original array
export const shuffleV5 = (array: string[]): void => {
	
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

	let i = 0;
	while(maxIndex > 0) {

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

		// Update i or swap i and j
		if(i === j) {

			i = indices.head!.data;
		}
		else {
			
			const temp = array[j];
			array[j] = array[i];
			array[i] = temp;
		}
	}
};
