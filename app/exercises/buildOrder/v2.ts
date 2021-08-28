import { AdjacencyListGraphNode, SimpleAdjacencyListGraphNode } from '../../data-structures/graph';
import { SimpleQueue } from '../../data-structures/queue';

/**
 * Helper type for the adjacency list graph nodes payload
 */
 type ProjectNodeDataV2 = { index: number, incomingEdges: number };

/**
 * Computes the build order of a project (second version, with adjacency list graph + incoming edges count)
 */
export class ProjectBuildV2 {

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
