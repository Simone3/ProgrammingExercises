import { ReSpaceResult } from './common';
import { ReSpaceV1 } from './v1';
import { ReSpaceV2 } from './v2';

const dictionary = [
	'looked',
	'look',
	'just',
	'just',
	'like',
	'her',
	'his',
	'brother',
	'this',
	'is',
	'where',
	'the',
	'recognized',
	'words',
	'word',
	'start',
	'he'
];

const tests = [
	'jesslookedjustliketimherbrother',
	'jessloozedjustliketimherbrother',
	'jesslookedjustliketimherbrothez',
	'brother',
	'thisiswheretherecognizedwordsstart',
	'xmkoaskulmxceaslnasthisiswheretherecognizedwordsstart',
	'siss',
	'hesiss',
	'isssiss',
	'ssssssssssissssssssssissssssssssss',
	'ssssssssssisssssssssssissssssssssss',
	'sssssssssswordsssssssssswordsssssssssss',
	'sssssssssssssssssssssssssssssssss'
];

const printResult = (label: string, result: ReSpaceResult): string => {

	return `\n\n${label})\nText = ${result.text}\nUnrecognized chars: ${result.unrecognizedCharactersCount}\nUnrecognized words: ${result.unrecognizedWords.join(', ')}\n\n`;
};

const verifyResult = (result1: ReSpaceResult, result2: ReSpaceResult): void => {

	if(result1.text !== result2.text) {

		throw Error('Results have different text!');
	}
	
	if(result1.unrecognizedCharactersCount !== result2.unrecognizedCharactersCount) {

		throw Error('Results have different unrecognized characters count!');
	}
	
	if(result1.unrecognizedWords.sort().toString() !== result2.unrecognizedWords.sort().toString()) {

		throw Error('Results have different unrecognized words!');
	}
};

console.log('\n\n**********************\n\n');
const reSpaceV1 = new ReSpaceV1(dictionary);
const reSpaceV2 = new ReSpaceV2(dictionary);
for(const test of tests) {

	const resultV1 = reSpaceV1.process(test);
	const resultV2 = reSpaceV2.process(test);

	console.log(`#############\n\n${test}\n\n--->${printResult('V1', resultV1)}${printResult('V2', resultV2)}`);

	verifyResult(resultV1, resultV2);
}
