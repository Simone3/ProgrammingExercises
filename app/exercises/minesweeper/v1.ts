import { randomInteger } from '../../helpers/utils';

/**
 * A Minesweeper grid cell
 */
export class Cell {

	public isBomb = false;
	public value = 0;
	public isVisible = false;
}

/**
 * Minesweeper game
 */
export class Minesweeper {

	private readonly width: number;
	private readonly height: number;
	private readonly bombsNumber: number;
	private readonly grid: Cell[][];

	private cellsRemaining: number;
	private gameOver = false;

	/**
	 * Constructor
	 * @param width grid width
	 * @param height grid height
	 * @param bombsNumber number of bombs in grid
	 */
	public constructor(width: number, height: number, bombsNumber: number) {

		// Base validation
		if(width <= 0 || !Number.isInteger(width)) {

			throw Error('Invalid width');
		}
		if(height <= 0 || !Number.isInteger(height)) {

			throw Error('Invalid height');
		}
		if(bombsNumber <= 0 || !Number.isInteger(bombsNumber)) {

			throw Error('Invalid bombs number');
		}
		if(width * height < bombsNumber) {

			throw Error('Too many bombs');
		}

		// Game initialization
		this.width = width;
		this.height = height;
		this.bombsNumber = bombsNumber;
		this.cellsRemaining = this.width * this.height;
		this.grid = [];
		this.initGrid();
	}

	/**
	 * Reveals one cell of the grid
	 * @param x width coordinate
	 * @param y height coordinate
	 * @returns a simple text description of the click outcome
	 */
	public click(x: number, y: number): string {

		// Base validation
		if(this.gameOver) {

			throw Error('Game over!');
		}
		if(x < 0 || !Number.isInteger(x) || x >= this.width) {

			throw Error('Invalid x');
		}
		if(y < 0 || !Number.isInteger(y) || y >= this.height) {

			throw Error('Invalid y');
		}

		// Get the grid cell
		const cell = this.grid[x][y];
		if(cell.isVisible) {

			throw Error('Cell was already clicked');
		}

		if(cell.isBomb) {

			// A bomb makes the player lose
			this.gameOver = true;
			cell.isVisible = true;
			return 'You lose!';
		}
		else {

			let result;
			if(cell.value > 0) {
			
				// A cell surronding a bomb (= a number) just reveals it
				this.cellsRemaining -= 1;
				cell.isVisible = true;
				result = 'Found number!';
			}
			else {

				// A clear cell makes the whole area visible
				this.revealClearArea(x, y);
				result = 'Found clear area!';
			}

			// Player wins if no more non-bomb cells exist
			if(this.cellsRemaining === this.bombsNumber) {

				this.gameOver = true;
				return 'You win!';
			}
			else {

				return result;
			}
		}
	}

	/**
	 * Getter
	 * @returns if the game is over (either by win or lose)
	 */
	public get isGameOver(): boolean {

		return this.gameOver;
	}

	/**
	 * Prints the game grid
	 * @returns the simple text representation of the game
	 */
	public toString(): string {

		return this.printGrid(true);
	}

	/**
	 * Helper to initialize the game grid
	 */
	private initGrid(): void {

		for(let x = 0; x < this.width; x++) {

			this.grid[x] = [];
			for(let y = 0; y < this.height; y++) {

				this.grid[x][y] = new Cell();
			}
		}

		this.initBombsInGrid();
	}

	/**
	 * Helper to randomly place all bombs in the grid
	 */
	private initBombsInGrid(): void {

		// Pick a random point until all bombs are placed (if there are lots of bombs compared with grid size (almost impossible game) this could be slow, but average case is fine)
		let bombsRemaining = this.bombsNumber;
		while(bombsRemaining > 0) {

			const x = randomInteger(0, this.width - 1);
			const y = randomInteger(0, this.height - 1);

			const cell = this.grid[x][y];

			if(!cell.isBomb) {

				cell.isBomb = true;
				cell.value = 0;

				this.increaseNumbersAroundPoint(x, y);
				
				bombsRemaining -= 1;
			}
		}
	}

	/**
	 * Helper to increase the numbers around a point (8 cells surrounding (x, y))
	 * @param x the width coordinate
	 * @param y the height coordinate
	 */
	private increaseNumbersAroundPoint(x: number, y: number): void {
		
		const xStart = x > 0 ? x - 1 : 0;
		const xEnd = x < this.width - 1 ? x + 1 : this.width - 1;

		const yStart = y > 0 ? y - 1 : 0;
		const yEnd = y < this.height - 1 ? y + 1 : this.height - 1;

		for(let i = xStart; i <= xEnd; i++) {

			for(let j = yStart; j <= yEnd; j++) {

				const cell = this.grid[i][j];
				if(!cell.isBomb) {

					cell.value += 1;
				}
			}
		}
	}

	/**
	 * Helper to make all cells in a clear area (all empty cells and their "border of numbers" surrounding (x, y)) visible
	 * @param x the width coordinate
	 * @param y the height coordinate
	 */
	private revealClearArea(x: number, y: number): void {
		
		const cell = this.grid[x][y];
		if(!cell.isVisible && !cell.isBomb) {

			this.cellsRemaining -= 1;
			cell.isVisible = true;

			if(cell.value === 0) {

				if(x > 0) {
		
					this.revealClearArea(x - 1, y);
				}
		
				if(x < this.width - 1) {
		
					this.revealClearArea(x + 1, y);
				}

				if(y > 0) {

					this.revealClearArea(x, y - 1);
				}

				if(y < this.height - 1) {

					this.revealClearArea(x, y + 1);
				}
			}
		}
	}

	/**
	 * Helper to print the game grid
	 * @param checkVisibility flag to check for visibility or not (false = show full grid in clear at any time)
	 * @returns the simple text representation of the game
	 */
	private printGrid(checkVisibility: boolean): string {

		// Add x-indexes
		let result = '\n    ';
		for(let x = 0; x < this.width; x++) {

			result += ` (${x})`;
		}

		// Add top border of table
		result += '\n    ';
		for(let x = 0; x < this.width; x++) {

			result += '----';
		}
		result += '-';

		// Loop all y-indexes
		for(let y = 0; y < this.height; y++) {

			result += `\n(${y}) |`;

			// Loop all x-indexes and print the correct characters based on cell type
			for(let x = 0; x < this.width; x++) {
			
				const cell = this.grid[x][y];

				if(checkVisibility && !cell.isVisible) {

					result += ' ? |';
				}
				else if(cell.isBomb) {

					result += ' * |';
				}
				else if(cell.value === 0) {

					result += '   |';
				}
				else {

					result += ` ${cell.value} |`;
				}
			}

			// Add bottom border of the current y-index
			result += '\n    ';
			for(let x = 0; x < this.width; x++) {

				result += '----';
			}
			result += '-';
		}

		result += '\n';

		return result;
	}
}
