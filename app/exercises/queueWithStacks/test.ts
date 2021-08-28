import { QueueWithStacksV2 } from './v2';

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
	action: 'ADD',
	addValue: 'e'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'ADD',
	addValue: 'f'
}, {
	action: 'ADD',
	addValue: 'g'
}, {
	action: 'ADD',
	addValue: 'h'
}, {
	action: 'ADD',
	addValue: 'i'
}, {
	action: 'ADD',
	addValue: 'j'
}, {
	action: 'ADD',
	addValue: 'k'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'ADD',
	addValue: 'l'
}, {
	action: 'ADD',
	addValue: 'm'
}, {
	action: 'ADD',
	addValue: 'n'
}, {
	action: 'ADD',
	addValue: 'o'
}, {
	action: 'ADD',
	addValue: 'p'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}];

console.log('\n\n**********************\n\n');
const queueWithStacks = new QueueWithStacksV2();
for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'ADD':

			if(!testOperation.addValue) {

				throw Error('Add operation must have value');
			}

			operationDescription = `Add ${testOperation.addValue}`;

			queueWithStacks.add(testOperation.addValue);

			break;

		case 'REMOVE':

			operationDescription = `Remove`;

			queueWithStacks.remove();

			break;

		default:

			throw Error('Unhandled test operation');
	}

	console.log(`[${operationDescription}] -> ${' '.repeat(10 - operationDescription.length)} ${queueWithStacks.toString()}`);
}
