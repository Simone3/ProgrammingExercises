import { Node, SinglyLinkedList } from './helpers/singlyLinkedList';

/**
 * Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop.
 * T = O(N)
 * S = O(N)
 * @param list the first input list
 * @returns the node at the beginning of the loop if it exists, or undefined if the list is not circular
 */
export const detectLinkedListCycle = (list: SinglyLinkedList): Node | undefined => {

	const map = new Map<Node, boolean>();
	let currNode = list.head;
	while(currNode) {

		if(map.get(currNode)) {

			return currNode;
		}

		map.set(currNode, true);

		currNode = currNode.next;
	}

	return undefined;
};

const test1 = new SinglyLinkedList();
test1.head = new Node('a');
test1.head.next = new Node('b');
test1.head.next.next = new Node('c');
test1.head.next.next.next = test1.head.next;

const test2 = new SinglyLinkedList();
test2.head = new Node('a');
test2.head.next = new Node('b');
test2.head.next.next = new Node('c');
test2.head.next.next.next = test2.head;

const test3 = new SinglyLinkedList();
test3.head = new Node('a');
test3.head.next = new Node('b');
test3.head.next.next = new Node('c');
test3.head.next.next.next = test3.head.next.next;

const test4 = new SinglyLinkedList();
test4.head = new Node('a');
test4.head.next = test4.head;

const tests: SinglyLinkedList[] = [
	test1,
	test2,
	test3,
	test4,
	new SinglyLinkedList([]),
	new SinglyLinkedList([ 'a' ]),
	new SinglyLinkedList([ 'a', 'b', 'c', 'd' ]),
	new SinglyLinkedList([ 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd' ])
];

for(const test of tests) {

	const loopNode = detectLinkedListCycle(test);
	console.log(`'${test}' =====> ${loopNode ? loopNode.data : '-'}`);
}
