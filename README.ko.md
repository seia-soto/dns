# Xstl encrypted DNS

[English](/README.md)

Xstl DNS는 평소 사용에 최소한의 오버헤드로 개인정보 보호 수준을 향상할 수 있는 공개 DNS 서비스입니다. [(업데이트 내역)](/updates/index.md)

| Type                | Address                     | Upstream                             | Host                               |
|---------------------|-----------------------------|--------------------------------------|------------------------------------|
| Do53, DoT, DoH (h3) | tls://dns.seia.io           | CloudFlare DNS                       | SK Broadband, South Korea          |
| Do53, DoT, DoH (h3) | tls://secondary.dns.seia.io | CloudFlare DNS                       | Oracle Cloud Platform, South Korea |

**특징**

- 광고나 트래커를 제공하는 호스트를 차단합니다.
- 업스트림 DNS로 CloudFlare를 사용 중입니다.
- 개인정보 보호에 우선하여 기록 정책 상 아무 개인 정보를 포함하지 않습니다.

**설치**

> Apple 기기에서 2023년 10월 전에 배포된 프로파일을 사용하고 계시다면 기존 프로파일을 제거 후 재설치해야 합니다.

- Apple 기기 (iOS 14 이상)
  - DoT: [https://get.dns.seia.io/config/xstl-tls.mobileconfig](https://get.dns.seia.io/config/xstl-tls.mobileconfig)
  - DoH: [https://get.dns.seia.io/config/xstl-https.mobileconfig](https://get.dns.seia.io/config/xstl-https.mobileconfig)
  - DoP (전역 설정을 위한 평문 DNS): `sudo networksetup -setdnsservers Wi-Fi 116.121.57.111 140.238.14.191`와 `sudo networksetup -setdnsservers Wi-Fi empty`로 전환
- Android 기기
  - 네트워크 설정에서 보안 DNS를 `dns.seia.io`로 설정하세요.
- 다른 기기 (혹은 보안 연결없는 DNS)
  - 주 DNS 값을 `116.121.57.111`로 설정하세요.
  - 보조 DNS 값을 `140.238.14.191`로 설정하세요.

모든 서버는 `tls://dns.seia.io`로 연결할 수 있습니다.

## Notes

DNS를 기기에 적용하기 전 반드시 아래 사항을 읽어주십시오.

### Encrypted DNS

암호화 DNS는 평문으로 전달되던 기존 DNS 패킷 대신 TLS 터널 혹은 그에 준하는 프로토콜로 패킷을 감싸 인터넷 서비스 제공자에게서 DNS 쿼리를 숨깁니다.
흔히 암호화 DNS를 제공하는 방식에는 2가지가 있습니다.

> DoT(TLS 상 DNS, 853 포트)와 DoH(Https 상 DNS, 443 포트)이며 모두 올바른 인증서 위에 수립된 연결에서만 작동합니다.

현재 Xstl DNS는 오버헤드를 최소화하기 위해 DoT 프로토콜만 사용하고 있습니다.

### DNS and Internet

일시적으로 인터넷이 끊어질 수 있는 사유로 DNS가 해당 될 수 있습니다.
DNS 서버는 웹 브라우저에 입력하는 웹 사이트 주소와 실제 IP 주소를 연결해주는 전화번호부와 같은 역할을 합니다.
그래서 DNS 서버의 작동이 중지하면 정상적인 인터넷 사용이 불가능해집니다.

Xstl DNS는 안정적인 서비스를 제공하기 위해 최선을 다하고 있습니다.
하지만 여건적으로 Google이나 CloudFlare에 비해 낮은 안정성을 가집니다.
인터넷 연결이 조금이라도 끊겨 큰 손해를 볼 수 있는 기기에서는 적용을 피해주십시오.

### Why

이미 AdGuard나 서드파티 광고 차단기에서 제공하거나 그에 준하는 서비스를 사용하시는 경우 Xstl DNS는 좋은 대안이 될 수 있습니다.

- AdGuard와 같은 DNS 필터링 애플리케이션이 기기 배터리나 성능에 주는 부담이 크시다 생각되시는 경우
- 시스템 전역으로 기초적인 광고 차단을 적용시키고 싶으신 경우
- AdGuard DNS나 여타 DNS 서비스가 한국에서 인터넷 반응 속도를 저하시킨다고 느끼시거나 속도 제한 등이 걱정되시는 경우

그 외에 저희 DNS는 로그를 남길 때 사용자의 IP를 수집하고 있지 않습니다.
모든 인스턴스는 가상 브릿지 인터페이스 뒤에서 실행되며 브릿지에서 DNS 서버로 그 어떤 사용자 정보도 전달하고 있지 않습니다.

**참고**

- 1750 바이트이거나 이상의 요청은 처리되지 않습니다.

### Tracking Reduction

현재 DNS 서비스에 개인정보 보호 대책은 TR 형태로 적용되고 있습니다.

- [Rohan Kumar님이 작성한 두 가지 종류의 개인정보 보호 (영문)](https://seirdy.one/posts/2022/06/25/two-types-of-privacy/)

**참고**

- 전체 필터는 15분에 한 번 업데이트됩니다.

#### Blocklist

서비스에 등록된 차단 목록에 관해서는 [blocklist.txt](/blocklist.txt)를 확인해주십시오.

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

아래 항목은 자주 사용되는 앱에서 잘못 차단되어 임의로 화이트리스트에 등록되었습니다.

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

아래 항목은 CloudFlare DNS (1.1.1.1)에서 발생하는 문제를 피하기 위해 Google DNS (8.8.8.8)에서 가져옵니다.

- hyundaicard.com
