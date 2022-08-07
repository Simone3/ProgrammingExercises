import { WordDistanceV1 } from './v1';

const text =
`One day the Hare laughed at the short feet and slow speed of the Tortoise. The Tortoise replied:
"You may be as fast as the wind, but I will beat you in a race!"
The Hare thought this idea was impossible and he agreed to the proposal. It was agreed that the Fox should choose the course and decide the end.
The day for the race came, and the Tortoise and Hare started together.
The Tortoise never stopped for a moment, walking slowly but steadily, right to the end of the course. The Hare ran fast and stopped to lie down for a rest. But he fell fast asleep. Eventually, he woke up and ran as fast as he could. But when he reached the end, he saw the Tortoise there already, sleeping comfortably after her effort.`;

const tests = [
	[ '', '' ],
	[ '', 'hare' ],
	[ 'hare', '' ],
	[ 'hare', 'xxxxxxxxx' ],
	[ 'xxxxxxxx', 'hare' ],
	[ 'xxxxxxxxx', 'xxxxxxxxx' ],
	[ 'hare', 'tortoise' ],
	[ 'tortoise', 'hare' ],
	[ 'one', 'day' ],
	[ 'race', 'race' ],
	[ 'the', 'and' ],
	[ 'and', 'the' ],
	[ 'one', 'effort' ],
	[ 'effort', 'one' ],
	[ 'the', 'was' ],
	[ 'was', 'the' ],
	[ 'choose', 'course' ],
	[ 'course', 'choose' ]
];

console.log('\n\n**********************\n\n');
const wordDistanceV1 = new WordDistanceV1(text);
for(const test of tests) {

	const resultV1 = wordDistanceV1.getDistance(test[0], test[1]);

	console.log(`${test[0]} <-> ${test[1]} ---> V1 = ${resultV1}`);
}
