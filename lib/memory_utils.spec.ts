import {readMemoryMetric} from "./memory_utils";
import fs from "fs/promises";

describe('memory utils', () => {
    describe(readMemoryMetric.name, () => {
        it('should return correctly formatted memory value', async () => {
            const EXPECTED_VALUE = 4000000000
            const sampleFileMock = `cache 916844544\nrss ${EXPECTED_VALUE}\nrss_huge 1113587712`
            jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(sampleFileMock))
            const result = await readMemoryMetric()
            expect(result).toEqual(EXPECTED_VALUE)
        })
    })
})