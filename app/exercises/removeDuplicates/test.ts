import { SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { removeDuplicates } from './v1';

const tests: SimpleSinglyLinkedList[] = [
	new SimpleSinglyLinkedList([]),
	new SimpleSinglyLinkedList([ 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'a', 'd', 'e', 'f' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'c', 'd', 'e', 'f' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'b', 'a', 'e', 'b' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'a', 'd', 'a', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'f', 'f' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'f', 'f', 'f', 'f' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'a', 'a', 'a', 'a' ])
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const original = test.toString();
	removeDuplicates(test);
	const modified = test.toString();
	console.log(`'${original}' =====> '${modified}'`);
}
