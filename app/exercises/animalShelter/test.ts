import { Animal, AnimalShelter, AnimalType } from './v1';

type TestOperation = {

	action: 'ADD' | 'REMOVE_ANY' | 'REMOVE_SPECIFIC';
	addValue?: Animal;
	removeSpecificType?: AnimalType;
};

const testOperations: TestOperation[] = [{
	action: 'ADD',
	addValue: new Animal('CAT', 'a')
}, {
	action: 'ADD',
	addValue: new Animal('CAT', 'b')
}, {
	action: 'ADD',
	addValue: new Animal('CAT', 'c')
}, {
	action: 'ADD',
	addValue: new Animal('DOG', '1')
}, {
	action: 'ADD',
	addValue: new Animal('DOG', '2')
}, {
	action: 'ADD',
	addValue: new Animal('CAT', 'd')
}, {
	action: 'REMOVE_SPECIFIC',
	removeSpecificType: 'DOG'
}, {
	action: 'REMOVE_ANY'
}, {
	action: 'REMOVE_SPECIFIC',
	removeSpecificType: 'DOG'
}, {
	action: 'ADD',
	addValue: new Animal('DOG', '3')
}, {
	action: 'REMOVE_ANY'
}, {
	action: 'REMOVE_ANY'
}, {
	action: 'REMOVE_ANY'
}, {
	action: 'REMOVE_ANY'
}];

console.log('\n\n**********************\n\n');
const animalShelter = new AnimalShelter();
for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'ADD':

			if(!testOperation.addValue) {

				throw Error('Add operation must have value');
			}

			operationDescription = `Enqueue ${testOperation.addValue.type} ${testOperation.addValue.name}`;

			animalShelter.enqueue(testOperation.addValue);

			break;

		case 'REMOVE_ANY':

			operationDescription = `DequequeAny`;

			animalShelter.dequeueAny();

			break;

		case 'REMOVE_SPECIFIC':

			if(!testOperation.removeSpecificType) {

				throw Error('Remove Specific operation must have value');
			}

			operationDescription = `DequeueAnimal ${testOperation.removeSpecificType}`;

			animalShelter.dequeueAnimal(testOperation.removeSpecificType);

			break;

		default:

			throw Error('Unhandled test operation');
	}

	console.log(`[${operationDescription}] -> ${' '.repeat(20 - operationDescription.length)} ${animalShelter.toString()}`);
}
