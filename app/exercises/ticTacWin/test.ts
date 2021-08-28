import { Cell, getTicTacToeWinner } from './v1';

const tests: { winRequirement: number, board: Cell[][]}[] = [
	{
		winRequirement: 3,
		board: [
			[ 'X', 'X', 'X' ],
			[ 'X', 'O', 'O' ],
			[ 'O', 'X', 'O' ]
		]
	},
	{
		winRequirement: 3,
		board: [
			[ 'X', 'O', 'X' ],
			[ 'X', 'X', 'O' ],
			[ 'X', 'O', 'O' ]
		]
	},
	{
		winRequirement: 3,
		board: [
			[ 'X', 'O', 'X' ],
			[ 'O', 'X', 'O' ],
			[ 'O', 'O', 'X' ]
		]
	},
	{
		winRequirement: 3,
		board: [
			[ 'X', 'O', 'X' ],
			[ 'O', 'O', 'X' ],
			[ 'O', 'X', 'O' ]
		]
	},
	{
		winRequirement: 3,
		board: [
			[ 'O', 'O', 'X' ],
			[ ' ', 'X', ' ' ],
			[ 'X', ' ', ' ' ]
		]
	},
	{
		winRequirement: 3,
		board: [
			[ ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', 'O', 'O', 'X', ' ' ],
			[ ' ', ' ', 'X', 'O', ' ' ],
			[ ' ', 'X', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ' ]
		]
	},
	{
		winRequirement: 3,
		board: [
			[ ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', 'X', 'O', 'O', ' ' ],
			[ ' ', ' ', 'O', 'O', ' ' ],
			[ ' ', 'X', 'O', 'X', 'X' ],
			[ ' ', ' ', ' ', ' ', ' ' ]
		]
	},
	{
		winRequirement: 5,
		board: [
			[ ' ', ' ', ' ', ' ', 'O' ],
			[ ' ', 'O', 'O', 'X', 'O' ],
			[ ' ', ' ', 'X', 'O', 'O' ],
			[ ' ', 'X', ' ', 'X', 'O' ],
			[ 'X', ' ', ' ', 'X', 'O' ]
		]
	}
];

const boardToString = (board: Cell[][]): string => {

	const boardSize = board.length;

	let result = '';

	// Add top border of table
	for(let col = 0; col < boardSize; col++) {

		result += '----';
	}
	result += '-';

	// Loop all rows
	for(let row = 0; row < boardSize; row++) {

		result += `\n|`;

		// Loop all columns
		for(let col = 0; col < boardSize; col++) {
		
			const cell = board[row][col];
			result += ` ${cell} |`;
		}

		// Add bottom border of the current row
		result += '\n';
		for(let x = 0; x < boardSize; x++) {

			result += '----';
		}
		result += '-';
	}

	result += '\n';

	return result;
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${boardToString(test.board)}\nWinner with ${test.winRequirement} consecutive symbols: ${getTicTacToeWinner(test.board, test.winRequirement)}`);
	console.log('\n\n---------\n\n');
}
