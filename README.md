# Xstl encrypted DNS

[한국어](/README.ko.md)

Xstl DNS is public DNS service enhances the privacy level with minimal overhead in the common use. [(Updates)](/updates/index.md)

| Type               | Address                     | Upstream                             | Host                               |
|--------------------|-----------------------------|--------------------------------------|------------------------------------|
| DoP, DoT, DoH (h3) | tls://dns.seia.io           | CloudFlare DNS                       | SK Broadband, South Korea          |
| DoT, DoT, DoH (h3) | tls://secondary.dns.seia.io | CloudFlare DNS                       | Oracle Cloud Platform, South Korea |

**Features**

- Block hosts serves ads or trackers
- Use CloudFlare as upstream DNS
- DO NOT log any personal information by logging policy

**Installation**

> If you're using the profile distributed before Oct 2023, you should update your profile by removing and reinstalling.

- Apple Devices (iOS 14 or higher)
  - DoT: [https://get.dns.seia.io/config/xstl-tls.mobileconfig](https://get.dns.seia.io/config/xstl-tls.mobileconfig)
  - DoH (Secondary DNS not supported): [https://get.dns.seia.io/config/xstl-https.mobileconfig](https://get.dns.seia.io/config/xstl-https.mobileconfig)
- Android Devices
  - Set privacy DNS value to `dns.seia.io` in Network Settings.
- Other devices (or unencrypted DNS)
  - Set primary DNS value to `116.121.57.111`.
  - Set secondary DNS value to `140.238.14.191`.

You can connect all servers via `tls://dns.seia.io` or `https://dns.seia.io`.

## Notes

There are things that you need to know before applying the DNS to your device.

### Encrypted DNS

Encrypted DNS hides its queries from Internet Service Providers by wrapping the packet using TLS tunnel or TLS-like protocol.
There are two ways to provide encrypted DNS typically.

> DoT(DNS over TLS, port 853) and DoH(DNS over Https, port 443), and both works when the connection established over valid certificate.

I provide DoT service to minimize the overhead.

### DNS and Internet

DNS can be the failure point when internet disconnects temporarilly.
DNS server works as a phone book by linking the website address and real IP address.
So the outage of DNS server make the use of Internet unable.

### Why

Xstl DNS can be a better alternative if you're already using the service from AdGuard or third-party ad blockers.

- If you concern the extra bettery consumption while using the DNS filtering applications like AdGuard.
- If you want to apply system-wide ad blocking.
- If you feel the AdGuard DNS and typical DNS services are slow in Korea or you concern about being rate limited

Our DNS doesn't collect users' IP address when logging.
All instances are running behind of virtual bridge interface and the bridge is not forwarding any user information.

**Comments**

- Request larger than or equal to 1750 bytes will be dropped.

### Tracking Reduction

The type of privacy applied on this DNS service is TR.

- [Two types of privacy by Rohan Kumar](https://seirdy.one/posts/2022/06/25/two-types-of-privacy/)

**Comments**

- Every filters are refreshed every 1 hour.

#### Blocklist

See [blocklist.txt](/blocklist.txt) for blocklist file applied to my serivce.

```bash
# priority
"https://get.dns.seia.io/blocklist.txt"
"https://raw.githubusercontent.com/yous/YousList/master/hosts.txt"

# suspicious
"https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt"
"https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts"
"https://v.firebog.net/hosts/static/w3kbl.txt"
"https://raw.githubusercontent.com/matomo-org/referrer-spam-blacklist/master/spammers.txt"
"https://someonewhocares.org/hosts/zero/hosts"
"https://raw.githubusercontent.com/VeleSila/yhosts/master/hosts"
"https://winhelp2002.mvps.org/hosts.txt"
"https://v.firebog.net/hosts/neohostsbasic.txt"
"https://raw.githubusercontent.com/RooneyMcNibNug/pihole-stuff/master/SNAFU.txt"
"https://paulgb.github.io/BarbBlock/blacklists/hosts-file.txt"

# advertising
"https://adaway.org/hosts.txt"
"https://v.firebog.net/hosts/AdguardDNS.txt"
"https://v.firebog.net/hosts/Admiral.txt"
"https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt"
"https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt"
"https://v.firebog.net/hosts/Easylist.txt"
"https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext"
"https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts"
"https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts"
"https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts"

# tracking
"https://v.firebog.net/hosts/Easyprivacy.txt"
"https://v.firebog.net/hosts/Prigent-Ads.txt"
"https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts"
"https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt"
"https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt"
"https://hostfiles.frogeye.fr/multiparty-trackers-hosts.txt"
"https://www.github.developerdan.com/hosts/lists/ads-and-tracking-extended.txt"
"https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/android-tracking.txt"
"https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV.txt"
"https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/AmazonFireTV.txt"
"https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-blocklist.txt"

# malicious
"https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt"
"https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt"
"https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt"
"https://v.firebog.net/hosts/Prigent-Crypto.txt"
"https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts"
"https://bitbucket.org/ethanr/dns-blacklists/raw/8575c9f96e5b4a1308f2f12394abd86d0927a4a0/bad_lists/Mandiant_APT1_Report_Appendix_D.txt"
"https://phishing.army/download/phishing_army_blocklist_extended.txt"
"https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt"
"https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt"
"https://raw.githubusercontent.com/Te-k/stalkerware-indicators/master/generated/hosts"
"https://urlhaus.abuse.ch/downloads/hostfile/"

# other
"https://zerodot1.gitlab.io/CoinBlockerLists/hosts_browser"
```

#### Allowlist

Some domain names are allowed forcibly by default to avoid incorrect blocking:

- t.ly
- bit.ly
- t.co
- ow.ly
- s.shopify.com
- cdn.optimizely.com
- tinyurl.com
- github.com
- algolia.com
- aluigi.altervista.org
- media.discordapp.net

#### Exceptions

Some domain names are loaded from Google DNS (8.8.8.8) to avoid service breakage with CloudFlare DNS (1.1.1.1):

- hyundaicard.com
