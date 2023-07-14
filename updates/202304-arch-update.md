# [Xstl encrypted DNS](/)

[한국어](/202304-arch-update.ko.md)

---

# Feb 2023, Arch update

This is DNS operation team.
First, thank you for using the Xstl encrypted DNS on your devices for about a year.

We've updated the processing arch based on Systemd (System Daemon) instead of Docker to simplify the layers.
There's nothing for you to do with this.

Also, this update is already applied under the water.

## Growth report

We're happy to introduce a growth of our system too.
The usage reports are collected via syslog with network level privacy sensitive redaction: We place an internal bridge before the actual server to hide IP address.

- Hits: 248k/daily average
- Sysload: 0.42/10m average

It's about 10x growth compared to the time we started the service.

## Examining the DoH (DNS-over-HTTPS) support

Also, we're examining the DoH support to improve privacy on Windows systems.
Since DoT is lighter than DoH, we'll prepare a lot more before supporting other protocols rather than DoT.

We're not going to fix the support date, but we're here to notify that we're planning.

Thank you all again for using the service.
