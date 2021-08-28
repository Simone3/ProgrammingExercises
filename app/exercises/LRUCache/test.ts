import { LRUCache } from './v1';

console.log('\n\n**********************\n\n');

type TestOperation = {

	action: 'GET' | 'PUT';
	key: number;
	putValue?: string;
};

const testOperations: TestOperation[] = [{
	action: 'GET',
	key: 1
}, {
	action: 'PUT',
	key: 1,
	putValue: 'a'
}, {
	action: 'GET',
	key: 1
}, {
	action: 'PUT',
	key: 2,
	putValue: 'b'
}, {
	action: 'PUT',
	key: 3,
	putValue: 'c'
}, {
	action: 'GET',
	key: 3
}, {
	action: 'GET',
	key: 1
}, {
	action: 'GET',
	key: 3
}, {
	action: 'GET',
	key: 99
}, {
	action: 'PUT',
	key: 2,
	putValue: 'bb'
}, {
	action: 'PUT',
	key: 3,
	putValue: 'cc'
}, {
	action: 'PUT',
	key: 2,
	putValue: 'bbb'
}, {
	action: 'PUT',
	key: 4,
	putValue: 'd'
}, {
	action: 'PUT',
	key: 5,
	putValue: 'e'
}, {
	action: 'PUT',
	key: 6,
	putValue: 'f'
}, {
	action: 'GET',
	key: 1
}, {
	action: 'PUT',
	key: 7,
	putValue: 'g'
}, {
	action: 'GET',
	key: 2
}, {
	action: 'PUT',
	key: 8,
	putValue: 'h'
}, {
	action: 'PUT',
	key: 5,
	putValue: 'ee'
}];

const cache = new LRUCache(5);

for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'GET':

			operationDescription = `Get ${testOperation.key}: ${cache.get(testOperation.key)}`;
			break;

		case 'PUT':

			if(!testOperation.putValue) {

				throw Error('Put operation must have value');
			}

			operationDescription = `Put ${testOperation.key} ${testOperation.putValue}`;
			cache.put(testOperation.key, testOperation.putValue);
			break;

		default:

			throw Error('Unhandled test operation');
	}

	console.log(`[${operationDescription}] -> ${' '.repeat(20 - operationDescription.length)} ${cache.toString()}`);
}

