# Xstl encrypted DNS

[English](/README.md)

가벼운 개인정보 보호 향상을 위한 DNS. [(업데이트 내역)](/updates/index.md)

| Type | Address                     | Upstream                             | Host                               |
|------|-----------------------------|--------------------------------------|------------------------------------|
| DoT  | tls://dns.seia.io           | CloudFlare DNS with Malware blocking | SK Broadband, South Korea          |
| DoT  | tls://secondary.dns.seia.io | CloudFlare DNS with Malware blocking | Oracle Cloud Platform, South Korea |

**기능**

- 광고, 추적기와 악성 소프트웨어 호스트를 차단하여 가볍게 개인정보 보호 수준을 향상합니다.
- 상위 서버는 굉장히 빠르고 공정한 CloudFlare입니다.
- 개인정보 보호에 우선하여 기록 정책 상 아무 개인 정보를 포함하지 않습니다.

**설치**

- iOS (14 또는 이상)
  - 내부: [https://private-statics.seia.io/dns/xstl-tls.mobileconfig](https://private-statics.seia.io/dns/xstl-tls.mobileconfig)
  - GitHub: [https://get.dns.seia.io/config/xstl-tls.mobileconfig](https://get.dns.seia.io/config/xstl-tls.mobileconfig)

모든 서버는 `tls://dns.seia.io`로 연결할 수 있습니다.

## Notes

이 DNS를 적용하기 전 알아야 할 사항들입니다.

### Encrypted DNS

암호화된 DNS는 평문인 DNS 패킷으로 인해 노출된 웹 상의 여러분의 경로를 ISP(인터넷 서비스 제공자)나 상위 네트워크 관리자들에게서 숨길 기회를 제공합니다.
흔히 암호화된 DNS 서비스라고 불리는 것에는 2가지가 있습니다.

> DoT(TLS 상 DNS, 853 포트)와 DoH(Https 상 DNS, 443 포트)이며 모두 올바른 인증서 위에 수립된 연결에서만 작동합니다.

저는 경량화를 위해 DoT 서비스를 제공합니다.

### DNS and Internet

인터넷은 저희가 매초를 보내는 장소입니다.
그래서 인터넷 연결이 끊어지면 아마 당황하실테며 그 원인이 DNS일 수도 있습니다.
DNS가 하는 것은 IP 주소와 여러분이 웹 브라우저에 google-dot-com과 같이 입력하는 도메인 이름 사이를 연결하는 것입니다.
그래서 DNS 서비스가 망가지면 이 연결점들이 여러분의 기기에서 사라집니다.
이렇게 되면 DNS 서비스없이는 인터넷을 정상적으로 사용할 수 없게 됩니다.
그러나 저는 서버를 집에서 돌리고 있으며 여타 데이터센터에서 돌아가는 서비스들보다는 덜 안정적이라는 점은 사실입니다.
그래서 이 DNS를 적용하면 타사 대비 안정성이 떨어져 인터넷 사회로부터 제외될 수 있습니다.

### Why

여기 제 DNS를 사용해야 할 이유가 있습니다.

- AdGuard와 같은 필터링 애플리케이션을 사용하며 배터리 걱정이 되시는 경우.
- 기초 수준의 추적 보호와 안전을 광고 차단기 설치가 불가능한 기기에 적용하고 싶어하시는 경우.
- 비슷한 서비스 혹은 AdGuard DNS가 느리거나 경량의 시스템 전반 광고 차단이 필요한 경우.
- 같은 도메인 이름을 빠르게 조회해야 하지만 속도 제한이 걱정되시는 경우.
- 전형적인 서비스들로부터 추적당하신다고 느끼시는 경우.

예상하셨듯이 다음 사항이 제공됩니다.

+ 암호화된 DNS를 적용하는 것은 iOS의 시스템 상에서 제공됩니다.
+ DNS 서버에는 필터가 적용됩니다.
+ 서버는 대한민국 수원시에 위치해 있습니다.
+ 여러분의 요청을 속도 제한하지 않습니다.
+ 서버를 가상 브릿지 인터페이스 뒤에 두어 IP주소와 같은 개인정보를 수집하지 않습니다.

**참고**

- 1750 바이트이거나 이상의 요청은 처리되지 않을 것입니다.

### Tracking Reduction

제 DNS 서비스에 적용하고 있는 개인정보 보호책은 TR(추적 보호)입니다.
적용하고 있는 필터 리스트를 볼 수 있으며 연결 상 문제가 있으시면 이슈를 생성해주세요.

- [Rohan Kumar님이 작성한 두 가지 종류의 개인정보 보호 (영문)](https://seirdy.one/posts/2022/06/25/two-types-of-privacy/)

**참고**

- 모든 필터는 5분마다 새로이 됩니다.
- 모든 변경 사항은 서버 상 최대 10분까지 지연될 수 있으며 클라이언트 상에서는 캐싱 설정에 따라 지연이 더 길어질 수 있습니다.

#### Blocklist

내부적으로 제 서비스에 등록된 차단 목록에 관해서는 [blocklist.txt](/blocklist.txt)를 확인해주세요.
제 서비스에 등록된 필터들입니다.

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

몇몇 도메인 이름은 오차단을 피하기 위해 강제로 허용되었습니다.

- t.ly
- bit.ly
- t.co
- ow.ly
- s.shopify.com
- cdn.optimizely.com
- tinyurl.com
- github.com
