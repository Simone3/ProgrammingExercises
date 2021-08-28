import { MIN_BIRTH_YEAR, Person } from './common';

/**
 * @override Version 2
 * T = O(N + Y) where N = number of people, Y = number of total birth/death years (constant, assuming [MIN_BIRTH_YEAR, MAX_BIRTH_YEAR] and age <= 110)
 * S = O(Y)
 */
export const getYearWithMostPeopleAliveV2 = (people: Person[]): number | undefined => {

	const births: number[] = [];
	const deaths: number[] = [];

	for(const person of people) {

		const birthIndex = person.birth - MIN_BIRTH_YEAR;
		let birthsCount = births[birthIndex];
		birthsCount = birthsCount ? birthsCount + 1 : 1;
		births[birthIndex] = birthsCount;

		const deathIndex = person.death - MIN_BIRTH_YEAR;
		let deathsCount = deaths[deathIndex];
		deathsCount = deathsCount ? deathsCount + 1 : 1;
		deaths[deathIndex] = deathsCount;
	}

	let maxYear;
	let maxYearCount = 0;
	let currentPeople = 0;
	for(let yearIndex = 0; yearIndex < deaths.length; yearIndex++) {

		const birthsThisYear = births[yearIndex];
		if(birthsThisYear) {

			currentPeople += birthsThisYear;
		}

		if(currentPeople > maxYearCount) {

			maxYear = yearIndex + MIN_BIRTH_YEAR;
			maxYearCount = currentPeople;
		}

		const deathsThisYear = deaths[yearIndex];
		if(deathsThisYear) {
			
			currentPeople -= deathsThisYear;
		}
	}

	return maxYear;
};
