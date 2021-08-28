import { BinaryTreeWithRandom } from './v1';

type TestOperation = {

	action: 'INSERT' | 'DELETE';
	insert?: { idAndValue: string, childOf?: string, childSide?: 'LEFT' | 'RIGHT'};
	deleteId?: string;
};

const testOperations: TestOperation[] = [{
	action: 'INSERT',
	insert: { idAndValue: 'a' }
}, {
	action: 'DELETE',
	deleteId: 'a'
}, {
	action: 'INSERT',
	insert: { idAndValue: 'a' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'b' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'c' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'd', childOf: 'a', childSide: 'RIGHT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'e', childOf: 'd', childSide: 'LEFT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'f', childOf: 'b', childSide: 'RIGHT' }
}, {
	action: 'DELETE',
	deleteId: 'c'
}, {
	action: 'INSERT',
	insert: { idAndValue: 'g', childOf: 'd', childSide: 'RIGHT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'h', childOf: 'g', childSide: 'RIGHT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'i', childOf: 'g', childSide: 'LEFT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'j', childOf: 'h', childSide: 'RIGHT' }
}, {
	action: 'DELETE',
	deleteId: 'g'
}, {
	action: 'INSERT',
	insert: { idAndValue: 'k', childOf: 'f', childSide: 'LEFT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'l', childOf: 'f', childSide: 'RIGHT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'm', childOf: 'k', childSide: 'LEFT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'n', childOf: 'b', childSide: 'RIGHT' }
}, {
	action: 'INSERT',
	insert: { idAndValue: 'o', childOf: 'a', childSide: 'RIGHT' }
}, {
	action: 'DELETE',
	deleteId: 'a'
}];

console.log('\n\n**********************\n\n');
const tree = new BinaryTreeWithRandom();
for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'INSERT':

			if(!testOperation.insert) {

				throw Error('Insert operation must have value');
			}

			operationDescription = `Insert ${testOperation.insert.idAndValue}`;

			tree.insert(testOperation.insert.idAndValue, testOperation.insert.idAndValue, testOperation.insert.childOf, testOperation.insert.childSide);

			break;

		case 'DELETE':

			if(!testOperation.deleteId) {

				throw Error('Delete operation must have value');
			}

			operationDescription = `Delete ${testOperation.deleteId}`;

			tree.delete(testOperation.deleteId);

			break;

		default:

			throw Error('Unhandled test operation');
	}

	console.log(`\n\n********* ${operationDescription} ********* `);
	console.log(tree.toString());
	console.log(`Random ${tree.randomNode()}`);
}
