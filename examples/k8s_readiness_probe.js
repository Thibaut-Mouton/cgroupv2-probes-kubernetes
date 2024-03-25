"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memory_utils_1 = require("../lib/memory_utils");
const cpu_utils_1 = require("../lib/cpu_utils");
/**
 * Use this function to eject pods from load-balancer
 * @link Check {@link https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/ lifecycle}
 * @return boolean if the memory is above threshold (here 80%)
 */
async function readinessProbe() {
    const currentMemoryUsageInPercent = await (0, memory_utils_1.containerMemoryUsageInPercent)();
    const currentCpuUsageInPercent = await (0, cpu_utils_1.getCpuUsage)();
    return currentMemoryUsageInPercent > 80 && currentCpuUsageInPercent > 80;
}
readinessProbe();
