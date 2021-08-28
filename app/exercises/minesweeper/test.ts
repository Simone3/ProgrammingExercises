import promptSync from 'prompt-sync';
import { Minesweeper } from './v1';

const prompt = promptSync({
	sigint: true
});

let minesweeper;
while(!minesweeper) {

	const width = prompt('Width? ');
	const height = prompt('Height? ');
	const bombsNumber = prompt('Bombs number? ');

	try {
		
		minesweeper = new Minesweeper(Number(width), Number(height), Number(bombsNumber));
	}
	catch(error) {

		console.log(error);
	}
}

while(!minesweeper.isGameOver) {

	console.log(minesweeper.toString());

	const x = prompt('x? ');
	const y = prompt('y? ');

	try {
		
		const result = minesweeper.click(Number(x), Number(y));
		console.log(result);
	}
	catch(error) {

		console.log(error);
	}
}

console.log(minesweeper.toString());
