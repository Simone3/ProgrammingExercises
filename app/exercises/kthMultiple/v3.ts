import { Queue, SimpleQueue } from '../../data-structures/queue';
import { Multiple, newMultiple } from './common';

/**
 * Generator that builds the sequence of multiples
 */
class MultipleGenerator {

	/**
	 * Queue that keeps track of all multiples M(i) such that M(i) = 3 * M(j) where M(j) is a previous multiple
	 * The top of the queue is always the smallest value in the queue
	 */
	private readonly queue3: Queue<Multiple>;

	/**
	 * Queue that keeps track of all multiples M(i) such that M(i) = 5 * M(j) where M(j) is a previous multiple
	 * The top of the queue is always the smallest value in the queue
	 */
	private readonly queue5: Queue<Multiple>;

	/**
	 * Queue that keeps track of all multiples M(i) such that M(i) = 7 * M(j) where M(j) is a previous multiple
	 * The top of the queue is always the smallest value in the queue
	 */
	private readonly queue7: Queue<Multiple>;

	public constructor() {

		this.queue3 = new SimpleQueue<Multiple>([ newMultiple(0, 0, 0) ]);
		this.queue5 = new SimpleQueue<Multiple>();
		this.queue7 = new SimpleQueue<Multiple>();
	}

	/**
	 * Generates the next multiple
	 * @returns the multiple
	 */
	public generate(): Multiple {

		// Get the multiples on top of each of the 3 queues
		const multiple3 = this.queue3.isEmpty() ? undefined : this.queue3.peek();
		const multiple5 = this.queue5.isEmpty() ? undefined : this.queue5.peek();
		const multiple7 = this.queue7.isEmpty() ? undefined : this.queue7.peek();
		const multiples = [ multiple3, multiple5, multiple7 ];

		// Get the smallest multiple out of the 3
		let smallestMultipleIndex;
		let smallestMultiple;
		for(let i = 0; i < multiples.length; i++) {

			const multiple = multiples[i];
			if(multiple && (!smallestMultiple || multiple.value < smallestMultiple.value)) {

				smallestMultipleIndex = i;
				smallestMultiple = multiple;
			}
		}
		if(smallestMultiple === undefined || smallestMultipleIndex === undefined) {

			throw Error('I should always have a smallest multiple...!');
		}

		if(smallestMultipleIndex === 0) {

			// If the smallest is in queue3, remove it and add 3*M, 5*M and 7*M in the corresponding queues
			// All queues remain ordered because I know that e.g. 7*M is for sure bigger than the bottom of queue7 (which is 7*M' where M' < M since M' was selected before M)
			this.queue3.remove();
			this.queue3.add(newMultiple(smallestMultiple.a + 1, smallestMultiple.b, smallestMultiple.c));
			this.queue5.add(newMultiple(smallestMultiple.a, smallestMultiple.b + 1, smallestMultiple.c));
			this.queue7.add(newMultiple(smallestMultiple.a, smallestMultiple.b, smallestMultiple.c + 1));
		}
		else if(smallestMultipleIndex === 1) {

			// If the smallest is in queue5, remove it and add 5*M and 7*M in the corresponding queues (no need to add 3*M, it was already processed)
			this.queue5.remove();
			this.queue5.add(newMultiple(smallestMultiple.a, smallestMultiple.b + 1, smallestMultiple.c));
			this.queue7.add(newMultiple(smallestMultiple.a, smallestMultiple.b, smallestMultiple.c + 1));
		}
		else {

			// If the smallest is in queue7, remove it and add 7*M in the corresponding queue (no need to add 3*M and 5*M, they were already processed)
			this.queue7.remove();
			this.queue7.add(newMultiple(smallestMultiple.a, smallestMultiple.b, smallestMultiple.c + 1));
		}

		return smallestMultiple;
	}
}

let generator = new MultipleGenerator();
let lastK = 0;

/**
 * Finds the k-th number such that the only prime factors are 3, 5, and 7.
 * Note that 3, 5, and 7 do not have to be factors, but it should not have any other prime factors.
 * For example, the first several multiples would be (in order) 1, 3, 5, 7, 9, 15, 21.
 * T = O(k) for a generic k, O(1) if called after computing k-1
 * S = O(f)
 * where f is a factor that increases when k increases (number of candidates in all queues), but f << k (e.g. k = 100000 -> f = 4629)
 * @param k the requested k
 * @returns the k-th multiple
 */
export const kthMultipleV3 = (k: number): Multiple => {

	if(k <= 0) {

		throw Error('k must start at 1');
	}

	// If the requested k is before the last k, reset everything (if needed, this could probably be handled better by backtracking/caching the generator)
	if(k <= lastK) {

		generator = new MultipleGenerator();
	}

	// Generate numbers until we get to k
	let kthMultiple;
	for(let i = lastK; i < k; i++) {

		kthMultiple = generator.generate();
	}
	if(kthMultiple === undefined) {

		throw Error('I should always have a k-th multiple...!');
	}

	lastK = k;

	return kthMultiple;
};

