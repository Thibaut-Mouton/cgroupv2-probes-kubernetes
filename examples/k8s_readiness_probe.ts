import {containerMemoryUsageInPercent} from "../lib/memory_utils";
import {getCpuUsage} from "../lib/cpu_utils";

/**
 * Use this function to eject pods from load-balancer
 * @link Check {@link https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/ lifecycle}
 * @return boolean if the memory is above threshold (here 80%)
 */
async function readinessProbe() {
    const currentMemoryUsageInPercent = await containerMemoryUsageInPercent()
    const currentCpuUsageInPercent = await getCpuUsage()
    return currentMemoryUsageInPercent > 80 && currentCpuUsageInPercent > 80
}

readinessProbe()