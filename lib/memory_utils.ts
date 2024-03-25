import {readFile} from "fs/promises";
import {totalmem} from "node:os";

const UNLIMITED_MEMORY_AMOUNT = 9223372036854771712;

/**
 * read RSS value from path /sys/fs/cgroup/memory.current
 *
 * rss : Resident Set Size, contains code, stack and heap size of a JS running program
 * @return current used memory in bytes
 */
async function readMemoryMetric(): Promise<number> {
    const memoryGroup = await readFile('/sys/fs/cgroup/memory.stat')
    if (!memoryGroup) {
        throw new Error('Cannot read memory data from cgroup')
    }
    const currentRssMemoryRawData = memoryGroup.toString('utf-8').split('\n')[1].split(' ')[1]
    return parseInt(currentRssMemoryRawData, 10)
}

/**
 *
 * @return current used memory usage in percent
 */
async function containerMemoryUsageInPercent() {
    const currentMemoryUsage = await readMemoryMetric()
    const memoryLimitRawData = await readFile('memory/memory.limit_in_bytes');
    let memoryLimit = parseInt(memoryLimitRawData.toString('utf-8'), 10)
    if (memoryLimit >= UNLIMITED_MEMORY_AMOUNT || isNaN(memoryLimit)) {
        memoryLimit = totalmem()
    }
    return currentMemoryUsage / memoryLimit * 100
}

export {readMemoryMetric, containerMemoryUsageInPercent}