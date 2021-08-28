import { MIN_BIRTH_YEAR, Person } from './common';

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
