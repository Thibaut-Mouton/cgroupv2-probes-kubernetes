"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerMemoryUsageInPercent = exports.readMemoryMetric = void 0;
const promises_1 = require("fs/promises");
const node_os_1 = require("node:os");
const UNLIMITED_MEMORY_AMOUNT = 9223372036854771712;
/**
 * read RSS value from path /sys/fs/cgroup/memory.current
 *
 * rss : Resident Set Size, contains code, stack and heap size of a JS running program
 * @return current used memory in bytes
 */
async function readMemoryMetric() {
    const memoryGroup = await (0, promises_1.readFile)('/sys/fs/cgroup/memory.stat');
    if (!memoryGroup) {
        throw new Error('Cannot read memory data from cgroup');
    }
    const currentRssMemoryRawData = memoryGroup.toString('utf-8').split('\n')[1].split(' ')[1];
    return parseInt(currentRssMemoryRawData, 10);
}
exports.readMemoryMetric = readMemoryMetric;
/**
 *
 * @return current used memory usage in percent
 */
async function containerMemoryUsageInPercent() {
    const currentMemoryUsage = await readMemoryMetric();
    const memoryLimitRawData = await (0, promises_1.readFile)('memory/memory.limit_in_bytes');
    let memoryLimit = parseInt(memoryLimitRawData.toString('utf-8'), 10);
    if (memoryLimit >= UNLIMITED_MEMORY_AMOUNT || isNaN(memoryLimit)) {
        memoryLimit = (0, node_os_1.totalmem)();
    }
    return currentMemoryUsage / memoryLimit * 100;
}
exports.containerMemoryUsageInPercent = containerMemoryUsageInPercent;
