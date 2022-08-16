import { DoublyLinkedList, SimpleDoublyLinkedList, SimpleNode } from '../../data-structures/doublyLinkedList';

const tests: DoublyLinkedList<string>[] = [
	new SimpleDoublyLinkedList([]),
	new SimpleDoublyLinkedList([ 'a' ]),
	new SimpleDoublyLinkedList([ 'a', 'b' ]),
	new SimpleDoublyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f' ])
];

const manualTest = new SimpleDoublyLinkedList();
manualTest.head = new SimpleNode('a');
manualTest.head.next = new SimpleNode('b');
manualTest.head.next.prev = manualTest.head;
manualTest.head.next.next = new SimpleNode('c');
manualTest.head.next.next.prev = manualTest.head.next;
manualTest.head.next.next.next = new SimpleNode('d');
manualTest.head.next.next.next.prev = manualTest.head.next.next;
manualTest.tail = manualTest.head.next.next.next;
tests.push(manualTest);

const helperMethodsTest = new SimpleDoublyLinkedList();
helperMethodsTest.addToHead('a');
helperMethodsTest.removeHead();
helperMethodsTest.addToHead('a');
helperMethodsTest.removeTail();
helperMethodsTest.addToHead('a');
helperMethodsTest.addToHead('b');
helperMethodsTest.addToTail('c');
helperMethodsTest.addToTail('d');
helperMethodsTest.removeTail();
helperMethodsTest.removeHead();
tests.push(helperMethodsTest);

for(const test of tests) {

	const toString = test.toString();
	const toStringReverse = test.toString('TAIL');
	const length = test.length();
	console.log(`${toString} ${' '.repeat(30 - toString.length)} | ${toStringReverse} ${' '.repeat(30 - toStringReverse.length)} [length: ${length}]`);
}
