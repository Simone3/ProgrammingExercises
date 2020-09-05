import { SimpleQueue } from './queue';

/**
 * Helper type for graph callbacks
 * @template T the data type
 */
export type GraphCallback<T> = (data: T, depth: number) => boolean | undefined | void;

/**
 * A node of an adjacency list graph. It may or may not have children that continue the graph.
 * @template T the data type
 */
export interface AdjacencyListGraphNode<T> {

	/**
	 * The node payload
	 */
	data: T;

	/**
	 * The node children, if any
	 */
	children: AdjacencyListGraphNode<T>[];

	/**
	 * Traverses the graph with a breadth-first approach starting from this node
	 * @param callback function called for each node (if it returns true, the traversal stops)
	 */
	breadthFirstTraversal(callback: GraphCallback<T>): void;

	/**
	 * Traverses the graph with a depth-first approach starting from this node
	 * @param callback function called for each node (if it returns true, the traversal stops)
	 */
	depthFirstTraversal(callback: GraphCallback<T>): void;

	/**
	 * Prints the graph as a string starting from this node
	 * @returns the string representation
	 */
	toString(): string;
}

/**
 * A simple implementation of a node of an adjacency list graph
 * @template T the data type, defaults to string
 */
export class SimpleAdjacencyListGraphNode<T = string> implements AdjacencyListGraphNode<T> {

	public data: T;
	public children: AdjacencyListGraphNode<T>[] = [];

	/**
	 * The constructor
	 * @param data the node payload
	 * @param children the node children, if any
	 */
	public constructor(data: T, children?: AdjacencyListGraphNode<T>[]) {

		this.data = data;
		this.children = children ? children : [];
	}

	/**
	 * @override
	 */
	public breadthFirstTraversal(callback: GraphCallback<T>): void {
		
		// Init two queues for BFS ordering and a map to detect cycles
		const nodesQueue = new SimpleQueue<AdjacencyListGraphNode<T>>();
		const depthsQueue = new SimpleQueue<number>();
		const cyclesMap = new Map<AdjacencyListGraphNode<T>, boolean>();
		nodesQueue.add(this);
		depthsQueue.add(0);

		// Add each node to the queues and invoke the callback for each
		while(!nodesQueue.isEmpty()) {

			const node = nodesQueue.remove();
			const depth = depthsQueue.remove();

			if(!cyclesMap.get(node)) {

				cyclesMap.set(node, true);

				const stop = callback(node.data, depth);
				if(stop) {

					return;
				}

				for(const child of node.children) {

					nodesQueue.add(child);
					depthsQueue.add(depth + 1);
				}
			}
		}
	}

	/**
	 * @override
	 */
	public depthFirstTraversal(callback: GraphCallback<T>): void {

		this.depthFirstHelper(callback, new Map<AdjacencyListGraphNode<T>, boolean>(), this, 0);
	}

	/**
	 * @override
	 */
	public toString(): string {

		let result = '';

		// Init a queue for the nodes and a map to detect cycles
		const nodesQueue = new SimpleQueue<AdjacencyListGraphNode<T>>();
		const cyclesMap = new Map<AdjacencyListGraphNode<T>, boolean>();
		nodesQueue.add(this);

		// Add each node to the queue and print each one
		while(!nodesQueue.isEmpty()) {

			const node = nodesQueue.remove();

			if(!cyclesMap.get(node)) {

				cyclesMap.set(node, true);

				result += `${result ? ' --- ' : ''}${node.data}: `;

				const childrenCount = node.children.length;
				if(childrenCount === 0) {

					result += '/';
				}
				else {

					for(let i = 0; i < childrenCount; i++) {

						const child = node.children[i];
						result += `${i === 0 ? '' : ', '}${child.data}`;
						nodesQueue.add(child);
					}
				}
			}
		}

		return result;
	}

	/**
	 * Internal helper for DFS
	 * @param callback function called for each node
	 * @param cyclesMap the map to detect cycles
	 * @param node the current node
	 * @param depth the current node depth
	 * @returns true if the traversal needs to stop
	 */
	private depthFirstHelper(callback: GraphCallback<T>, cyclesMap: Map<AdjacencyListGraphNode<T>, boolean>, node: AdjacencyListGraphNode<T>, depth: number): boolean {

		// Handle cycles with the map
		if(cyclesMap.get(node)) {

			return false;
		}
		cyclesMap.set(node, true);

		// Invoke the callback for the current node and exit if it returns true
		let stop = callback(node.data, depth);
		if(stop) {

			return true;
		}

		// Recursively call the method for each child and exit if it returns true
		for(const child of node.children) {

			stop = this.depthFirstHelper(callback, cyclesMap, child, depth + 1);
			if(stop) {

				return true;
			}
		}

		return false;
	}
}

/**
 * A graph implemented with an adjacency matrix
 * @template T the data type
 */
export interface AdjacencyMatrixGraph<T> {

	/**
	 * Adds a directional connection from i to j
	 * @param i the source node index
	 * @param j the targed node index
	 */
	addConnection(i: number, j: number): void;

	/**
	 * Removes a directional connection from i to j
	 * @param i the source node index
	 * @param j the targed node index
	 */
	removeConnection(i: number, j: number): void;

	/**
	 * Checks if the graph has no nodes
	 * @returns true if the graph is empty
	 */
	isEmpty(): boolean;

	/**
	 * Traverses the graph with a breadth-first approach
	 * @param callback function called for each node (if it returns true, the traversal stops)
	 * @param startFromIndex optional starting node index (defaults to 0)
	 */
	breadthFirstTraversal(callback: GraphCallback<T>, startFromIndex?: number): void;

	/**
	 * Traverses the graph with a depth-first approach
	 * @param callback function called for each node (if it returns true, the traversal stops)
	 * @param startFromIndex optional starting node index (defaults to 0)
	 */
	depthFirstTraversal(callback: GraphCallback<T>, startFromIndex?: number): void;

	/**
	 * Prints the graph as a string starting from the 0-th node
	 * @returns the string representation
	 */
	toString(): string;
}

/**
 * A simple implementation of a graph with an adjacency matrix
 * @template T the data type, defaults to string
 */
export class SimpleAdjacencyMatrixGraph<T = string> implements AdjacencyMatrixGraph<T> {

	/**
	 * The node values
	 */
	private nodesData: T[];

	/**
	 * The adjacency matrix
	 */
	private matrix: boolean[][];

	/**
	 * The constructor
	 * @param nodesData the node values (their positions in the array are the corresponding node indices)
	 * @param connections the optional directional connections to initialize
	 */
	public constructor(nodesData: T[], connections?: {i: number, j: number}[]) {

		this.nodesData = nodesData;

		const nodesNumber = nodesData.length;
		this.matrix = [];
		this.matrix.length = nodesNumber;
		for(let i = 0; i < nodesNumber; i++) {

			const row: boolean[] = [];
			row.length = nodesNumber;
			this.matrix[i] = row;
		}

		if(connections) {

			for(const connection of connections) {

				this.addConnection(connection.i, connection.j);
			}
		}
	}

	/**
	 * @override
	 */
	public addConnection(i: number, j: number): void {

		if(this.matrix[i][j]) {

			throw Error(`Connection ${i}-${j} already exists`);
		}

		this.matrix[i][j] = true;
	}

	/**
	 * @override
	 */
	public removeConnection(i: number, j: number): void {

		if(!this.matrix[i][j]) {

			throw Error(`Connection ${i}-${j} does not exist`);
		}

		this.matrix[i][j] = false;
	}

	/**
	 * @override
	 */
	public isEmpty(): boolean {

		return this.nodesData.length === 0;
	}

	/**
	 * @override
	 */
	public breadthFirstTraversal(callback: GraphCallback<T>, startFromIndex?: number): void {

		if(this.isEmpty()) {

			return;
		}

		// Init two queues for BFS ordering and an array to detect cycles
		const cyclesArray = [];
		cyclesArray.length = this.nodesData.length;
		const indicesQueue = new SimpleQueue<number>();
		const depthsQueue = new SimpleQueue<number>();
		indicesQueue.add(startFromIndex ? startFromIndex : 0);
		depthsQueue.add(0);

		// Add each node to the queues and invoke the callback for each
		while(!indicesQueue.isEmpty()) {

			const index = indicesQueue.remove();
			const depth = depthsQueue.remove();

			if(!cyclesArray[index]) {

				cyclesArray[index] = true;

				const stop = callback(this.nodesData[index], depth);
				if(stop) {

					return;
				}

				const row = this.matrix[index];
				for(let i = 0; i < row.length; i++) {

					if(row[i]) {

						indicesQueue.add(i);
						depthsQueue.add(depth + 1);
					}
				}
			}
		}
	}

	/**
	 * @override
	 */
	public depthFirstTraversal(callback: GraphCallback<T>, startFromIndex?: number): void {

		if(this.isEmpty()) {

			return;
		}

		const cyclesArray: boolean[] = [];
		cyclesArray.length = this.nodesData.length;

		this.depthFirstHelper(callback, cyclesArray, startFromIndex ? startFromIndex : 0, 0);
	}

	/**
	 * @override
	 */
	public toString(): string {

		if(this.isEmpty()) {

			return '-';
		}

		let result = '';

		// Init a queue for the nodes and an array to detect cycles
		const cyclesArray = [];
		cyclesArray.length = this.nodesData.length;
		const indicesQueue = new SimpleQueue<number>();
		indicesQueue.add(0);

		// Add each node to the queue and print each one
		while(!indicesQueue.isEmpty()) {

			const index = indicesQueue.remove();

			if(!cyclesArray[index]) {

				cyclesArray[index] = true;

				result += `${result ? ' --- ' : ''}${this.nodesData[index]}: `;

				const row = this.matrix[index];
				let childrenCount = 0;
				for(let i = 0; i < row.length; i++) {

					if(row[i]) {

						result += `${childrenCount === 0 ? '' : ', '}${this.nodesData[i]}`;

						childrenCount += 1;

						indicesQueue.add(i);
						
					}
				}

				if(childrenCount === 0) {

					result += '/';
				}
			}
		}

		return result;
	}

	/**
	 * Internal helper for DFS
	 * @param callback function called for each node
	 * @param cyclesArray the array to detect cycles
	 * @param index the current index
	 * @param depth the current node depth
	 * @returns true if the traversal needs to stop
	 */
	private depthFirstHelper(callback: GraphCallback<T>, cyclesArray: boolean[], index: number, depth: number): boolean {

		// Handle cycles with the array
		if(cyclesArray[index]) {

			return false;
		}
		cyclesArray[index] = true;

		// Invoke the callback for the current node and exit if it returns true
		let stop = callback(this.nodesData[index], depth);
		if(stop) {

			return true;
		}

		// Recursively call the method for each child and exit if it returns true
		const row = this.matrix[index];
		for(let i = 0; i < row.length; i++) {

			if(row[i]) {

				stop = this.depthFirstHelper(callback, cyclesArray, i, depth + 1);
				if(stop) {

					return true;
				}
			}
		}

		return false;
	}
}
