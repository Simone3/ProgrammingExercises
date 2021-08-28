import { getInterceptionPoint, Point, Segment } from './v1';

const tests = [
	[ new Segment(new Point(1, 1), new Point(5, 5)), new Segment(new Point(5, 1), new Point(1, 5)) ],
	[ new Segment(new Point(1, 1), new Point(5, 5)), new Segment(new Point(1, 5), new Point(5, 1)) ],
	[ new Segment(new Point(4, 1), new Point(5, 5)), new Segment(new Point(5, 1), new Point(1, 5)) ],
	[ new Segment(new Point(-4, -1), new Point(-5, -5)), new Segment(new Point(5, 1), new Point(1, 5)) ],
	[ new Segment(new Point(1, 2), new Point(7.5, 5)), new Segment(new Point(5.1, 1), new Point(1, 5.3)) ],
	[ new Segment(new Point(1, 1), new Point(5, 5)), new Segment(new Point(5, 5), new Point(1, 1)) ],
	[ new Segment(new Point(1, 1), new Point(5, 5)), new Segment(new Point(50, 50), new Point(2, 2)) ],

	[ new Segment(new Point(3, 1), new Point(3, 8)), new Segment(new Point(1, 1), new Point(5, 5)) ],
	[ new Segment(new Point(3, 1), new Point(3, 8)), new Segment(new Point(4, 2), new Point(4, 4)) ],
	[ new Segment(new Point(3, 1), new Point(3, 8)), new Segment(new Point(3, 5), new Point(3, 6)) ],
	
	[ new Segment(new Point(1, 3), new Point(8, 3)), new Segment(new Point(1, 1), new Point(5, 5)) ],
	[ new Segment(new Point(1, 3), new Point(8, 3)), new Segment(new Point(2, 4), new Point(4, 4)) ],
	[ new Segment(new Point(1, 3), new Point(8, 3)), new Segment(new Point(5, 3), new Point(6, 3)) ],

	[ new Segment(new Point(1, 1), new Point(1, 5)), new Segment(new Point(0, 2), new Point(4, 2)) ],

	[ new Segment(new Point(1, 1), new Point(1, 1)), new Segment(new Point(1, 1), new Point(1, 1)) ],
	[ new Segment(new Point(1, 1), new Point(1, 1)), new Segment(new Point(2, 1), new Point(2, 1)) ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test[0]} & ${test[1]} ------> ${getInterceptionPoint(test[0], test[1])}`);
}
