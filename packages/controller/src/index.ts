import {writeFile} from 'fs/promises';
import {convert} from './converter/index.js';
import {useFilterList} from './fetcher/index.js';
import {subscriptions} from './subscriptions.js';

const main = async () => {
	console.time('*main');

	const allowed = new Set<string>();
	const blocked = new Set<string>();

	for (const subscription of subscriptions) {
		console.time(subscription.name);
		console.time(subscription.name + ':acquire');

		const filterList = await useFilterList(subscription);

		console.timeEnd(subscription.name + ':acquire');
		console.time(subscription.name + ':parse');

		const result = convert(filterList.content);

		console.log(`> found ${result.blocked.size} domain entries from ${subscription.name}`);

		console.timeEnd(subscription.name + ':parse');
		console.time(subscription.name + ':merge');

		for (const one of result.allowed) {
			allowed.add(one);
		}

		for (const one of result.blocked) {
			if (!allowed.has(one)) {
				blocked.add(one);
			}
		}

		console.timeEnd(subscription.name + ':merge');
		console.timeEnd(subscription.name);
	}

	allowed.clear();

	console.log(`> found total ${blocked.size} domain entries from ${subscriptions.length} filters and host files`);
	console.time('*build');

	const hosts = Array.from(blocked)
		.map(line => '127.0.0.1 ' + line)
		.join('\n');

	console.timeEnd('*build');

	await writeFile('./data/hosts.txt', hosts, 'utf8');

	console.timeEnd('*main');
};

void main();
