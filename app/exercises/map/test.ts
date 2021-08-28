import { ArrayHashMap, Map } from '../../data-structures/map';

type TestOperation = {

	action: 'GET' | 'PUT' | 'REMOVE';
	key: string;
	value?: string;
};

const testOperations: TestOperation[] = [{
	action: 'GET',
	key: 'a'
}, {
	action: 'PUT',
	key: 'a',
	value: 'this is a value!'
}, {
	action: 'GET',
	key: 'a'
}, {
	action: 'REMOVE',
	key: 'a'
}, {
	action: 'GET',
	key: 'a'
}, {
	action: 'PUT',
	key: 'aaaaaaaaaa',
	value: 'value1'
}, {
	action: 'PUT',
	key: 'bbbbbbbb',
	value: 'value2'
}, {
	action: 'PUT',
	key: 'aaaa',
	value: 'value3'
}, {
	action: 'PUT',
	key: 'FgG',
	value: 'value4'
}, {
	action: 'PUT',
	key: 'bbbbbbbb',
	value: 'value5'
}, {
	action: 'PUT',
	key: 'WH7',
	value: 'value6'
}, {
	action: 'GET',
	key: 'bbbbbbbb'
}, {
	action: 'GET',
	key: 'aaaaaaaaaa'
}, {
	action: 'GET',
	key: 'FgG'
}, {
	action: 'GET',
	key: 'WH7'
}, {
	action: 'REMOVE',
	key: 'aaaa'
}, {
	action: 'REMOVE',
	key: 'abcdefg'
}, {
	action: 'REMOVE',
	key: 'bbbbbbbb'
}, {
	action: 'REMOVE',
	key: 'aaaaaaaaaa'
}, {
	action: 'REMOVE',
	key: 'FgG'
}, {
	action: 'REMOVE',
	key: 'WH7'
}];

const map: Map<string, string> = new ArrayHashMap();
for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'GET': {

			const value = map.get(testOperation.key);
			operationDescription = `Get ${testOperation.key} -> ${value}`;
			break;
		}

		case 'PUT': {

			if(!testOperation.value) {

				throw Error('Put operation must have value');
			}

			operationDescription = `Put ${testOperation.key} -> ${testOperation.value}`;

			map.put(testOperation.key, testOperation.value);

			break;
		}

		case 'REMOVE': {

			operationDescription = `Remove ${testOperation.key}`;

			map.remove(testOperation.key);

			break;
		}

		default:

			throw Error('Unhandled test operation');
	}

	console.log(`\n#### ${operationDescription}`);
	console.log(map.toString());
}

