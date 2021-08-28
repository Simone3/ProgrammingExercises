import { randomIntegerArray } from '../../helpers/utils';
import { bubbleSort } from '../../sort/bubbleSort';
import { mergeSort } from '../../sort/mergeSort';
import { quickSort } from '../../sort/quickSort';
import { radixSort } from '../../sort/radixSort';
import { selectionSort } from '../../sort/selectionSort';

const algorithms = [
	{ name: 'Bubble Sort', function: bubbleSort },
	{ name: 'Selection Sort', function: selectionSort },
	{ name: 'Merge Sort', function: mergeSort },
	{ name: 'Quick Sort', function: quickSort },
	{ name: 'Radix Sort', function: radixSort }
];

const tests = [
	[],
	[ 3 ],
	[ 3, 6 ],
	[ 6, 3 ],
	[ 6, 1, 3 ],
	[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
	[ 9, 8, 7, 6, 5, 4, 3, 2, 1 ],
	[ 5, 9, 4, 1, 8, 7, 3, 6, 2 ],
	[ 5, 1, 2, 1, 2, 7, 3, 1, 2 ],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	[ 109, 8, 207, 306, 305, 14, 10003, -2, -111, -1, -57 ],
	[ -18, -23, -12, 11, -21, -18, 25, -19, -1, -24, 21, -2, -7, -16, 9, -4, -17, 13, 0, 23 ],
	randomIntegerArray(20, -25, 25)
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`[${test.join(', ')}]`);

	for(const algorithm of algorithms) {

		const arrayCopy = [ ...test ];
		algorithm.function(arrayCopy);
		console.log(`* ${algorithm.name.padEnd(15, ' ')} --> [${arrayCopy.join(', ')}]`);
	}

	console.log('\n');
}
