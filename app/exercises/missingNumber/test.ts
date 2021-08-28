import { randomInteger } from '../../helpers/utils';
import { SpecialInt } from './common';
import { missingNumberV1 } from './v1';
import { missingNumberV2 } from './v2';

const shuffleTest = (array: number[]): void => {
	
	for(let i = 0; i < array.length; i++) {

		const k = randomInteger(0, i);
		const temp = array[k];
		array[k] = array[i];
		array[i] = temp;
	}
};

console.log('\n\n**********************\n\n');
for(let n = 1; n <= 20; n++) {

	const allNumbers = [];
	for(let i = 0; i <= n; i++) {

		allNumbers[i] = i;
	}

	for(let i = 0; i <= n; i++) {

		const test = [ ...allNumbers ];

		const missing = test.splice(i, 1)[0];

		shuffleTest(test);

		const resultV1 = missingNumberV1(test.map((v) => {
			return new SpecialInt(v);
		}));

		const resultV2 = missingNumberV2(test.map((v) => {
			return new SpecialInt(v);
		}));

		console.log(`n = ${n} ----> {${test}} -----> V1 = ${resultV1}, V2 = ${resultV2} ${resultV1 === missing && resultV2 === missing ? '' : '!!!!!!!!'}`);
	}
}
