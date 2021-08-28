import { hasUniqueCharacters, hasUniqueCharactersWithoutOtherCollections } from './v1';

console.log('\n\n**********************\n\n');
const tests: string[] = [
	'',
	'a',
	'ab',
	'aba',
	'bbbb',
	'abcdefgb',
	' @(!)| ',
	' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
];

console.log('hasUniqueCharacters:');
for(const test of tests) {

	console.log(`${test} -> ${hasUniqueCharacters(test)}`);
}

console.log();
console.log('hasUniqueCharactersWithoutOtherCollections:');
for(const test of tests) {

	console.log(`${test} -> ${hasUniqueCharactersWithoutOtherCollections(test)}`);
}
