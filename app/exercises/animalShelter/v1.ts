import { Queue, SimpleQueue } from '../../data-structures/queue';

export type AnimalType = 'CAT' | 'DOG';

export class Animal {

	public type: AnimalType;
	public name: string;

	public constructor(type: AnimalType, name: string) {

		this.type = type;
		this.name = name;
	}

	public toString(): string {

		return `[${this.type} ${this.name}]`;
	}
}

class AnimalShelterQueueData {

	public animal: Animal;
	public dateAdded: Date;

	public constructor(animal: Animal, dateAdded: Date) {

		this.animal = animal;
		this.dateAdded = dateAdded;
	}

	public toString(): string {

		return `${this.animal}`;
	}
}

export class AnimalShelter {

	private readonly queuesMap: {[key: string]: Queue<AnimalShelterQueueData>} = {};

	/**
	 * Adds an animal to the shelter
	 * T = O(1)
	 * S = O(1)
	 * @param animal the animal to add
	 */
	public enqueue(animal: Animal): void {

		// Get the queue for the given animal and add it
		let queue = this.queuesMap[animal.type];
		if(!queue) {
			
			queue = new SimpleQueue<AnimalShelterQueueData>();
			this.queuesMap[animal.type] = queue;
		}
		queue.add(new AnimalShelterQueueData(animal, new Date()));
	}

	/**
	 * Removes from the shelter the oldest animal of any type
	 * T = O(1)
	 * S = O(1)
	 * @returns the oldest animal of any type
	 */
	public dequeueAny(): Animal {

		// Loop all animal queues and get the one with the oldest element
		let oldestDateAdded;
		let oldestQueue;
		for(const type of Object.keys(this.queuesMap)) {

			const queue = this.queuesMap[type];
			if(!queue.isEmpty() && (!oldestDateAdded || oldestDateAdded > queue.peek().dateAdded)) {

				oldestDateAdded = queue.peek().dateAdded;
				oldestQueue = queue;
			}
		}

		// Return the last element in the oldest queue
		if(oldestQueue) {

			return oldestQueue.remove().animal;
		}
		else {

			throw Error('Animal Shelter is empty');
		}
	}

	/**
	 * Removes from the shelter the oldest animal of the given type
	 * T = O(1)
	 * S = O(1)
	 * @param type the animal type
	 * @returns the oldest animal of the given type
	 */
	public dequeueAnimal(type: AnimalType): Animal {

		// Simply get the queue linked with the given type and return the oldest element
		const queue = this.queuesMap[type];
		if(queue && !queue.isEmpty()) {

			return queue.remove().animal;
		}
		else {

			throw Error(`Animal Shelter does not have any ${type}`);
		}
	}

	/**
	 * Prints the animal shelter as a string
	 * @returns the string representation
	 */
	public toString(): string {

		const result = [];
		for(const type of Object.keys(this.queuesMap)) {

			const queue = this.queuesMap[type];
			result.push(`${type}: ${queue.toString()}`);
		}
		return result.join('; ');
	}
}
