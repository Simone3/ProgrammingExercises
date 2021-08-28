import { randomInteger } from '../../helpers/utils';
import { MAX_BIRTH_YEAR, MIN_BIRTH_YEAR, Person } from './common';
import { getYearWithMostPeopleAliveV1 } from './v1';
import { getYearWithMostPeopleAliveV2 } from './v2';

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
