import { SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { linkedListMiddle, linkedListMiddleOneLoop, stringMiddle } from './v1';

const tests = [
	'',
	'a',
	'ab',
	'abc',
	'abcd',
	'abcde',
	'abcdef',
	'abcdefg',
	'abcdefgh',
	'abcdefghi',
	'abcdefghij',
	'abcdefghijk'
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const testLinkedList = new SimpleSinglyLinkedList(test.split(''));

	const resultSM = stringMiddle(test).join(', ');
	const resultLLM = linkedListMiddle(testLinkedList).join(', ');
	const resultLLMOL = linkedListMiddleOneLoop(testLinkedList).join(', ');

	console.log(`${test} ---> SM = ${resultSM}, LLM = ${resultLLM}, LLMOL = ${resultLLMOL}`);

	if(resultSM !== resultLLM || resultLLM !== resultLLMOL) {

		throw Error('Results are different!');
	}
}
