import { StackOfPlates } from './v1';

type TestOperation = {

	action: 'PUSH' | 'POP' | 'POP_AT';
	pushValue?: string;
	popAtIndex?: number;
};

const testOperations: TestOperation[] = [{
	action: 'PUSH',
	pushValue: 'a'
}, {
	action: 'PUSH',
	pushValue: 'b'
}, {
	action: 'PUSH',
	pushValue: 'c'
}, {
	action: 'PUSH',
	pushValue: 'd'
}, {
	action: 'PUSH',
	pushValue: 'e'
}, {
	action: 'PUSH',
	pushValue: 'f'
}, {
	action: 'PUSH',
	pushValue: 'g'
}, {
	action: 'PUSH',
	pushValue: 'h'
}, {
	action: 'PUSH',
	pushValue: 'i'
}, {
	action: 'PUSH',
	pushValue: 'j'
}, {
	action: 'PUSH',
	pushValue: 'k'
}, {
	action: 'PUSH',
	pushValue: 'l'
}, {
	action: 'POP_AT',
	popAtIndex: 2
}, {
	action: 'POP_AT',
	popAtIndex: 2
}, {
	action: 'POP_AT',
	popAtIndex: 2
}, {
	action: 'POP_AT',
	popAtIndex: 3
}, {
	action: 'POP_AT',
	popAtIndex: 3
}, {
	action: 'PUSH',
	pushValue: 'm'
}, {
	action: 'PUSH',
	pushValue: 'n'
}, {
	action: 'PUSH',
	pushValue: 'o'
}, {
	action: 'PUSH',
	pushValue: 'p'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'POP'
}];

console.log('\n\n**********************\n\n');
const stackOfPlates = new StackOfPlates();
for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'PUSH':

			if(!testOperation.pushValue) {

				throw Error('Push operation must have value');
			}

			operationDescription = `Push ${testOperation.pushValue}`;

			stackOfPlates.push(testOperation.pushValue);

			break;

		case 'POP':

			operationDescription = `Pop`;

			stackOfPlates.pop();

			break;

		case 'POP_AT':

			if(!testOperation.popAtIndex) {

				throw Error('Pop At operation must have index');
			}

			operationDescription = `Pop At ${testOperation.popAtIndex}`;

			stackOfPlates.popAt(testOperation.popAtIndex);

			break;

		default:

			throw Error('Unhandled test operation');
	}

	console.log(`[${operationDescription}] -> ${' '.repeat(10 - operationDescription.length)} ${stackOfPlates.toString()}`);
}
