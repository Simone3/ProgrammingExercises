import { getPowerSet } from './v1';

const tests: number[][] = [
	[ ],
	[ 0 ],
	[ 0, 1 ],
	[ 0, 1, 2 ],
	[ 0, 1, 2, 3 ],
	[ 0, 1, 2, 3, 4 ],
	[ 0, 1, 2, 3, 4, 5 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const powerSet = getPowerSet(test);
	let powerSetString = '';
	for(const powerSetElement of powerSet) {

		powerSetString += `{${powerSetElement}}, `;
	}

	console.log(`{${test}} -----> {${powerSetString.substr(0, powerSetString.length - 2)}}`);
}
