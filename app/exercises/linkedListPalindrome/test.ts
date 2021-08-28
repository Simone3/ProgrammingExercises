import { SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { isLinkedListPalindrome } from './v1';

const tests: SimpleSinglyLinkedList[] = [

	new SimpleSinglyLinkedList([]),
	new SimpleSinglyLinkedList([ 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'c', 'b', 'a' ]),

	new SimpleSinglyLinkedList([ 'a', 'b' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'c', 'b', 'b' ]),
	new SimpleSinglyLinkedList([ 'b', 'b', 'c', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'c', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'c', 'a', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'd', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'd', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'c', 'b', 'b' ]),
	new SimpleSinglyLinkedList([ 'b', 'b', 'c', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'c', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'c', 'a', 'a' ])
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`'${test}' =====> '${isLinkedListPalindrome(test)}'`);
}
