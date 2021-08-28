import { Person } from './common';

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
