# [Xstl encrypted DNS](/)

[한국어](/202208-secondary-dns.ko.md)

---

# Introducing secondary DNS

Hello! It's very thankful to announce good news to you after about a month of service operation.
Not that fancy news but I am here to announce that Xstl DNS will support the secondary DNS via the instance running on Oracle CloudPlatform on September, 2022.
So I am happy to announce, stability, the critical disadvantage, is now improved under expertised cloud operation for better service.

## Reasons

Xstl DNS has ran on personal server about a month without service downtime, from 2022. 7. 28 to 2022. 8. 24, processing about 3.8M requests.
First of all, I am appreciated as there are more users than I expected.
However, I couldn't ensure you a permanent uptime without rebooting as the host was running on personal server.
Most importantly, it would be really terrible if the host computer is down as the server goes under maintenence.

Also, the lack of system to check the status of power or service led me to feel this as more critical problem.
And the last week of this month, due to the reapplication of thermal compound and replacing disks, I was required to create an alternative to serve the service without downtime.
As a result, the secondary DNS was the most powerful solution as an alternative in this situation.
Also, There was nothing to do from client-side as the client would fallback in both primary and secondary DNS.

## Schedules and changes

Currently, the DNS server is running on OCP temporarily using same LE certificate while the secondary DNS isn't deployed officially.
It's possible as I initially deployed DNS via DNS address not the IP address.
Also, you don't need to worry about the quality of service as the automatic renewal process of certificate and blocklist is working well.
I checked the latency about an hour, but did not found any meaningful changes from previous values, min 14ms to max 110ms(without cache).

As user, there is nothing to do right now.
`tls://dns.seia.io` address will be used continuously.

But the secondary DNS will be deployed during September, 2022 reducing the side-effect to the end-user due to personal problem.
Also, after the completion of the deployment, new `mobileconfig` file will be served including secondary DNS address.
New file will be served at the same time when the main page(README.md) of `https://get.dns.seia.io` adds OCP server.
For existing users, if possible, I am planning to change DNS connection address dynamically to prevent hassle works.
However, it's recommended to reinstall the new profile as you see the new version released to minimize the connection and stability issues.

I'll tell you via website when there is another breaking changes happen.
I hope you see again with good news later.
Thank you.
