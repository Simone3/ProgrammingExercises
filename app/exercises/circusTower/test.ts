import { randomInteger } from '../../helpers/utils';
import { Person } from './common';
import { circusTowerV1 } from './v1';
import { circusTowerV2 } from './v2';

const p = (name: string, height: number, weight: number): Person => {
	return { name, height, weight };
};

const tests: Person[][] = [
	[],
	[ p('A', 10, 10) ],
	[ p('A', 10, 10), p('B', 20, 20) ],
	[ p('A', 10, 10), p('B', 20, 20), p('C', 30, 30) ],
	[ p('A', 40, 40), p('B', 30, 30), p('C', 20, 20), p('D', 10, 10) ],
	[ p('C', 5, 100), p('D', 6, 99), p('B', 7, 98), p('F', 8, 97), p('E', 1, 1) ],
	[ p('C', 30, 30), p('D', 40, 40), p('B', 20, 20), p('F', 60, 60), p('E', 50, 50), p('A', 10, 10) ],
	[ p('C', 15, 20), p('D', 35, 18), p('B', 20, 15), p('F', 18, 35), p('E', 30, 30), p('A', 10, 10) ],
	[ p('C', 1, 100), p('D', 2, 99), p('B', 5, 96), p('F', 4, 97), p('E', 3, 98), p('A', 6, 95) ],
	[ p('H', 50, 50), p('C', 15, 20), p('G', 40, 40), p('D', 35, 18), p('K', 80, 80), p('B', 20, 15), p('J', 70, 70), p('F', 18, 35), p('E', 30, 30), p('I', 60, 60), p('A', 10, 10) ],
	[ p('A', 1, 1), p('B', 2, 2), p('C', 3, 3), p('D', 4, 4), p('E', 5, 5), p('F', 6, 6), p('G', 7, 7), p('H', 8, 8), p('I', 9, 9), p('J', 10, 10), p('K', 11, 11), p('L', 12, 12), p('M', 13, 13) ],
	[ p('A', 89, 81), p('B', 83, 55), p('C', 71, 75), p('D', 61, 74), p('E', 61, 62), p('F', 78, 59), p('G', 63, 86), p('I', 83, 71) ],
	[ p('A', 58, 69), p('B', 69, 96), p('C', 58, 59), p('D', 68, 68), p('E', 78, 67), p('F', 50, 52), p('G', 80, 93), p('H', 97, 73), p('I', 76, 68), p('J', 78, 61), p('K', 94, 70), p('L', 58, 76), p('M', 68, 58), p('N', 90, 90), p('O', 100, 69), p('P', 58, 98), p('Q', 87, 92), p('R', 75, 78), p('S', 91, 58), p('T', 71, 68), p('U', 81, 70), p('V', 85, 82), p('W', 96, 79), p('X', 64, 91), p('Y', 94, 99), p('Z', 65, 75) ],
	[ p('A', 89, 81), p('B', 83, 55), p('C', 71, 75), p('D', 61, 74), p('E', 61, 62), p('F', 78, 59), p('G', 63, 86), p('I', 83, 71), p('J', 76, 64), p('K', 83, 82), p('L', 69, 67), p('M', 81, 56), p('N', 73, 69), p('O', 67, 57), p('R', 73, 90), p('S', 74, 51), p('T', 91, 68), p('U', 81, 78), p('V', 96, 71), p('W', 71, 55), p('X', 84, 68), p('Y', 77, 57), p('Z', 60, 50) ]
];
tests.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((name) => {
	return { name, height: randomInteger(50, 100), weight: randomInteger(50, 100) };
}));

const verifyAndStringifyTower = (tower: Person[]): string => {

	if(tower.length === 0) {

		return '/';
	}
	
	const peopleMap: {[key: string]: boolean} = {};
	peopleMap[tower[0].name] = true;
	for(let i = 1; i < tower.length; i++) {

		const previousPerson = tower[i - 1];
		const currentPerson = tower[i];

		if(peopleMap[currentPerson.name]) {

			throw Error(`Person appears twice in the tower: ${JSON.stringify(currentPerson)}`);
		}
		peopleMap[currentPerson.name] = true;

		if(previousPerson.height >= currentPerson.height || previousPerson.weight >= currentPerson.weight) {

			throw Error(`Wrong tower relation: ${JSON.stringify(previousPerson)} vs. ${JSON.stringify(currentPerson)}`);
		}
	}

	return tower.map((person) => {
		return person.name;
	}).join(' -> ');
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const peopleString = test.map((person) => {
		return `${person.name}(${person.height},${person.weight})`;
	}).join(', ');

	const towerV1 = circusTowerV1([ ...test ]);
	const towerStringV1 = verifyAndStringifyTower(towerV1);

	const towerV2 = circusTowerV2([ ...test ]);
	const towerStringV2 = verifyAndStringifyTower(towerV2);

	console.log('');
	console.log(`People: ${peopleString}`);
	console.log(`Tower V1: ${towerStringV1}`);
	console.log(`Tower V2: ${towerStringV2}`);
	if(towerV1.length !== towerV2.length) {
		console.log(`!!!!! DIFFERENT LENGTHS !!!!!`);
	}
}
