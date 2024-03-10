import test from 'ava';
import {convert} from './index.js';

const empty = new Set<string>();

test('hosts conversion', t => {
	t.deepEqual(
		convert('domain.tld'),
		{
			allowed: empty,
			blocked: new Set(['domain.tld']),
		},
		'converts simple form of domain',
	);

	t.deepEqual(
		convert('0.0.0.0 domain.tld'),
		{
			allowed: empty,
			blocked: new Set(['domain.tld']),
		},
		'converts hosts format',
	);

	t.deepEqual(
		convert('domain.tld 0.0.0.0'),
		{
			allowed: empty,
			blocked: new Set(['domain.tld']),
		},
		'converts reversed hosts format',
	);
});

test('filters conversion', t => {
	t.deepEqual(
		convert('||domain.tld'),
		{
			allowed: empty,
			blocked: new Set(['domain.tld']),
		},
		'converts simple form of filter',
	);

	t.deepEqual(
		convert('||domain.tld^'),
		{
			allowed: empty,
			blocked: new Set(['domain.tld']),
		},
		'converts network filter with right anchor',
	);

	t.deepEqual(
		convert('||domain.tld$3p'),
		{
			allowed: empty,
			blocked: empty,
		},
		'converts network filter with an option',
	);

	t.deepEqual(
		convert(`||domain.tld
!#if a
@@||domain.tld
!#endif`),
		{
			allowed: new Set(['domain.tld']),
			blocked: empty,
		},
		'disables network filter regardless of a condition',
	);
});
