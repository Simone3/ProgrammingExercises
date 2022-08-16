/**
 * The result of the re-spacing operation
 */
export interface ReSpaceResult {

	/**
	 * The re-spaced text
	 */
	text: string;

	/**
	 * List of unrecognized words
	 */
	unrecognizedWords: string[];

	/**
	 * Total character count of all unrecognized words
	 */
	unrecognizedCharactersCount: number;
}
