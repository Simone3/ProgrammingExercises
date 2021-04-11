import { randomInteger } from './helpers/utils';

type Person = { birth: number, death: number };

const MIN_BIRTH_YEAR = 1900;
const MAX_BIRTH_YEAR = 2000;

/**
 * Given a list of people with their birth and death years, it computes the year with the most number of people alive.
 * If a person was alive during any portion of that year, they should be included in that year's count.
 * For example, Person (birth = 1908, death = 1909) is included in the counts for both 1908 and 1909.
 * T = O(N * A) where N = number of people, A = average age
 * S = O(Y), where Y = number of total birth/death years (constant, assuming [MIN_BIRTH_YEAR, MAX_BIRTH_YEAR] and age <= 110)
 * @param people the list of people
 * @returns the year with the most number of people alive
 */
export const getYearWithMostPeopleAliveV1 = (people: Person[]): number | undefined => {

	const years: number[] = [];

	let maxYear;
	let maxYearCount = 0;
	for(const person of people) {

		for(let year = person.birth; year <= person.death; year++) {

			const yearsIndex = year - MIN_BIRTH_YEAR;
			let yearCount = years[yearsIndex];
			yearCount = yearCount ? yearCount + 1 : 1;
			years[yearsIndex] = yearCount;

			if(yearCount > maxYearCount) {

				maxYear = year;
				maxYearCount = yearCount;
			}
		}
	}

	return maxYear;
};

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

const tests: Person[] = [];
for(let i = 0; i < 100; i++) {

	const birth = randomInteger(MIN_BIRTH_YEAR, MAX_BIRTH_YEAR);
	const death = birth + randomInteger(0, 110);
	tests.push({ birth, death });
}

console.log('\n\n**********************\n\n');
for(const test of tests) {
	
	console.log(test);
}
console.log('-------->');
console.log(getYearWithMostPeopleAliveV1(tests));
console.log(getYearWithMostPeopleAliveV2(tests));
