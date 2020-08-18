/**
 * Simple implementation of a singly linked list node
 * @template T the payload type, defaults to string
 */
export class Node<T = string> {

	/**
	 * The node payload
	 */
	public data: T;
	
	/**
	 * The next node pointer
	 */
	public next: Node<T> | undefined;

	/**
	 * The constructor
	 * @param data the node payload
	 * @param next the optional next node pointer
	 */
	public constructor(data: T, next?: Node<T>) {

		this.data = data;
		this.next = next;
	}
}

/**
 * Simple implementation of a singly linked list
 * @template T the nodes payload type, defaults to string
 */
export class SinglyLinkedList<T = string> {

	/**
	 * The head node pointer
	 */
	public head: Node<T> | undefined;

	/**
	 * The constructor
	 * @param nodesData the optional initial nodes data as an array
	 */
	public constructor(nodesData?: T[]) {

		if(nodesData && nodesData.length > 0) {

			let node = new Node(nodesData[0]);
			this.head = node;
			for(let i = 1; i < nodesData.length; i++) {

				const newNode = new Node(nodesData[i]);
				node.next = newNode;
				node = newNode;
			}
		}
	}

	/**
	 * Computes the length of the linked list. Needs to loop the whole list each time.
	 * @returns the list length
	 */
	public length(): number {

		let length = 0;
		let currNode = this.head;
		while(currNode) {

			length += 1;
			currNode = currNode.next;
		}
		return length;
	}

	/**
	 * Prints the linked list as a string. Assumes no cycles.
	 * @returns the string representation
	 */
	public toString(): string {

		if(this.head) {

			const cycleCheckMap = new Map<Node<T>, boolean>();
			cycleCheckMap.set(this.head, true);
			let result = String(this.head.data);
			let node = this.head.next;
			while(node) {

				if(cycleCheckMap.get(node)) {

					result += ` -> [CYCLE on ${node.data}] -> ...`;
					break;
				}

				cycleCheckMap.set(node, true);

				result += ` -> ${node.data}`;
				node = node.next;
			}

			return result;
		}
		else {

			return '-';
		}
	}

	/**
	 * Sorts the linked list with a mergesort algorithm
	 */
	public sort(): void {

		// Loop all sublist lengths: all powers of 2 starting from 1
		for(let sublistsLength = 1; ; sublistsLength *= 2) {

			let firstSublistHead = this.head;
			let mergesCount = 0;
			let prevMergedSublistLastNode: Node<T> | undefined;

			// Loop all sublists (= while we have a head for the first sublist)
			while(firstSublistHead) {

				let mergedSublistCurrNode: Node<T> | undefined;

				// Find the head of the second sublist, i.e. the node at "sublistsLength" distance from the first sublist's head (it is be undefined if we are at the end of the main list and there's no second sublist)
				let secondSublistHead: Node<T> | undefined = firstSublistHead;
				for(let i = 0; secondSublistHead && i < sublistsLength; i++) {
	
					secondSublistHead = secondSublistHead.next;
				}

				// Loop both sublists (at most) "sublistsLength" times each (two different counters for sort stability)
				let firstSublistCurrNode: Node<T> | undefined = firstSublistHead;
				let secondSublistCurrNode: Node<T> | undefined = secondSublistHead;
				for(let i = 0, j = 0; i < sublistsLength || j < sublistsLength;) {

					let mergedSublistNextNode;

					if(i < sublistsLength && firstSublistCurrNode && (!secondSublistCurrNode || j >= sublistsLength || firstSublistCurrNode.data <= secondSublistCurrNode.data)) {

						// Pick the element of the first sublist for the merged sublist and go to the next element for the first sublist only
						mergedSublistNextNode = firstSublistCurrNode;
						i += 1;
						firstSublistCurrNode = firstSublistCurrNode.next;
					}
					else if(j < sublistsLength && secondSublistCurrNode) {

						// Pick the element of the second sublist for the merged sublist and go to the next element for the second sublist only
						mergedSublistNextNode = secondSublistCurrNode;
						j += 1;
						secondSublistCurrNode = secondSublistCurrNode.next;
					}
					else {

						break;
					}

					if(mergedSublistCurrNode) {

						// If we already have at least one element in the merged sublist, simply set the picked node as the next one
						mergedSublistNextNode.next = undefined;
						mergedSublistCurrNode.next = mergedSublistNextNode;
						mergedSublistCurrNode = mergedSublistNextNode;
					}
					else {

						// If the merged sublist is empty, initialize it with the picked element and...
						mergedSublistNextNode.next = undefined;
						mergedSublistCurrNode = mergedSublistNextNode;

						// ...join the previous merged sublist with this one or set the head of this merged sublist as the main list head
						if(prevMergedSublistLastNode) {

							prevMergedSublistLastNode.next = mergedSublistCurrNode;
						}
						else {

							this.head = mergedSublistCurrNode;
						}
					}
				}

				// Save last node of the current merged sublist to join it with the next merged sublist
				prevMergedSublistLastNode = mergedSublistCurrNode;

				// Move to the next pair of sublists, setting the head of the first sublist as the node next to the last element of the current second sublist
				firstSublistHead = secondSublistCurrNode;

				// Count the number of merges
				mergesCount += 1;
			}

			// If we merged 0 or 2 pairs of sublists in the last iteration, we have built the final list
			if(mergesCount <= 1) {

				break;
			}
		}
	}
}
