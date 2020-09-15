import { AdjacencyListGraphNode, SimpleAdjacencyListGraphNode } from './data-structures/graph';
import { SimpleQueue } from './data-structures/queue';

/**
 * Helper class, a SimpleQueue that keeps track of the length
 */
class QueueWithLength extends SimpleQueue<number> {

	public length = 0;

	/**
	 * @override
	 */
	public add(data: number): void {

		super.add(data);
		this.length += 1;
	}

	/**
	 * @override
	 */
	public remove(): number {

		const value = super.remove();
		this.length -= 1;
		return value;
	}
}

/**
 * Helper type for the adjacency list graph nodes payload
 */
type ProjectNodeDataV2 = { index: number, incomingEdges: number };

/**
 * Helper type for the adjacency list graph nodes payload
 */
type ProjectNodeDataV3 = { index: number, state: 'UNTOUCHED' | 'TOUCHED' | 'ADDED' };

/**
 * Computes the build order of a project (first version, with adjacency matrix graph)
 */
class ProjectBuildV1 {

	public readonly projects: string[]
	public readonly dependencies: string[][];
	private readonly length: number;

	private projectIndicesMap: {[key: string]: number} = {};
	private dependenciesMatrix: boolean[][] = [];
	private buildOrder: string[] = [];
	private addedToBuildOrder: boolean[] = [];
	private buildOrderCount = 0;
	private projectsToCheck = new QueueWithLength();

	/**
	 * The constructor
	 * @param projects list of unique project identifiers
	 * @param dependencies list of dependencies (array of 2-element arrays, each containing the source and target project identifiers)
	 */
	public constructor(projects: string[], dependencies: string[][]) {

		this.projects = projects;
		this.dependencies = dependencies;
		this.length = projects.length;
	}

	/**
	 * Constructs the build order
	 * T = O(P^2 + D)
	 * S = O(P^2)
	 * @returns the projects in build order
	 * @throws an error if no valid build order exists
	 */
	public getBuildOrder(): string[] {

		// Reset/rebuild helper fields
		this.buildOrder = [];
		this.addedToBuildOrder = [];
		this.buildOrderCount = 0;
		this.projectsToCheck = new QueueWithLength();
		this.buildProjectIndicesMap();
		this.buildDependenciesMatrix();

		// Add right away all projects that have no dependencies at all (= the "roots" of the build)
		for(let i = 0; i < this.length; i++) {
	
			if(this.hasNoDependencies(i)) {
	
				this.addToBuildOrder(i);
			}
		}
	
		// Process all candidates for the next project in the build order (until there are none left or we cycled on the projects to check, a.k.a. there's no valid build order)
		let invalidCheckCounter = this.projectsToCheck.length;
		while(!this.projectsToCheck.isEmpty() && invalidCheckCounter > 0) {
	
			const i = this.projectsToCheck.remove();
	
			if(this.addedToBuildOrder[i]) {

				// Project was already added: simply ingore it and decrease the cycle counter
				invalidCheckCounter -= 1;
			}
			else if(this.hasNoUnfulfilledDependencies(i)) {

				// Project has no dependencies: add it to the build order and reset the cycle counter
				this.addToBuildOrder(i);
				invalidCheckCounter = this.projectsToCheck.length;
			}
			else {

				// Project syill has depencies: re-add it to the end of the projects to check and decrease the cycle counter
				invalidCheckCounter -= 1;
				this.projectsToCheck.add(i);
			}
		}
	
		// At this point, we either have the full build order or no valid build order exists
		if(this.buildOrderCount === this.length) {
	
			return this.buildOrder;
		}
		else {
	
			throw Error('No valid build order (cyclical dependencies)');
		}
	}

	/**
	 * Helper to build the project name -> index map
	 */
	private buildProjectIndicesMap(): void {

		this.projectIndicesMap = {};

		for(let i = 0; i < this.length; i++) {

			const project = this.projects[i];

			if(this.projectIndicesMap[project] !== undefined) {

				throw Error(`Two projects named ${project}`);
			}

			this.projectIndicesMap[project] = i;
		}
	}

	/**
	 * Helper to build the dependencies matrix
	 */
	private buildDependenciesMatrix(): void {

		// Init the matrix
		this.dependenciesMatrix = [];
		for(let i = 0; i < this.length; i++) {

			this.dependenciesMatrix[i] = [];
		}
	
		// Set every dependency in the matrix
		for(const dependency of this.dependencies) {
	
			const sourceProject = dependency[0];
			const targetProject = dependency[1];
	
			if(sourceProject === targetProject) {
	
				throw Error(`No valid build order (${sourceProject} depends on itself)`);
			}
	
			const i = this.projectIndicesMap[sourceProject];
			if(i === undefined) {
	
				throw Error(`Project ${sourceProject} is unknown`);
			}
	
			const j = this.projectIndicesMap[targetProject];
			if(j === undefined) {
	
				throw Error(`Project ${targetProject} is unknown`);
			}
	
			if(this.dependenciesMatrix[j][i]) {
	
				throw Error(`No valid build order (${sourceProject} and ${targetProject} depend on each other)`);
			}
	
			this.dependenciesMatrix[i][j] = true;
		}
	}

	/**
	 * Adds a project to the build order and adds all its children to the projects to check next
	 * @param i the project index
	 */
	private addToBuildOrder(i: number): void {

		// Add the project to all helper fields
		this.addedToBuildOrder[i] = true;
		this.buildOrder.push(this.projects[i]);
		this.buildOrderCount += 1;
	
		// Add all children as future candidates
		for(let j = 0; j < this.length; j++) {
	
			if(this.dependenciesMatrix[i][j]) {
	
				this.projectsToCheck.add(j);
			}
		}
	}

	/**
	 * Checks if a project has no dependencies at all
	 * @param i the project index
	 * @returns true if the project has no dependencies at all
	 */
	private hasNoDependencies(i: number): boolean {

		for(let j = 0; j < this.length; j++) {

			if(this.dependenciesMatrix[j][i]) {

				return false;
			}
		}
		
		return true;
	}

	/**
	 * Checks if a project has no unfulfilled dependencies (= all its dependencies are already in the build order)
	 * @param i the project index
	 * @returns true if the project has no unfulfilled dependencies
	 */
	private hasNoUnfulfilledDependencies(i: number): boolean {

		for(let j = 0; j < this.length; j++) {

			if(this.dependenciesMatrix[j][i] && !this.addedToBuildOrder[j]) {

				return false;
			}
		}
		
		return true;
	}
}
/**
 * Computes the build order of a project (second version, with adjacency list graph + incoming edges count)
 */
class ProjectBuildV2 {

	public readonly projects: string[]
	public readonly dependencies: string[][];
	private readonly length: number;

	private projectIndicesMap: {[key: string]: number} = {};
	private adjacencyGraphNodes: AdjacencyListGraphNode<ProjectNodeDataV2>[] = [];
	private buildOrder: string[] = [];
	private addedToBuildOrder: boolean[] = [];
	private buildOrderCount = 0;
	private nodesToAdd = new SimpleQueue<AdjacencyListGraphNode<ProjectNodeDataV2>>();

	/**
	 * The constructor
	 * @param projects list of unique project identifiers
	 * @param dependencies list of dependencies (array of 2-element arrays, each containing the source and target project identifiers)
	 */
	public constructor(projects: string[], dependencies: string[][]) {

		this.projects = projects;
		this.dependencies = dependencies;
		this.length = projects.length;
	}

	/**
	 * Constructs the build order
	 * T = O(P + D)
	 * S = O(P)
	 * @returns the projects in build order
	 * @throws an error if no valid build order exists
	 */
	public getBuildOrder(): string[] {

		// Reset/rebuild helper fields
		this.buildOrder = [];
		this.addedToBuildOrder = [];
		this.buildOrderCount = 0;
		this.nodesToAdd = new SimpleQueue<AdjacencyListGraphNode<ProjectNodeDataV2>>();
		this.buildProjectIndicesMap();
		this.buildAdjacencyGraphNodes();

		// Add to the queue all projects that have no dependencies at all (= the "roots" of the build)
		for(const node of this.adjacencyGraphNodes) {

			if(node.data.incomingEdges === 0) {

				this.nodesToAdd.add(node);
			}
		}

		// While we have nodes with no dependencies, add them to the build order and process their children
		while(!this.nodesToAdd.isEmpty()) {

			const node = this.nodesToAdd.remove();
			this.addToBuildOrder(node.data.index);
		}

		// At this point, we either have the full build order or no valid build order exists
		if(this.buildOrderCount === this.length) {
	
			return this.buildOrder;
		}
		else {
	
			throw Error('No valid build order (cyclical dependencies)');
		}
	}

	/**
	 * Helper to build the project name -> index map
	 */
	private buildProjectIndicesMap(): void {

		this.projectIndicesMap = {};

		for(let i = 0; i < this.length; i++) {

			const project = this.projects[i];

			if(this.projectIndicesMap[project] !== undefined) {

				throw Error(`Two projects named ${project}`);
			}

			this.projectIndicesMap[project] = i;
		}
	}

	/**
	 * Helper to build the adjacency list graph nodes
	 */
	private buildAdjacencyGraphNodes(): void {

		this.adjacencyGraphNodes = [];
		for(let i = 0; i < this.length; i++) {

			this.adjacencyGraphNodes[i] = new SimpleAdjacencyListGraphNode({
				index: i,
				incomingEdges: 0
			});
		}

		for(const dependency of this.dependencies) {
	
			const sourceProject = dependency[0];
			const targetProject = dependency[1];

			const i = this.projectIndicesMap[sourceProject];
			if(i === undefined) {
	
				throw Error(`Project ${sourceProject} is unknown`);
			}
	
			const j = this.projectIndicesMap[targetProject];
			if(j === undefined) {
	
				throw Error(`Project ${targetProject} is unknown`);
			}

			const sourceNode = this.adjacencyGraphNodes[i];
			const targetNode = this.adjacencyGraphNodes[j];

			if(!sourceNode.children.includes(targetNode)) {

				sourceNode.children.push(targetNode);
				targetNode.data.incomingEdges += 1;
			}
		}
	}

	/**
	 * Adds a project to the build order, decreases the incoming edges for all children and adds them to the queue if they have none left
	 * @param i the project index
	 */
	private addToBuildOrder(i: number): void {

		// Add the project to all helper fields
		this.addedToBuildOrder[i] = true;
		this.buildOrder.push(this.projects[i]);
		this.buildOrderCount += 1;

		// Handle incoming edges of all children and add them to the nodes queue if necessary
		const children = this.adjacencyGraphNodes[i].children;
		for(const child of children) {
	
			child.data.incomingEdges -= 1;
			if(child.data.incomingEdges === 0) {

				this.nodesToAdd.add(child);
			}
		}
	}
}
/**
 * Computes the build order of a project (adjacency list graph + depth first)
 */
class ProjectBuildV3 {

	public readonly projects: string[]
	public readonly dependencies: string[][];
	private readonly length: number;

	private projectIndicesMap: {[key: string]: number} = {};
	private adjacencyGraphNodes: AdjacencyListGraphNode<ProjectNodeDataV3>[] = [];
	private buildOrder: string[] = [];
	private currentBuildIndex = 0;

	/**
	 * The constructor
	 * @param projects list of unique project identifiers
	 * @param dependencies list of dependencies (array of 2-element arrays, each containing the source and target project identifiers)
	 */
	public constructor(projects: string[], dependencies: string[][]) {

		this.projects = projects;
		this.dependencies = dependencies;
		this.length = projects.length;
	}

	/**
	 * Constructs the build order
	 * T = O(P + D)
	 * S = O(P)
	 * @returns the projects in build order
	 * @throws an error if no valid build order exists
	 */
	public getBuildOrder(): string[] {

		// Reset/rebuild helper fields
		this.buildOrder = [];
		this.currentBuildIndex = this.length - 1;
		this.buildProjectIndicesMap();
		this.buildAdjacencyGraphNodes();

		for(const node of this.adjacencyGraphNodes) {

			const nodeValid = this.depthFirstTraversal(node);
			if(!nodeValid) {

				throw Error('No valid build order (cyclical dependencies)');
			}
		}

		return this.buildOrder;
	}

	/**
	 * Recursive helper for depth first traversal
	 * @param node the current node
	 * @returns false if this node (or its children) contains at least one cycle
	 */
	private depthFirstTraversal(node: AdjacencyListGraphNode<ProjectNodeDataV3>): boolean {

		// Check cycles
		if(node.data.state === 'TOUCHED') {

			return false;
		}

		// If it's a new node, recurse on children and if they are all valid add this node to the build order
		if(node.data.state === 'UNTOUCHED') {

			node.data.state = 'TOUCHED';

			for(const child of node.children) {

				const childValid = this.depthFirstTraversal(child);
				if(!childValid) {

					return false;
				}
			}

			this.buildOrder[this.currentBuildIndex] = this.projects[node.data.index];
			this.currentBuildIndex -= 1;

			node.data.state = 'ADDED';
		}

		return true;
	}
	
	/**
	 * Helper to build the project name -> index map
	 */
	private buildProjectIndicesMap(): void {

		this.projectIndicesMap = {};

		for(let i = 0; i < this.length; i++) {

			const project = this.projects[i];

			if(this.projectIndicesMap[project] !== undefined) {

				throw Error(`Two projects named ${project}`);
			}

			this.projectIndicesMap[project] = i;
		}
	}

	/**
	 * Helper to build the adjacency list graph nodes
	 */
	private buildAdjacencyGraphNodes(): void {

		this.adjacencyGraphNodes = [];
		for(let i = 0; i < this.length; i++) {

			this.adjacencyGraphNodes[i] = new SimpleAdjacencyListGraphNode({
				index: i,
				state: 'UNTOUCHED'
			});
		}

		for(const dependency of this.dependencies) {
	
			const sourceProject = dependency[0];
			const targetProject = dependency[1];

			const i = this.projectIndicesMap[sourceProject];
			if(i === undefined) {
	
				throw Error(`Project ${sourceProject} is unknown`);
			}
	
			const j = this.projectIndicesMap[targetProject];
			if(j === undefined) {
	
				throw Error(`Project ${targetProject} is unknown`);
			}

			const sourceNode = this.adjacencyGraphNodes[i];
			const targetNode = this.adjacencyGraphNodes[j];

			if(!sourceNode.children.includes(targetNode)) {

				sourceNode.children.push(targetNode);
			}
		}
	}
}

const tests: {proj: string[], deps: string[][]}[] = [
	{ proj: [], deps: [] },
	{ proj: [ 'a' ], deps: [] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'b', 'a' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'd', 'd' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'b', 'e' ], [ 'e', 'b' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'b', 'e' ], [ 'x', 'b' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'b', 'e' ], [ 'e', 'x' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'a', 'd' ], [ 'f', 'b' ], [ 'b', 'd' ], [ 'f', 'a' ], [ 'd', 'c' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ], deps: [[ 'a', 'd' ], [ 'f', 'b' ], [ 'b', 'd' ], [ 'f', 'a' ], [ 'd', 'c' ], [ 'e', 'b' ], [ 'e', 'c' ], [ 'g', 'a' ], [ 'h', 'g' ], [ 'i', 'h' ], [ 'i', 'j' ], [ 'j', 'k' ], [ 'j', 'd' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ], deps: [[ 'a', 'd' ], [ 'f', 'b' ], [ 'b', 'd' ], [ 'f', 'a' ], [ 'd', 'c' ], [ 'e', 'b' ], [ 'e', 'c' ], [ 'g', 'a' ], [ 'h', 'g' ], [ 'i', 'h' ], [ 'i', 'j' ], [ 'j', 'k' ], [ 'j', 'd' ], [ 'c', 'j' ]] }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	try {

		const buildOrder = new ProjectBuildV1(test.proj, test.deps).getBuildOrder();
		console.log(`'${test.proj}' + '${test.deps}' -----> ${buildOrder}`);
	}
	catch(err) {

		console.log(`'${test.proj}' + '${test.deps}' -----> ${err}`);
	}
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	try {

		const buildOrder = new ProjectBuildV2(test.proj, test.deps).getBuildOrder();
		console.log(`'${test.proj}' + '${test.deps}' -----> ${buildOrder}`);
	}
	catch(err) {

		console.log(`'${test.proj}' + '${test.deps}' -----> ${err}`);
	}
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	try {

		const buildOrder = new ProjectBuildV3(test.proj, test.deps).getBuildOrder();
		console.log(`'${test.proj}' + '${test.deps}' -----> ${buildOrder}`);
	}
	catch(err) {

		console.log(`'${test.proj}' + '${test.deps}' -----> ${err}`);
	}
}
