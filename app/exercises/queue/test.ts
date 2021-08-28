import { Queue, SimpleQueue } from '../../data-structures/queue';

type TestOperation = {

	action: 'ADD' | 'REMOVE';
	addValue?: string;
};

const testOperations: TestOperation[] = [{
	action: 'ADD',
	addValue: 'a'
}, {
	action: 'ADD',
	addValue: 'b'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'ADD',
	addValue: 'c'
}, {
	action: 'ADD',
	addValue: 'd'
}, {
	action: 'REMOVE'
}, {
	action: 'ADD',
	addValue: 'e'
}, {
	action: 'ADD',
	addValue: 'f'
}, {
	action: 'ADD',
	addValue: 'g'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}];

const queue: Queue<string> = new SimpleQueue();
for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'ADD':

			if(!testOperation.addValue) {

				throw Error('Add operation must have value');
			}

			operationDescription = `Add ${testOperation.addValue}`;

			queue.add(testOperation.addValue);

			break;

		case 'REMOVE':

			operationDescription = `Remove`;

			queue.remove();

			break;

		default:

			throw Error('Unhandled test operation');
	}

	const toString = queue.toString();
	const isEmpty = queue.isEmpty();
	const peek = isEmpty ? '-' : queue.peek();
	console.log(`[${operationDescription}] -> ${' '.repeat(10 - operationDescription.length)} ${toString} ${' '.repeat(20 - toString.length)} [empty? ${isEmpty} - peek: ${peek}]`);
}

