import { NameFrequency, SynonymPair } from './common';
import { babyNamesV1 } from './v1';
import { babyNamesV2 } from './v2';

const tests: { nameFrequencies: NameFrequency[], synonyms: SynonymPair[] }[] = [
	{
		nameFrequencies: [],
		synonyms: []
	},
	{
		nameFrequencies: [{ name: 'A', count: 733 }, { name: 'B', count: 410 }, { name: 'C', count: 593 }, { name: 'D', count: 201 }, { name: 'E', count: 499 }, { name: 'F', count: 935 }, { name: 'G', count: 159 }, { name: 'H', count: 234 }, { name: 'I', count: 930 }, { name: 'J', count: 215 }, { name: 'K', count: 150 }, { name: 'L', count: 685 }, { name: 'M', count: 726 }, { name: 'N', count: 257 }, { name: 'O', count: 718 }, { name: 'P', count: 674 }, { name: 'Q', count: 403 }, { name: 'R', count: 976 }, { name: 'S', count: 511 }, { name: 'T', count: 488 }, { name: 'U', count: 816 }, { name: 'V', count: 820 }, { name: 'W', count: 974 }, { name: 'X', count: 364 }, { name: 'Y', count: 756 }, { name: 'Z', count: 392 }],
		synonyms: []
	},
	{
		nameFrequencies: [{ name: 'A', count: 733 }, { name: 'B', count: 410 }, { name: 'C', count: 593 }, { name: 'D', count: 201 }, { name: 'E', count: 499 }, { name: 'F', count: 935 }, { name: 'G', count: 159 }, { name: 'H', count: 234 }, { name: 'I', count: 930 }, { name: 'J', count: 215 }, { name: 'K', count: 150 }, { name: 'L', count: 685 }, { name: 'M', count: 726 }, { name: 'N', count: 257 }, { name: 'O', count: 718 }, { name: 'P', count: 674 }, { name: 'Q', count: 403 }, { name: 'R', count: 976 }, { name: 'S', count: 511 }, { name: 'T', count: 488 }, { name: 'U', count: 816 }, { name: 'V', count: 820 }, { name: 'W', count: 974 }, { name: 'X', count: 364 }, { name: 'Y', count: 756 }, { name: 'Z', count: 392 }],
		synonyms: [{ left: 'A', right: 'B' }, { left: 'N', right: 'G' }]
	},
	{
		nameFrequencies: [{ name: 'A', count: 733 }, { name: 'B', count: 410 }, { name: 'C', count: 593 }, { name: 'D', count: 201 }, { name: 'E', count: 499 }, { name: 'F', count: 935 }, { name: 'G', count: 159 }, { name: 'H', count: 234 }, { name: 'I', count: 930 }, { name: 'J', count: 215 }, { name: 'K', count: 150 }, { name: 'L', count: 685 }, { name: 'M', count: 726 }, { name: 'N', count: 257 }, { name: 'O', count: 718 }, { name: 'P', count: 674 }, { name: 'Q', count: 403 }, { name: 'R', count: 976 }, { name: 'S', count: 511 }, { name: 'T', count: 488 }, { name: 'U', count: 816 }, { name: 'V', count: 820 }, { name: 'W', count: 974 }, { name: 'X', count: 364 }, { name: 'Y', count: 756 }, { name: 'Z', count: 392 }],
		synonyms: [{ left: 'A', right: 'B' }, { left: 'N', right: 'G' }, { left: 'Z', right: 'W' }, { left: 'W', right: 'A' }, { left: 'G', right: 'Z' }, { left: 'H', right: 'J' }, { left: 'J', right: 'H' }, { left: 'Q', right: 'R' }, { left: 'S', right: 'R' }]
	},
	{
		nameFrequencies: [{ name: 'A', count: 733 }, { name: 'B', count: 410 }, { name: 'C', count: 593 }, { name: 'D', count: 201 }, { name: 'E', count: 499 }, { name: 'F', count: 935 }, { name: 'G', count: 159 }, { name: 'H', count: 234 }, { name: 'I', count: 930 }, { name: 'J', count: 215 }, { name: 'K', count: 150 }, { name: 'L', count: 685 }, { name: 'M', count: 726 }, { name: 'N', count: 257 }, { name: 'O', count: 718 }, { name: 'P', count: 674 }, { name: 'Q', count: 403 }, { name: 'R', count: 976 }, { name: 'S', count: 511 }, { name: 'T', count: 488 }, { name: 'U', count: 816 }, { name: 'V', count: 820 }, { name: 'W', count: 974 }, { name: 'X', count: 364 }, { name: 'Y', count: 756 }, { name: 'Z', count: 392 }],
		synonyms: [{ left: 'A', right: 'B' }, { left: 'N', right: 'G' }, { left: 'Z', right: 'W' }, { left: 'W', right: 'A' }, { left: 'G', right: 'Z' }, { left: 'H', right: 'J' }, { left: 'J', right: 'H' }, { left: 'Q', right: 'R' }, { left: 'S', right: 'R' }, { left: 'J', right: 'N' }, { left: 'J', right: 'N' }, { left: 'J', right: 'N' }, { left: 'F', right: 'B' }, { left: 'F', right: 'G' }, { left: 'E', right: 'C' }, { left: 'D', right: 'E' }, { left: 'C', right: 'Z' }, { left: 'I', right: 'L' }, { left: 'M', right: 'L' }, { left: 'K', right: 'L' }, { left: 'K', right: 'J' }, { left: 'O', right: 'V' }, { left: 'P', right: 'U' }, { left: 'T', right: 'Q' }, { left: 'O', right: 'P' }, { left: 'Q', right: 'P' }, { left: 'V', right: 'W' }, { left: 'W', right: 'U' }, { left: 'X', right: 'H' }, { left: 'R', right: 'Y' }]
	}
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const nameFrequenciesString = test.nameFrequencies.map((nameFrequency) => {
		return `${nameFrequency.name}:${nameFrequency.count}`;
	}).join(', ');

	const synonymsString = test.synonyms.map((synonym) => {
		return `${synonym.left}-${synonym.right}`;
	}).join(', ');

	const resultV1 = babyNamesV1(test.nameFrequencies, test.synonyms);
	const resultStringV1 = resultV1.map((nameFrequency) => {
		return `${nameFrequency.name}:${nameFrequency.count}`;
	}).join(', ');

	const resultV2 = babyNamesV2(test.nameFrequencies, test.synonyms);
	const resultStringV2 = resultV2.map((nameFrequency) => {
		return `${nameFrequency.name}:${nameFrequency.count}`;
	}).join(', ');
	
	console.log(`\n\n---\n\nInput Names: ${nameFrequenciesString}\nInput Synonyms: ${synonymsString}\nOutput Names (V1): ${resultStringV1}\nOutput Names (V2): ${resultStringV2}`);
}

