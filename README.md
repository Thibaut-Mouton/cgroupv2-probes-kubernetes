![build status](https://github.com/Thibaut-Mouton/cgroupv2-probes-kubernetes/actions/workflows/npm_module.yml/badge.svg)

# CGROUP V2 METRICS
- npm module for reading [cgroupv2](https://docs.kernel.org/admin-guide/cgroup-v2.html) RAM and CPU metrics.
- Reads from /sys/fs/cgroup/.
- Useful for kubernetes probes : readiness, liveness or prestop, all available since v1.25

## Installation
```
npm install cgroupv2-metrics
```
## Use case

- You can use those metrics to have more control over kubernetes pods :

A pod has a heavy load incoming, and you do not want that pod to be reached by kubernetes internal load-balancer. Since kubernetes does not provide load-balancer over resources consumption, you can use a readiness probe, which check metrics every "x" seconds and trigger the probe if RAM and/or CPU are overloaded. This probe will eject the pod from load-balancer by setting the pod "unavailable". Once consumption will decrease to an acceptable level, probe trigger will stop and the pod will be available from load-balancer again. 
- Check ```examples``` folder to see how k8s probes can be implemented

## Read values from cgroup v2

