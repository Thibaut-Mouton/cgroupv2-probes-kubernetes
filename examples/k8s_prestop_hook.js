"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memory_utils_1 = require("../lib/memory_utils");
const cpu_utils_1 = require("../lib/cpu_utils");
/**
 * Use this function combined with the "terminationGracePeriodSeconds" parameter to control the termination of your pod in kubernetes
 * @link Check {@link https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/ lifecycle}
 * @return boolean if the memory is above threshold (here 80%)
 */
async function preStopHook() {
    let isMemoryLowerThanThreshold = true;
    while (isMemoryLowerThanThreshold) {
        const currentMemoryUsageInPercent = await (0, memory_utils_1.containerMemoryUsageInPercent)();
        const currentCpuUsageInPercent = await (0, cpu_utils_1.getCpuUsage)();
        await (0, cpu_utils_1.sleep)(3000);
        isMemoryLowerThanThreshold = currentMemoryUsageInPercent > 80 && currentCpuUsageInPercent > 80;
    }
}
preStopHook();
