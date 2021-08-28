import { SimpleStack, Stack } from '../../data-structures/stack';

type TestOperation = {

	action: 'PUSH' | 'POP';
	addValue?: string;
};

const testOperations: TestOperation[] = [{
	action: 'PUSH',
	addValue: 'a'
}, {
	action: 'PUSH',
	addValue: 'b'
}, {
	action: 'POP'
}, {
	action: 'POP'
}, {
	action: 'PUSH',
	addValue: 'c'
}, {
	action: 'PUSH',
	addValue: 'd'
}, {
	action: 'POP'
}, {
	action: 'PUSH',
	addValue: 'e'
}, {
	action: 'PUSH',
	addValue: 'f'
}, {
	action: 'PUSH',
	addValue: 'g'
}, {
	action: 'POP'
}, {
	action: 'POP'
}];

const stack: Stack<string> = new SimpleStack();
for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'PUSH':

			if(!testOperation.addValue) {

				throw Error('Push operation must have value');
			}

			operationDescription = `Push ${testOperation.addValue}`;

			stack.push(testOperation.addValue);

			break;

		case 'POP':

			operationDescription = `Pop`;

			stack.pop();

			break;

		default:

			throw Error('Unhandled test operation');
	}

	const toString = stack.toString();
	const isEmpty = stack.isEmpty();
	const peek = isEmpty ? '-' : stack.peek();
	console.log(`[${operationDescription}] -> ${' '.repeat(10 - operationDescription.length)} ${toString} ${' '.repeat(20 - toString.length)} [empty? ${isEmpty} - peek: ${peek}]`);
}

