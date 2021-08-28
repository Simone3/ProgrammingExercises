/**
 * Unit for the grid size
 */
const GRID_SIZE_UNIT = 5;

/**
 * A cell of the grid
 */
class Cell {

	public r: number;
	public c: number;

	constructor(r: number, c: number) {

		this.r = r;
		this.c = c;
	}

	public equals(other: Cell): boolean {

		return this.r === other.r && this.c === other.c;
	}

	public getKey(): string {

		return `${this.r}.${this.c}`;
	}
}

/**
 * Orientation of the ant
 */
type Orientation = 'up' | 'right' | 'down' | 'left';

/**
 * Moves the ant by updating the cell parameter
 * @param currentAntCell current ant cell
 * @param currentAntOrientation current ant orientation
 */
const moveAnt = (currentAntCell: Cell, currentAntOrientation: Orientation): void => {

	if(currentAntOrientation === 'up') {

		currentAntCell.r -= 1;
	}
	else if(currentAntOrientation === 'right') {

		currentAntCell.c += 1;
	}
	else if(currentAntOrientation === 'down') {

		currentAntCell.r += 1;
	}
	else {

		currentAntCell.c -= 1;
	}
};

/**
 * Computes the new ant orientation
 * @param currentAntOrientation current ant orientation
 * @param clockwise turn 90 degrees clockwise if true, turn 90 degrees counterclockwise if false
 * @returns new ant orientation
 */
const getNewOrientation = (currentAntOrientation: Orientation, clockwise: boolean): Orientation => {

	if(currentAntOrientation === 'up') {

		return clockwise ? 'right' : 'left';
	}
	else if(currentAntOrientation === 'right') {

		return clockwise ? 'down' : 'up';
	}
	else if(currentAntOrientation === 'down') {

		return clockwise ? 'left' : 'right';
	}
	else {

		return clockwise ? 'up' : 'down';
	}
};

/**
 * Builds the final grid
 * @param currentAntCell current ant cell
 * @param currentAntOrientation current ant orientation
 * @param firstGridIndex starting index of the grid
 * @param lastGridIndex final index of the grid
 * @param blackCellsMap map for black cells
 * @returns the grid as a string
 */
const buildGrid = (currentAntCell: Cell, currentAntOrientation: Orientation, firstGridIndex: number, lastGridIndex: number, blackCellsMap: {[key: string]: boolean}): string => {

	let grid = '';

	const loopCell: Cell = new Cell(0, 0);

	for(loopCell.r = firstGridIndex; loopCell.r <= lastGridIndex; loopCell.r++) {

		// Border line between rows
		for(loopCell.c = firstGridIndex; loopCell.c <= lastGridIndex; loopCell.c++) {

			grid += '----';
		}
		grid += '-\n';

		for(loopCell.c = firstGridIndex; loopCell.c <= lastGridIndex; loopCell.c++) {

			if(loopCell.equals(currentAntCell)) {

				// Current ant cell with orientation
				if(currentAntOrientation === 'up') {

					grid += '| \u2191 ';
				}
				else if(currentAntOrientation === 'right') {
			
					grid += '| \u2192 ';
				}
				else if(currentAntOrientation === 'down') {
			
					grid += '| \u2193 ';
				}
				else {
			
					grid += '| \u2190 ';
				}
			}
			else if(blackCellsMap[loopCell.getKey()]) {

				// Black cell
				grid += '| X ';
			}
			else {

				// White cell
				grid += '|   ';
			}
		}

		grid += '|\n';
	}

	// Final Border line
	for(loopCell.c = firstGridIndex; loopCell.c <= lastGridIndex; loopCell.c++) {

		grid += '----';
	}
	grid += '-\n';

	return grid;
};

/**
 * Implements Langton's Ant algorithm
 * @param moves number of moves
 * @returns the final grid
 */
export const langtonAnt = (moves: number): string => {
	
	if(moves < 0) {

		throw Error('Invalid number of moves');
	}
	
	// Use a map to keep track of black cells (board starts with all white cells)
	const blackCellsMap: {[key: string]: boolean} = {};

	// Keep track of the current grid index bounds (may grow dynamically depending on number of moves)
	let firstGridIndex = 0;
	let lastGridIndex = 2 * GRID_SIZE_UNIT - 1;

	// Keep track of current ant cell and orientation
	const currentAntCell: Cell = new Cell(GRID_SIZE_UNIT, GRID_SIZE_UNIT);
	let currentAntCellKey = currentAntCell.getKey();
	let currentAntOrientation: Orientation = 'right';

	// Perform all requested moves
	for(let move = 0; move < moves; move++) {

		const isCurrentCellBlack = blackCellsMap[currentAntCellKey];

		// Flip the color of the square
		if(isCurrentCellBlack) {

			delete blackCellsMap[currentAntCellKey];
		}
		else {

			blackCellsMap[currentAntCellKey] = true;
		}

		// Turn ant
		if(isCurrentCellBlack) {

			currentAntOrientation = getNewOrientation(currentAntOrientation, false);
		}
		else {

			currentAntOrientation = getNewOrientation(currentAntOrientation, true);
		}

		// Move ant
		moveAnt(currentAntCell, currentAntOrientation);
		currentAntCellKey = currentAntCell.getKey();

		// Fix grid indices if we reach the current limit (grid grows dynamically keeping a square form)
		if(currentAntCell.r <= firstGridIndex || currentAntCell.r >= lastGridIndex || currentAntCell.c <= firstGridIndex || currentAntCell.c >= lastGridIndex) {

			firstGridIndex -= GRID_SIZE_UNIT;
			lastGridIndex += GRID_SIZE_UNIT;
		}
	}

	// Build the final grid
	return buildGrid(currentAntCell, currentAntOrientation, firstGridIndex, lastGridIndex, blackCellsMap);
};
