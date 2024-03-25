import {readFile} from "fs/promises";

const PERIOD_TIME_IN_MS = 3000

/**
 * @return nanoseconds: point in time
 *         cpu: total active CPU
 */
async function readCpuPointInTime(): Promise<{ cpu: number, nanoseconds: number }> {
    const rawData = await readFile('/sys/fs/cgroup/cpuacct/cpuacct.usage')
    const cpuData = rawData.toString('utf-8')
    if (cpuData) {
        const date = Date.now() * 1e6 // convert to nanoseconds
        return {
            cpu: parseInt(cpuData, 10),
            nanoseconds: date
        }
    } else {
        throw new Error('Cannot read CPU value from cgroup')
    }
}

async function sleep(msToWait: number) {
    return new Promise((resolve) => setTimeout(resolve, msToWait))
}

async function getCpuUsage() {
    const cpuUsageStart = await readCpuPointInTime()
    await sleep(PERIOD_TIME_IN_MS)
    const cpuUsageEnd = await readCpuPointInTime()
    if (!cpuUsageStart || !cpuUsageEnd) {
        throw new Error('cpuUsage is not defined')
    }
    return (cpuUsageEnd.cpu - cpuUsageStart.cpu) / (cpuUsageEnd.nanoseconds - cpuUsageStart.nanoseconds) * 100
}

export {readCpuPointInTime, sleep, getCpuUsage}