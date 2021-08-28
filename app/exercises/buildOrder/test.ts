import { ProjectBuildV1 } from './v1';
import { ProjectBuildV2 } from './v2';
import { ProjectBuildV3 } from './v3';

const tests: {proj: string[], deps: string[][]}[] = [
	{ proj: [], deps: [] },
	{ proj: [ 'a' ], deps: [] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'b', 'a' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'd', 'd' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'b', 'e' ], [ 'e', 'b' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'b', 'e' ], [ 'x', 'b' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'b', 'e' ], [ 'e', 'x' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f' ], deps: [[ 'a', 'd' ], [ 'f', 'b' ], [ 'b', 'd' ], [ 'f', 'a' ], [ 'd', 'c' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ], deps: [[ 'a', 'd' ], [ 'f', 'b' ], [ 'b', 'd' ], [ 'f', 'a' ], [ 'd', 'c' ], [ 'e', 'b' ], [ 'e', 'c' ], [ 'g', 'a' ], [ 'h', 'g' ], [ 'i', 'h' ], [ 'i', 'j' ], [ 'j', 'k' ], [ 'j', 'd' ]] },
	{ proj: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ], deps: [[ 'a', 'd' ], [ 'f', 'b' ], [ 'b', 'd' ], [ 'f', 'a' ], [ 'd', 'c' ], [ 'e', 'b' ], [ 'e', 'c' ], [ 'g', 'a' ], [ 'h', 'g' ], [ 'i', 'h' ], [ 'i', 'j' ], [ 'j', 'k' ], [ 'j', 'd' ], [ 'c', 'j' ]] }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	try {

		const buildOrder = new ProjectBuildV1(test.proj, test.deps).getBuildOrder();
		console.log(`'${test.proj}' + '${test.deps}' -----> ${buildOrder}`);
	}
	catch(err) {

		console.log(`'${test.proj}' + '${test.deps}' -----> ${err}`);
	}
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	try {

		const buildOrder = new ProjectBuildV2(test.proj, test.deps).getBuildOrder();
		console.log(`'${test.proj}' + '${test.deps}' -----> ${buildOrder}`);
	}
	catch(err) {

		console.log(`'${test.proj}' + '${test.deps}' -----> ${err}`);
	}
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	try {

		const buildOrder = new ProjectBuildV3(test.proj, test.deps).getBuildOrder();
		console.log(`'${test.proj}' + '${test.deps}' -----> ${buildOrder}`);
	}
	catch(err) {

		console.log(`'${test.proj}' + '${test.deps}' -----> ${err}`);
	}
}
