import {readCpuPointInTime} from "./cpu_utils";
import fs from "fs/promises";

describe('cpu utils', () => {
    describe(readCpuPointInTime.name, () => {
        it('should return correctly formatted cpu value', async () => {
            const EXPECTED_VALUE = 2217231827500
            const sampleFileMock = EXPECTED_VALUE.toString()
            jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(sampleFileMock))
            const result = await readCpuPointInTime()
            expect(result.cpu).toEqual(EXPECTED_VALUE)
        })
    })
})