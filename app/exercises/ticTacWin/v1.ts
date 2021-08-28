/**
 * Player symbol on the board
 */
export type Player = 'X' | 'O';

/**
 * All board cell symbols
 */
export type Cell = Player | ' ';

/**
 * Helper object with counters
 */
export type CellCounter = {
	topRight: number;
	right: number;
	bottomRight: number;
	bottom: number;
};

/**
 * Computes the top-right counter of the current cell, decreasing the counter of the bottom-left cell if the symbols match
 * @param board the board
 * @param winRequirement the required streak to win
 * @param counters helper counters for each board cell
 * @param cell the current cell
 * @param row the current cell row
 * @param col the current cell column
 * @returns the counter
 */
const getTopRightCounter = (board: Cell[][], winRequirement: number, counters: CellCounter[][], cell: Player, row: number, col: number): number => {

	if(row < board.length - 1 && col > 0) {

		const bottomLeftRow = row + 1;
		const bottomLeftCol = col - 1;

		if(cell === board[bottomLeftRow][bottomLeftCol]) {

			return counters[bottomLeftRow][bottomLeftCol].topRight - 1;
		}
	}

	return winRequirement - 1;
};

/**
 * Computes the right counter of the current cell, decreasing the counter of the left cell if the symbols match
 * @param board the board
 * @param winRequirement the required streak to win
 * @param counters helper counters for each board cell
 * @param cell the current cell
 * @param row the current cell row
 * @param col the current cell column
 * @returns the counter
 */
const getRightCounter = (board: Cell[][], winRequirement: number, counters: CellCounter[][], cell: Player, row: number, col: number): number => {

	if(col > 0) {

		const leftRow = row;
		const leftCol = col - 1;

		if(cell === board[leftRow][leftCol]) {

			return counters[leftRow][leftCol].right - 1;
		}
	}

	return winRequirement - 1;
};

/**
 * Computes the bottom-right counter of the current cell, decreasing the counter of the top-left cell if the symbols match
 * @param board the board
 * @param winRequirement the required streak to win
 * @param counters helper counters for each board cell
 * @param cell the current cell
 * @param row the current cell row
 * @param col the current cell column
 * @returns the counter
 */
const getBottomRightCounter = (board: Cell[][], winRequirement: number, counters: CellCounter[][], cell: Player, row: number, col: number): number => {

	if(row > 0 && col > 0) {

		const topLeftRow = row - 1;
		const topLeftCol = col - 1;

		if(cell === board[topLeftRow][topLeftCol]) {

			return counters[topLeftRow][topLeftCol].bottomRight - 1;
		}
	}

	return winRequirement - 1;
};

/**
 * Computes the bottom counter of the current cell, decreasing the counter of the top cell if the symbols match
 * @param board the board
 * @param winRequirement the required streak to win
 * @param counters helper counters for each board cell
 * @param cell the current cell
 * @param row the current cell row
 * @param col the current cell column
 * @returns the counter
 */
const getBottomCounter = (board: Cell[][], winRequirement: number, counters: CellCounter[][], cell: Player, row: number, col: number): number => {

	if(row > 0) {

		const topRow = row - 1;
		const topCol = col;

		if(cell === board[topRow][topCol]) {

			return counters[topRow][topCol].bottom - 1;
		}
	}

	return winRequirement - 1;
};

/**
 * Given a board, determines if one of the players won or not
 * T = O(N^2)
 * S = O(N^2)
 * @param board the board
 * @param winRequirement the required streak to win
 * @returns the winning symbol or undefined if tie
 */
export const getTicTacToeWinner = (board: Cell[][], winRequirement: number): Player | undefined => {

	const boardSize = board.length;

	if(boardSize < 3 || winRequirement < 3 || boardSize < winRequirement) {

		throw Error('Invalid parameters');
	}

	// Loop all board cells (by column, so that the helper counters of previous cells are always available)
	const counters: CellCounter[][] = [];
	for(let col = 0; col < boardSize; col++) {

		for(let row = 0; row < boardSize; row++) {

			const cell = board[row][col];
			let cellCounter: CellCounter;

			if(cell === 'X' || cell === 'O') {
		
				// Compute the current cell counters decreasing the corresponding counters of the adjacent cells
				cellCounter = {
					topRight: getTopRightCounter(board, winRequirement, counters, cell, row, col),
					right: getRightCounter(board, winRequirement, counters, cell, row, col),
					bottomRight: getBottomRightCounter(board, winRequirement, counters, cell, row, col),
					bottom: getBottomCounter(board, winRequirement, counters, cell, row, col)
				};

				// If one of the counters reached 0 it means that a winning strak just ended in this cell: the current player wins
				if(cellCounter.topRight === 0 || cellCounter.right === 0 || cellCounter.bottomRight === 0 || cellCounter.bottom === 0) {
		
					return cell;
				}
			}
			else {

				// "Fake" counter for empy cells
				cellCounter = {
					topRight: winRequirement,
					right: winRequirement,
					bottomRight: winRequirement,
					bottom: winRequirement
				};
			}
		
			if(!counters[row]) {

				counters[row] = [];
			}
			counters[row][col] = cellCounter;
		}
	}

	// No counter ever reached 0: tie
	return undefined;
};
