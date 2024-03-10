export const convert = (lines: string) => {
	const pattern = /^(?:(?:@@)?\|\||\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\s*)?([\w.-]+\.[a-zA-Z]+)(?:\^|\s*\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})?\s*$/gm;
	const allowed = new Set<string>();
	const blocked = new Set<string>();

	// eslint-disable-next-line @typescript-eslint/ban-types
	let match: RegExpExecArray | null = null;

	while ((match = pattern.exec(lines)) !== null) {
		if (match[0].startsWith('@@')) {
			allowed.add(match[1]);
			blocked.delete(match[1]);
		} else if (!allowed.has(match[1])) {
			blocked.add(match[1]);
		}
	}

	return {
		allowed,
		blocked,
	};
};
