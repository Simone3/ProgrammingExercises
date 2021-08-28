import { Person } from './common';

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

