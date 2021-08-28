import { SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { kthToLast } from './v1';

const tests: SimpleSinglyLinkedList[] = [
	new SimpleSinglyLinkedList([]),
	new SimpleSinglyLinkedList([ 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'e' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f' ])
];

const indexes: number[] = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	9999
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	for(const index of indexes) {

		const node = kthToLast(test, index);
		console.log(`'${test}' @ ${index} =====> '${node ? node.data : '-'}'`);
	}
}
