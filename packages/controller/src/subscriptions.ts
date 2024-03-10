import {type FilterListHook, type FilterList} from './fetcher/index.js';
import {useCache} from './fetcher/features/useCache.js';

const defaultHooks = [
	useCache,
];

export const useDefaultHooks = (hooks: FilterListHook[] = []) => ([
	...defaultHooks,
	...hooks,
]);

export const subscriptions: FilterList[] = [
	// Priority
	{
		name: 'yous-youslist',
		url: 'https://raw.githubusercontent.com/yous/YousList/master/hosts.txt',
		hooks: useDefaultHooks(),
	},

	// Suspicious
	{
		name: 'polishfiltersteam-kadhosts',
		url: 'https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'firebog-w3kbl',
		url: 'https://v.firebog.net/hosts/static/w3kbl.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'firebog-neohostsbasic',
		url: 'https://v.firebog.net/hosts/neohostsbasic.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'matomo-org-referrer-spam-blacklist',
		url: 'https://raw.githubusercontent.com/matomo-org/referrer-spam-blacklist/master/spammers.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'someonewhocares-zero',
		url: 'https://someonewhocares.org/hosts/zero/hosts',
		hooks: useDefaultHooks(),
	},
	{
		name: 'velesila-yhosts',
		url: 'https://raw.githubusercontent.com/VeleSila/yhosts/master/hosts',
		hooks: useDefaultHooks(),
	},
	{
		name: 'mvps-winhelp2002-hosts',
		url: 'https://winhelp2002.mvps.org/hosts.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'rooneymcnibnug-snafu',
		url: 'https://raw.githubusercontent.com/RooneyMcNibNug/pihole-stuff/master/SNAFU.txt',
		hooks: useDefaultHooks(),
	},

	// Advertising
	{
		name: 'adaway-hosts',
		url: 'https://adaway.org/hosts.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'firebog-adguarddns',
		url: 'https://v.firebog.net/hosts/AdguardDNS.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'firebog-admiral',
		url: 'https://v.firebog.net/hosts/Admiral.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'anudeepnd-blacklist',
		url: 'https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'disconnect-simplead',
		url: 'https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'pgl-adservers',
		url: 'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext',
		hooks: useDefaultHooks(),
	},
	{
		name: 'fademind-uncheckyads',
		url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts',
		hooks: useDefaultHooks(),
	},
	{
		name: 'bigdargon-hostvn',
		url: 'https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts',
		hooks: useDefaultHooks(),
	},
	{
		name: 'jdlingyu-ad-wars',
		url: 'https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts',
		hooks: useDefaultHooks(),
	},

	// Tracking
	{
		name: 'firebog-easyprivacy',
		url: 'https://v.firebog.net/hosts/Easyprivacy.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'firebog-prigent-ads',
		url: 'https://v.firebog.net/hosts/Prigent-Ads.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'windowsspyblocker-spy',
		url: 'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'frogeye-1ptrackers',
		url: 'https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'frogeye-3ptrackers',
		url: 'https://hostfiles.frogeye.fr/multiparty-trackers-hosts.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'dan-adsandtracking',
		url: 'https://www.github.developerdan.com/hosts/lists/ads-and-tracking-extended.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'perflyst-piholeblocklist-androidtracking',
		url: 'https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/android-tracking.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'perflyst-piholeblocklist-smarttv',
		url: 'https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'perflyst-piholeblocklist-amazonfiretv',
		url: 'https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/AmazonFireTV.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'quidsup-notrack',
		url: 'https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-blocklist.txt',
		hooks: useDefaultHooks(),
	},

	// Malicious
	{
		name: 'dandelionsprout-adfilt',
		url: 'https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'digitalside-threats',
		url: 'https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'disconnect-malvertising',
		url: 'https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'firebog-prigentcrypto',
		url: 'https://v.firebog.net/hosts/Prigent-Crypto.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'fademind-risk',
		url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts',
		hooks: useDefaultHooks(),
	},
	{
		name: 'ethanr-badlists',
		url: 'https://bitbucket.org/ethanr/dns-blacklists/raw/8575c9f96e5b4a1308f2f12394abd86d0927a4a0/bad_lists/Mandiant_APT1_Report_Appendix_D.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'phishingarmy-extended',
		url: 'https://phishing.army/download/phishing_army_blocklist_extended.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'quidsup-notrack-malware',
		url: 'https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'spam404',
		url: 'https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt',
		hooks: useDefaultHooks(),
	},
	{
		name: 'tek-stalkerware-indicators',
		url: 'https://raw.githubusercontent.com/Te-k/stalkerware-indicators/master/generated/hosts',
		hooks: useDefaultHooks(),
	},
	{
		name: 'urlhaus',
		url: 'https://urlhaus.abuse.ch/downloads/hostfile/',
		hooks: useDefaultHooks(),
	},

	// Others
	{
		name: 'zerodot-coinblockers',
		url: 'https://zerodot1.gitlab.io/CoinBlockerLists/hosts_browser',
		hooks: useDefaultHooks(),
	},
];
