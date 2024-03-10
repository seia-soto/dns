import got, {
	type OptionsInit, type Response, type BeforeRequestHook, type Options, type AfterResponseHook,
} from 'got';

const fetcher = got.extend({
	headers: {
		'user-agent': 'seia-soto/dns v0',
	},
});

/**
 * A plugin definition for a filter list
 * This function returns true if fast exit is required
 */
export type FilterListHookOnInitialised = (context: FilterListContext) => boolean | Promise<boolean>;

export type FilterListHookOnBeforeFetch = (context: FilterListContext, options: Options) => void | Promise<void>;

export type FilterListHookOnAfterFetch = (context: FilterListContext, response: Response, retryWithMergedOptions: (options: OptionsInit) => never) => Response | Promise<Response>;

export type FilterListHookOnError = (context: FilterListContext, error: unknown) => void | string | Promise<void | string>;

export type FilterListHook = Partial<{
	handleInitialised: FilterListHookOnInitialised;
	handleBeforeFetch: FilterListHookOnBeforeFetch;
	handleAfterFetch: FilterListHookOnAfterFetch;
	handleError: FilterListHookOnError;
}>;

export type FilterList = {
	name: string;
	url: string;
	hooks?: FilterListHook[];
};

export type FilterListContext = {
	metadata: FilterList;

	content: string;

	__cache?: {
		path: string;
		etag?: string;
		changedAt?: number;
	};
};

export const useFilterList = async (list: FilterList) => {
	const context: FilterListContext = {
		metadata: list,
		content: '',
	};

	// On initialised
	if (list.hooks) {
		for (const hook of list.hooks) {
			if (await hook.handleInitialised?.(context)) {
				return context;
			}
		}
	}

	// On before request
	const beforeRequest: BeforeRequestHook[] = [];

	if (list.hooks) {
		for (const hook of list.hooks) {
			if (hook.handleBeforeFetch) {
				beforeRequest.push(hook.handleBeforeFetch.bind(null, context));
			}
		}
	}

	// On after response
	const afterResponse: AfterResponseHook[] = [];

	if (list.hooks) {
		for (const hook of list.hooks) {
			if (hook.handleAfterFetch) {
				afterResponse.push(hook.handleAfterFetch.bind(null, context));
			}
		}
	}

	const repsonse = await fetcher(list.url, {
		hooks: {
			beforeRequest,
			afterResponse,
		},
	})
		.catch(async error => {
			console.error(context.metadata.name, error);

			if (list.hooks) {
				for (const hook of list.hooks) {
					if (hook.handleError) {
						const alt = await hook.handleError(context, error);

						if (alt) {
							return {body: alt};
						}
					}
				}
			}

			return {
				body: '',
			};
		});

	context.content = repsonse.body;

	return context;
};
