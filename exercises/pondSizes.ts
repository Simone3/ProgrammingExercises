import { Queue, SimpleQueue } from './data-structures/queue';

/**
 * Adds a cell to the correct queue
 * @param land the land matrix
 * @param r the current row index
 * @param c the current column index
 * @param visited matrix for already visited cells
 * @param pondQueue the queue for pond cells
 * @param terrainQueue the queue for non-pond cells
 */
const addToQueue = (land: number[][], r: number, c: number, visited: boolean[][], pondQueue: Queue<[number, number]>, terrainQueue: Queue<[number, number]>): void => {

	// Invalid cell index
	if(r < 0 || c < 0 || r >= land.length || c >= land[r].length) {

		return;
	}

	// Initialize the current row in the visited matrix if necessary
	if(!visited[r]) {

		visited[r] = [];
	}

	if(!visited[r][c]) {

		visited[r][c] = true;

		if(land[r][c] === 0) {

			// Unvisited pond cell: add it to the pond queue
			pondQueue.add([ r, c ]);
		}
		else {

			// Unvisited non-pond cell: add it to the non-pond queue
			terrainQueue.add([ r, c ]);
		}
	}
};

/**
 * Adds all surrounding cells to the correct queue
 * @param land the land matrix
 * @param r the current row index
 * @param c the current column index
 * @param visited matrix for already visited cells
 * @param pondQueue the queue for pond cells
 * @param terrainQueue the queue for non-pond cells
 */
const addAllSurroundingToQueue = (land: number[][], r: number, c: number, visited: boolean[][], pondQueue: Queue<[number, number]>, terrainQueue: Queue<[number, number]>): void => {

	addToQueue(land, r - 1, c - 1, visited, pondQueue, terrainQueue);
	addToQueue(land, r - 1, c, visited, pondQueue, terrainQueue);
	addToQueue(land, r - 1, c + 1, visited, pondQueue, terrainQueue);
	addToQueue(land, r, c - 1, visited, pondQueue, terrainQueue);
	addToQueue(land, r, c + 1, visited, pondQueue, terrainQueue);
	addToQueue(land, r + 1, c - 1, visited, pondQueue, terrainQueue);
	addToQueue(land, r + 1, c, visited, pondQueue, terrainQueue);
	addToQueue(land, r + 1, c + 1, visited, pondQueue, terrainQueue);
};

/**
 * You have an integer matrix representing a plot of land, where the value at that location represents the height above sea level.
 * A value of zero indicates water. A pond is a region of water connected vertically, horizontally, or diagonally.
 * The size of the pond is the total number of connected water cells.
 * This method computes the sizes of all ponds in the matrix.
 * T = O(R * C)
 * S = O(R * C)
 * @param land the land matrix
 * @returns the list of pond sizes (in any order)
 */
export const getPondSizes = (land: number[][]): number[] => {

	const pondSizes: number[] = [];

	if(land.length === 0) {

		return pondSizes;
	}

	const visited: boolean[][] = [];
	const pondQueue: Queue<[number, number]> = new SimpleQueue();
	const terrainQueue: Queue<[number, number]> = new SimpleQueue();

	// Add the first cell to the correct queue
	addToQueue(land, 0, 0, visited, pondQueue, terrainQueue);

	// Loop until we run out of cells
	let currentPondSize = 0;
	while(!pondQueue.isEmpty() || !terrainQueue.isEmpty()) {

		let indices;

		if(!pondQueue.isEmpty()) {

			// First explore all cells in a pond, counting them
			indices = pondQueue.remove();
			currentPondSize += 1;
		}
		else {

			// If there are no more pond cells, the current pond (if any) is completely explored and we can continue with the non-pond cells
			indices = terrainQueue.remove();
			if(currentPondSize) {

				pondSizes.push(currentPondSize);
				currentPondSize = 0;
			}
		}

		// Add all surrounding cells to the queue
		addAllSurroundingToQueue(land, indices[0], indices[1], visited, pondQueue, terrainQueue);
	}

	// Add the last pond (if any) to the result
	if(currentPondSize) {

		pondSizes.push(currentPondSize);
	}

	return pondSizes;
};

const tests: number[][][] = [
	[],

	[
		[ 1 ]
	],

	[
		[ 0 ]
	],

	[
		[ 1, 1, 1, 1 ]
	],

	[
		[ 1, 0, 1, 1 ]
	],

	[
		[ 1, 1, 0, 0 ]
	],

	[
		[ 0, 0, 0, 0 ]
	],

	[
		[ 1, 1, 1, 1 ],
		[ 1, 1, 1, 1 ],
		[ 1, 1, 1, 1 ]
	],

	[
		[ 1, 1, 1, 1 ],
		[ 1, 0, 1, 1 ],
		[ 1, 1, 1, 1 ]
	],

	[
		[ 1, 0, 1, 1 ],
		[ 1, 1, 1, 0 ],
		[ 0, 1, 1, 1 ]
	],

	[
		[ 0, 1, 1, 1 ],
		[ 1, 0, 1, 0 ],
		[ 1, 1, 0, 1 ]
	],

	[
		[ 0, 1, 1, 0 ],
		[ 1, 0, 0, 1 ],
		[ 1, 0, 1, 0 ]
	],

	[
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ]
	],

	[
		[ 0, 2, 1, 0 ],
		[ 0, 1, 0, 1 ],
		[ 1, 1, 0, 1 ],
		[ 0, 1, 0, 1 ]
	]
];

const toString = (matrix: number[][]): string => {

	let result = '';
	for(let i = 0; i < matrix.length; i++) {

		result += '[ ';
		for(let j = 0; j < matrix[i].length; j++) {

			result += `${matrix[i][j]} `;
		}
		result += ']\n';
	}
	return result;
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${toString(test)}`);
	console.log(' ----> \n');
	console.log(`[ ${getPondSizes(test).join(', ')} ]`);
	console.log('\n*******************\n');
}
