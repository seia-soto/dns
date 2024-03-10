import {createReadStream, createWriteStream, existsSync} from 'fs';
import {mkdir, stat} from 'fs/promises';
import path from 'path';
import {
	type FilterListHookOnBeforeFetch, type FilterListHook, type FilterListHookOnInitialised, type FilterListHookOnAfterFetch, type FilterListHookOnError,
} from '../index.js';

const handleInitialised: FilterListHookOnInitialised = async context => {
	// Check the cached file
	const cacheDirPath = './data/cache';
	const cachePath = path.join(cacheDirPath, context.metadata.name);

	context.__cache = {
		path: cachePath,
	};

	// Create a directory
	if (
		!existsSync(cacheDirPath)
		|| !(await stat(cacheDirPath)).isDirectory()
	) {
		await mkdir(cacheDirPath, {recursive: true});
	}

	// Create a file
	if (!existsSync(cachePath)) {
		// Request is required, don't break the process
		return false;
	}

	const cacheInfo = await stat(cachePath);

	if (!cacheInfo.isFile()) {
		return false;
	}

	context.__cache.changedAt = cacheInfo.ctimeMs;

	// Read the length of etag header
	let chunks: Uint8Array[] = [];

	for await (const chunk of createReadStream(cachePath, {start: 0, end: 4})) {
		chunks.push(chunk as Uint8Array);
	}

	const length = Buffer.concat(chunks).readUint32LE();

	// Read the eTag header of this file
	chunks = [];

	for await (const chunk of createReadStream(cachePath, {start: 4, end: 4 + length})) {
		chunks.push(chunk as Uint8Array);
	}

	let etag = '';

	for (let bytes = Buffer.concat(chunks), i = 0, l = length; i < l; i++) {
		etag += String.fromCharCode(bytes.readUintLE(i, 1));
	}

	context.__cache.etag = etag;

	return false;
};

const handleBeforeFetch: FilterListHookOnBeforeFetch = async (context, options) => {
	if (!context.__cache!.etag) {
		return;
	}

	options.headers['if-none-match'] = context.__cache!.etag;
};

const handleAfterFetch: FilterListHookOnAfterFetch = async (context, response, retryWithMergedOptions) => {
	if (response.statusCode === 200 && response.headers.etag) {
		const outbound = createWriteStream(context.__cache!.path);

		const header = Buffer.alloc(4 + response.headers.etag.length);

		header.writeUint32LE(response.headers.etag.length);

		for (let i = 0; i < response.headers.etag.length; i++) {
			header.writeUintLE(response.headers.etag.charCodeAt(i), 4 + i, 1);
		}

		outbound.write(header);
		outbound.write(response.body);
		outbound.end();

		return response;
	}

	if (response.statusCode !== 304) {
		return response;
	}

	console.log(`> reusing the cache for ${context.metadata.name} (response.status === 304)`);

	// Construct new response based on the cache
	const chunks: Uint8Array[] = [];

	for await (const chunk of createReadStream(context.__cache!.path, {start: 4 + context.__cache!.etag!.length})) {
		chunks.push(chunk as Uint8Array);
	}

	response.rawBody = Buffer.concat(chunks);
	response.body = response.rawBody.toString('utf8');

	return response;
};

const handleError: FilterListHookOnError = async (context, error) => {
	if (!context.__cache?.changedAt) {
		return;
	}

	const start = context.__cache.etag
		? context.__cache.etag.length + 4
		: 4;

	const chunks: Uint8Array[] = [];

	for await (const chunk of createReadStream(context.__cache.path, {start})) {
		chunks.push(chunk as Uint8Array);
	}

	return Buffer.concat(chunks).toString('utf8');
};

export const useCache: Partial<FilterListHook> = {
	handleInitialised,
	handleBeforeFetch,
	handleAfterFetch,
	handleError,
};
