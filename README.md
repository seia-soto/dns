# Xstl encrypted DNS

[한국어](/README.ko.md)

A DNS for lightweight privacy enhancement. [(Updates)](/updates/index.md)

| Type | Address                     | Upstream                             | Host                               |
|------|-----------------------------|--------------------------------------|------------------------------------|
| DoT  | tls://dns.seia.io           | CloudFlare DNS                       | SK Broadband, South Korea          |
| DoT  | tls://secondary.dns.seia.io | CloudFlare DNS                       | Oracle Cloud Platform, South Korea |

**Features**

- Lightweight privacy enhancement by reducting ads, trackers, and malwares host.
- Upstream server is CloudFlare which is Super-fast and fair.
- Privacy first logging policy doesn't contain any personal information.

**Installation**

- iOS (14 or higher)
  - GitHub: [https://get.dns.seia.io/config/xstl-tls.mobileconfig](https://get.dns.seia.io/config/xstl-tls.mobileconfig)

You can connect all servers via `tls://dns.seia.io`.

## Notes

Things you need to know before applying this DNS.

### Encrypted DNS

Encrypted DNS offers you a chance to hide your exposed paths on web from ISP(Internet Service Provider) or upstream network managers since the common DNS packet is pure text.
There are two typical types of common encrypted DNS services: DoT(DNS over TLS, port 853) and DoH(DNS over Https, port 443), and both works when the connection established over valid certificate.

I provide DoT service for lower overhead.

### DNS and Internet

Internet is the place we spend every second.
So if your internet lost connection, you might panic, and the cause can be DNS.
What DNS does is connecting the dots from IP address behind the domain names you type on your web browser like google-dot-com.
So when the DNS service broken, the connections being lost on your device.
Therefore you cannot use the internet properly without DNS service.
However, I am hosting the server from my home and it's fact that the service is less stable than services hosted on datacenters.
So if you apply this DNS, you might get excluded from internet society sometimes.

### Why

Here's the reasons:

- If you concern the extra bettery consumption while using filtering applications like AdGuard.
- If you want to apply the basic level tracking reduction and safety to devices cannot install ad blockers.
- If you feel similar services or AdGuard DNS is slow or requires only lightweight system-wide ad blocking.
- If you need to query the same domain name in high rate but concerns rate limit.
- If you feel you're tracked by typical services.

As you expect:

+ Applying encrypted DNS is supported by system side on iOS.
+ I do apply filters to the DNS server.
+ The server is located on Suwon-si, South Korea.
+ I do not rate-limit your request.
+ I don't log your personal information like IP address by placing the server behind virtual bridge interface.

**Comments**

- Request larger than or equal to 1750 bytes will be dropped.

### Tracking Reduction

The type of privacy I am applying to the DNS service is TR(Tracking Reduction).
You can see the list of filters I am applying and create an issue to resolve your connection issue.

- [Two types of privacy by Rohan Kumar](https://seirdy.one/posts/2022/06/25/two-types-of-privacy/)

**Comments**

- Every filters are refreshed every 5 minutes.
- The changes can be delayed up to 10 minutes on the server-side and the delay can be longer on client-side by caching preference.

#### Blocklist

Please, see [blocklist.txt](/blocklist.txt) for internal blocklist file applied to my serivce.
The followings are filters loaded on my service:

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
