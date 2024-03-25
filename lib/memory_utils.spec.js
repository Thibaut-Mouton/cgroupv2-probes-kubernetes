"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_utils_1 = require("./memory_utils");
const promises_1 = __importDefault(require("fs/promises"));
describe('memory utils', () => {
    describe(memory_utils_1.readMemoryMetric.name, () => {
        it('should return correctly formatted memory value', async () => {
            const EXPECTED_VALUE = 4000000000;
            const sampleFileMock = `cache 916844544\nrss ${EXPECTED_VALUE}\nrss_huge 1113587712`;
            jest.spyOn(promises_1.default, 'readFile').mockResolvedValue(Buffer.from(sampleFileMock));
            const result = await (0, memory_utils_1.readMemoryMetric)();
            expect(result).toEqual(EXPECTED_VALUE);
        });
    });
});
