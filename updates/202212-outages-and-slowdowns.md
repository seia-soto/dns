# [Xstl encrypted DNS](/)

[한국어](/202212-outages-and-slowdowns.ko.md)

A DNS for lightweight privacy enhancement.

---

# Dec 2022, Outages and slowdowns

Hello? I am sorry to post about service outages and slowdowns after the launch.
Xstl DNS showed seamless server upgrade after August 2022 update.
However, the environment Xstl DNS lives changed and reported many of service slowdowns after the upgrade.
And now, providing the service is not able and we're redirecting all requests to the secondary DNS due to upstream problem.
I understand that the DNS is really core of the internet operation.
Therefore, I am trying to bring the service via Korean-link up as fast as possible to provide faster internet environment.

## Nov 2022, Slowdown

### Reason

There was seamless server migration in November 2022.
There is nothing specially notable, but the processing time became problematic as the operation environment of DNS moved from SSD to HDD.
Because of it, the case that the normal use of mobile applications wasn't able found, and slowdonw found also on PC environment.

### Schedules and changes

We migrated to SSD environment to solve the problem currently.

## Dec 2022, Outage

In Dec 2022, the problem still exists.
We're investigating the problem and requested the support from the networking team.

### Schedules and changes

We're trying possible solutions such as re-deploying the network devices fast at our end before the support arrives.
However, we indirected all requests to the secondary DNS as the problem still exists.
The requests will go to the primary server as the recovery ends.
The problem is likely to recovered before December 7 2022, as the maximum fix period is expected to 3 days.
