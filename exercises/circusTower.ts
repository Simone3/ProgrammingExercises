import { randomInteger } from './helpers/utils';

type Person = {
	name: string;
	height: number;
	weight: number;
}

/**
 * Recursive helper for V1
 * @param people the people
 * @param previousPerson the last person added to the tower
 * @param currentTower the current tower
 * @param peopleInTower if peopleInTower[i] is true, the corresponding person[i] was already placed in the tower
 * @returns the largest tower so far
 */
const circusTowerV1Helper = (people: Person[], previousPerson: Person, currentTower: Person[], peopleInTower: boolean[]): Person[] => {

	let bestTower = [ ...currentTower ];

	// Brutefoce the solution trying all remaining people that can fit below the previous person
	for(let i = 0; i < people.length; i++) {

		if(!peopleInTower[i]) {

			const person = people[i];
			if(person.height > previousPerson.height && person.weight > previousPerson.weight) {

				peopleInTower[i] = true;
				currentTower.push(person);

				const recursionTower = circusTowerV1Helper(people, person, currentTower, peopleInTower);
				if(recursionTower.length > bestTower.length) {

					bestTower = [ ...recursionTower ];
				}

				peopleInTower[i] = false;
				currentTower.pop();
			}
		}
	}

	return bestTower;
};

/**
 * A circus is designing a tower routine consisting of people standing atop one another's shoulders.
 * For practical and aesthetic reasons, each person must be both shorter and lighter than the person below him or her.
 * Given the heights and weights of each person in the circus, write a method to compute the largest possible tower.
 * T = O(N!)
 * S = O(N)
 * @param people the people
 * @returns the largest tower
 */
export const circusTowerV1 = (people: Person[]): Person[] => {

	return circusTowerV1Helper(people, { name: 'FAKE', height: -Infinity, weight: -Infinity }, [], []);
};

type BestTowerData = {

	height: number;
	personIndex: number;
	nextPersonIndex: number | undefined;
}

/**
 * A circus is designing a tower routine consisting of people standing atop one another's shoulders.
 * For practical and aesthetic reasons, each person must be both shorter and lighter than the person below him or her.
 * Given the heights and weights of each person in the circus, write a method to compute the largest possible tower.
 * T = O(N^2)
 * S = O(N)
 * @param people the people
 * @returns the largest tower
 */
export const circusTowerV2 = (people: Person[]): Person[] => {

	if(people.length === 0) {

		return [];
	}

	// Sort people primarily by height and, if height is equal, by weight
	people.sort((a, b) => {

		if(a.height < b.height) {
			return -1;
		}

		if(a.height > b.height) {
			return 1;
		}

		if(a.weight < b.weight) {
			return -1;
		}

		if(a.weight > b.weight) {
			return 1;
		}

		return 0;
	});

	let bestTower: BestTowerData = {
		height: 1,
		personIndex: people.length - 1,
		nextPersonIndex: undefined
	};

	const bestTowersByTop: BestTowerData[] = [];
	bestTowersByTop[people.length - 1] = bestTower;

	// Loop all people from the end of the array to get the best tower with (i) on top
	for(let i = people.length - 2; i >= 0; i--) {

		let bestTowerWithIOnTop: BestTowerData = {
			height: 1,
			personIndex: i,
			nextPersonIndex: undefined
		};

		// Loop all people after i: since the array is sorted, I know for sure that these are all the possible candidates to be below (i)
		for(let j = i + 1; j < people.length; j++) {

			// Check compatibility between (i) and (j) since it's not guaranteed
			if(people[i].height < people[j].height && people[i].weight < people[j].weight) {

				if(bestTowersByTop[j].height + 1 > bestTowerWithIOnTop.height) {

					// Best tower with (i) on top is best tower with (j) on top plus 1
					bestTowerWithIOnTop = {
						height: bestTowersByTop[j].height + 1,
						personIndex: i,
						nextPersonIndex: j
					};
				}
			}
		}

		// Save the best tower with (i) on top in the array for later and, if it's the best tower ever so far, save that too
		bestTowersByTop[i] = bestTowerWithIOnTop;
		if(bestTowerWithIOnTop.height > bestTower.height) {

			bestTower = bestTowerWithIOnTop;
		}
	}

	// Build the actual best tower
	const bestTowerArray = [];
	let currentTowerData: BestTowerData | undefined = bestTower;
	while(currentTowerData) {

		bestTowerArray.push(people[currentTowerData.personIndex]);
		currentTowerData = currentTowerData.nextPersonIndex === undefined ? undefined : bestTowersByTop[currentTowerData.nextPersonIndex];
	}
	return bestTowerArray;
};

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

