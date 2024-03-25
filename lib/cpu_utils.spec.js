"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cpu_utils_1 = require("./cpu_utils");
const promises_1 = __importDefault(require("fs/promises"));
describe('cpu utils', () => {
    describe(cpu_utils_1.readCpuPointInTime.name, () => {
        it('should return correctly formatted cpu value', async () => {
            const EXPECTED_VALUE = 2217231827500;
            const sampleFileMock = EXPECTED_VALUE.toString();
            jest.spyOn(promises_1.default, 'readFile').mockResolvedValue(Buffer.from(sampleFileMock));
            const result = await (0, cpu_utils_1.readCpuPointInTime)();
            expect(result.cpu).toEqual(EXPECTED_VALUE);
        });
    });
});
