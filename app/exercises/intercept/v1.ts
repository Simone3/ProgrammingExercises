/**
 * A point
 */
export class Point {

	public x: number;
	public y: number;

	public constructor(x: number, y: number) {
		
		this.x = x;
		this.y = y;
	}

	public toString(): string {

		return `(${this.x}, ${this.y})`;
	}
}

/**
 * A segment
 */
export class Segment {

	public start: Point;
	public end: Point;

	public constructor(start: Point, end: Point) {
		
		this.start = start;
		this.end = end;
	}

	public toString(): string {

		return `[ ${this.start} <-> ${this.end} ]`;
	}
}

/**
 * An infinite line (defined by slope and y-intercept)
 */
class Line {

	public m: number;
	public q: number;

	public constructor(firstPoint: Point, secondPoint: Point) {
		
		const deltaX = secondPoint.x - firstPoint.x;
		const deltaY = secondPoint.y - firstPoint.y;

		if(deltaX === 0) {

			this.m = Infinity;
			this.q = -Infinity;
		}
		else {

			this.m = deltaY / deltaX;
			this.q = secondPoint.y - this.m * secondPoint.x;
		}
	}

	public toString(): string {

		return `{ y = ${this.m} x + ${this.q} }`;
	}
}

/**
 * Checks if a middle value is between start and end
 * @param start reference
 * @param middle to check
 * @param end reference
 * @returns true if it's between
 */
const isCoordinateBetween = (start: number, middle: number, end: number): boolean => {

	if(start <= end) {

		return start <= middle && middle <= end;
	}
	else {

		return end <= middle && middle <= start;
	}
};

/**
 * Checks if a middle point is between start and end
 * @param start reference
 * @param middle to check
 * @param end reference
 * @returns true if it's between
 */
const isPointBetween = (start: Point, middle: Point, end: Point): boolean => {

	return isCoordinateBetween(start.x, middle.x, end.x) && isCoordinateBetween(start.y, middle.y, end.y);
};

/**
 * Gets the interception point of two segments, if any
 * @param firstSegment a segment
 * @param secondSegment a segment
 * @returns intercept point or undefined
 */
export const getInterceptionPoint = (firstSegment: Segment, secondSegment: Segment): Point | undefined => {

	// Extend the two segments into infinite lines
	const firstLine = new Line(firstSegment.start, firstSegment.end);
	const secondLine = new Line(secondSegment.start, secondSegment.end);

	if(firstLine.m === secondLine.m) {

		if(firstLine.q === secondLine.q) {

			if(isPointBetween(firstSegment.start, secondSegment.start, firstSegment.end)) {

				// Lines are coincident and the two segments touch in at least one point
				return secondSegment.start;
			}
			else if(isPointBetween(firstSegment.start, secondSegment.end, firstSegment.end)) {

				// Lines are coincident and the two segments touch in at least one point
				return secondSegment.end;
			}
			else {

				// Lines are coincident but the two segments do not touch
				return undefined;
			}
		}
		else {

			// Lines are parallel
			return undefined;
		}
	}
	else {

		// Compute the interception point of the two infinite lines
		let lineInterceptX;
		let lineInterceptY;
		if(firstLine.m === Infinity) {

			// First line is vertical
			lineInterceptX = firstSegment.start.x;
			lineInterceptY = secondLine.m * lineInterceptX + secondLine.q;
		}
		else if(secondLine.m === Infinity) {

			// Second line is vertical
			lineInterceptX = secondSegment.start.x;
			lineInterceptY = firstLine.m * lineInterceptX + firstLine.q;
		}
		else {

			// Neither line is vertical
			lineInterceptX = (secondLine.q - firstLine.q) / (firstLine.m - secondLine.m);
			lineInterceptY = firstLine.m * lineInterceptX + firstLine.q;
		}
		const lineIntercept = new Point(lineInterceptX, lineInterceptY);

		if(isPointBetween(firstSegment.start, lineIntercept, firstSegment.end) && isPointBetween(secondSegment.start, lineIntercept, secondSegment.end)) {

			// The two lines have different slopes and the interception point is inside both segments
			return lineIntercept;
		}
		else {

			// The two lines have different slopes but the interception point is outside one or both segments
			return undefined;
		}
	}
};
