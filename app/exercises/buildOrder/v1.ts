import { SimpleQueue } from '../../data-structures/queue';

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
 * Computes the build order of a project (first version, with adjacency matrix graph)
 */
export class ProjectBuildV1 {

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
