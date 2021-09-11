import { permutations } from '../../helpers/utils';
import { majorityElementV1 } from './v1';
import { majorityElementV2 } from './v2';

const tests = [
	[],
	[ 1 ],
	[ 1, 2 ],
	[ 1, 1 ],
	[ 1, 1, 2 ],
	[ 1, 2, 1 ],
	[ 2, 1, 1 ],
	[ 1, 1, 2, 2 ],
	[ 1, 1, 1, 2 ],
	[ 1, 1, 1, 1, 1, 2, 2, 2, 2, 2 ],
	[ 1, 1, 1, 1, 1, 1, 2, 2, 2, 2 ],
	[ 1, 1, 1, 1, 2, 2, 2, 2, 2, 2 ],
	[ 1, 1, 2, 2, 2, 2, 2, 2, 1, 1 ],
	[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
	[ 1, 2, 5, 9, 5, 9, 5, 5, 5 ],
	[ 1, 1, 1, 1, 1, 1, 6, 7, 8, 9, 10 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const testString = test.join(', ');

	const resultV1 = majorityElementV1([ ...test ]);
	const resultV2 = majorityElementV2([ ...test ]);

	console.log(`${testString} -> V1 = ${resultV1}, V2 = ${resultV2}`);

	if(resultV1 !== resultV2) {

		throw Error(`Results for ${testString} are different!`);
	}
}

console.log('\n\nStarting massive tests...\n\n');
for(const base of tests) {

	for(const test of permutations(base)) {

		const testString = test.join(', ');

		const resultV1 = majorityElementV1([ ...test ]);
		const resultV2 = majorityElementV2([ ...test ]);
		
		if(resultV1 !== resultV2) {
	
			throw Error(`Results for ${testString} are different!`);
		}
	}
}
console.log('\n\nMassive tests completed\n\n');
