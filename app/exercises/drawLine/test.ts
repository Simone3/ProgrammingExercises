import { drawLine } from './v1';

const tests = [
	{ x1: 2, x2: 6, y: 2 },
	{ x1: 0, x2: 3, y: 2 },
	{ x1: 5, x2: 7, y: 2 },
	{ x1: 5, x2: 5, y: 2 },
	{ x1: 5, x2: 7, y: 0 },
	{ x1: 5, x2: 7, y: 4 },
	{ x1: 17, x2: 18, y: 2 },
	{ x1: 6, x2: 10, y: 2 },
	{ x1: 17, x2: 21, y: 2 },
	{ x1: 16, x2: 21, y: 2 },
	{ x1: 18, x2: 23, y: 2 },
	{ x1: 22, x2: 26, y: 2 },
	{ x1: 0, x2: 7, y: 2 },
	{ x1: 8, x2: 15, y: 2 },
	{ x1: 3, x2: 25, y: 2 },
	{ x1: 9, x2: 25, y: 2 },
	{ x1: 0, x2: 31, y: 2 },
	{ x1: 3, x2: 25, y: 0 },
	{ x1: 3, x2: 25, y: 4 }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const widthBytes = 4;
	const heightBits = 5;
	const screen = new Uint8Array(widthBytes * heightBits);
	drawLine(screen, widthBytes, test.x1, test.x2, test.y);
	let printScreen = '';
	let currentRow = '';
	for(let i = 0; i < screen.length; i++) {

		if(i !== 0 && i % widthBytes === 0) {

			printScreen = `${currentRow}\n${printScreen}`;
			currentRow = '';
		}
		
		currentRow = `${currentRow}${screen[i].toString(2).padStart(8, '0')}`;
	}
	printScreen = `${currentRow}\n${printScreen}`;

	console.log(`\n\n(${test.x1}, ${test.y}) -> (${test.x2}, ${test.y}):\n${printScreen}`);
}
