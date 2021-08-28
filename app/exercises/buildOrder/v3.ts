import { AdjacencyListGraphNode, SimpleAdjacencyListGraphNode } from '../../data-structures/graph';

/**
 * Helper type for the adjacency list graph nodes payload
 */
 type ProjectNodeDataV3 = { index: number, state: 'UNTOUCHED' | 'TOUCHED' | 'ADDED' };

/**
 * Computes the build order of a project (adjacency list graph + depth first)
 */
export class ProjectBuildV3 {

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
