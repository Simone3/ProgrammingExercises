import { PriorityHeap, SimplePriorityHeap } from '../../data-structures/heap';

type TestOperation = {

	action: 'POLL' | 'INSERT';
	addValue?: number;
};

const testOperations: TestOperation[] = [{
	action: 'INSERT',
	addValue: 3
}, {
	action: 'INSERT',
	addValue: 5
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'INSERT',
	addValue: 9
}, {
	action: 'INSERT',
	addValue: 7
}, {
	action: 'INSERT',
	addValue: 11
}, {
	action: 'POLL'
}, {
	action: 'INSERT',
	addValue: 3
}, {
	action: 'INSERT',
	addValue: 13
}, {
	action: 'INSERT',
	addValue: 12
}, {
	action: 'POLL'
}, {
	action: 'INSERT',
	addValue: 12
}, {
	action: 'INSERT',
	addValue: 12
}, {
	action: 'INSERT',
	addValue: 12
}, {
	action: 'POLL'
}, {
	action: 'INSERT',
	addValue: 34
}, {
	action: 'INSERT',
	addValue: 1
}, {
	action: 'INSERT',
	addValue: 2
}, {
	action: 'INSERT',
	addValue: 100
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}, {
	action: 'POLL'
}];

const heap: PriorityHeap<number> = new SimplePriorityHeap((a, b) => {
	return a - b;
});

console.log('\n\n**********************\n\n');

for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'INSERT': {

			if(!testOperation.addValue) {

				throw Error('Insert operation must have value');
			}

			operationDescription = `Insert ${testOperation.addValue}`;

			heap.insert(testOperation.addValue);

			break;
		}

		case 'POLL': {

			const value = heap.poll();

			operationDescription = `Remove ${value}`;

			break;
		}

		default: {

			throw Error('Unhandled test operation');
		}
	}

	const toString = heap.toString();
	const isEmpty = heap.isEmpty();
	const peek = isEmpty ? '-' : heap.peek();
	console.log(`[${operationDescription}] -> ${' '.repeat(10 - operationDescription.length)} ${toString} ${' '.repeat(130 - toString.length)} [empty? ${isEmpty} - peek: ${peek}]`);
}

