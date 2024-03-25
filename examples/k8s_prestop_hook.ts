import {containerMemoryUsageInPercent} from "../lib/memory_utils";
import {getCpuUsage, sleep} from "../lib/cpu_utils";

/**
 * Use this function combined with the "terminationGracePeriodSeconds" parameter to control the termination of your pod in kubernetes
 * @link Check {@link https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/ lifecycle}
 * @return boolean if the memory is above threshold (here 80%)
 */
async function preStopHook() {
    let isMemoryLowerThanThreshold = true
    while (isMemoryLowerThanThreshold) {
        const currentMemoryUsageInPercent = await containerMemoryUsageInPercent()
        const currentCpuUsageInPercent = await getCpuUsage()
        await sleep(3000)
        isMemoryLowerThanThreshold = currentMemoryUsageInPercent > 80 && currentCpuUsageInPercent > 80
    }
}

preStopHook()