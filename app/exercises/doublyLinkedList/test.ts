import { DoublyLinkedList, SimpleDoublyLinkedList, SimpleNode } from '../../data-structures/doublyLinkedList';

const tests: DoublyLinkedList<string>[] = [
	new SimpleDoublyLinkedList([]),
	new SimpleDoublyLinkedList([ 'a' ]),
	new SimpleDoublyLinkedList([ 'a', 'b' ]),
	new SimpleDoublyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f' ])
];

const additionalTest = new SimpleDoublyLinkedList();
additionalTest.head = new SimpleNode('a');
additionalTest.head.next = new SimpleNode('b');
additionalTest.head.next.prev = additionalTest.head;
additionalTest.head.next.next = new SimpleNode('c');
additionalTest.head.next.next.prev = additionalTest.head.next;
additionalTest.head.next.next.next = new SimpleNode('d');
additionalTest.head.next.next.next.prev = additionalTest.head.next.next;
additionalTest.tail = additionalTest.head.next.next.next;
tests.push(additionalTest);

for(const test of tests) {

	const toString = test.toString();
	const toStringReverse = test.toString('TAIL');
	const length = test.length();
	console.log(`${toString} ${' '.repeat(30 - toString.length)} | ${toStringReverse} ${' '.repeat(30 - toStringReverse.length)} [length: ${length}]`);
}
