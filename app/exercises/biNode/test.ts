
import { BiNode, convertBinarySearchTreeToDoublyLinkedList } from './v1';

const tests = [

	new BiNode(
		5
	),

	new BiNode(
		5,
		new BiNode(
			2
		),
		new BiNode(
			7
		)
	),

	new BiNode(
		5,
		new BiNode(
			4,
			new BiNode(
				3,
				new BiNode(
					2
				),
				undefined
			),
			undefined
		),
		undefined
	),

	new BiNode(
		5,
		undefined,
		new BiNode(
			7,
			undefined,
			new BiNode(
				9,
				undefined,
				new BiNode(
					11
				)
			)
		)
	),

	new BiNode(
		40,
		new BiNode(
			30,
			new BiNode(
				8,
				new BiNode(
					7,
					new BiNode(
						1
					)
				),
				new BiNode(
					10,
					new BiNode(
						9
					),
					new BiNode(
						14
					)
				)
			),
			new BiNode(
				31,
				undefined
			)
		),
		new BiNode(
			245,
			new BiNode(
				230,
				new BiNode(
					230,
					new BiNode(
						230
					)
				),
				new BiNode(
					235,
					new BiNode(
						231
					),
					new BiNode(
						236
					)
				)
			),
			new BiNode(
				1000,
				undefined,
				new BiNode(
					1007,
					new BiNode(
						1001
					),
					new BiNode(
						1008
					)
				)
			)
		)
	),

	new BiNode(
		50,
		new BiNode(
			25,
			new BiNode(
				20
			),
			new BiNode(
				30
			)
		),
		new BiNode(
			100,
			undefined,
			new BiNode(
				150,
				new BiNode(
					125,
					undefined,
					new BiNode(
						140,
						new BiNode(
							130,
							new BiNode(
								127,
								new BiNode(
									126
								),
								new BiNode(
									128,
									undefined,
									new BiNode(
										129
									)
								)
							),
							undefined
						),
						new BiNode(
							140,
							undefined,
							new BiNode(
								141
							)
						)
					)
				),
				new BiNode(
					200,
					undefined,
					new BiNode(
						250
					)
				)
			)
		)
	)
];

const verifyLinkedList = (root: BiNode): void => {

	let prevNode = root;
	let node = root.node2;
	while(node) {

		if(node.node1 !== prevNode) {

			throw Error('Wrong prev node');
		}

		if(node.data < prevNode.data) {

			throw Error('Wrong order');
		}

		prevNode = node;
		node = node.node2;
	}
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const binarySearchTreeString = test.toString();
	convertBinarySearchTreeToDoublyLinkedList(test);
	const linkedListString = test.toString();

	console.log(`${binarySearchTreeString}\n\n-------------->\n\n${linkedListString}\n\n\n######################\n\n\n`);

	verifyLinkedList(test);
}
