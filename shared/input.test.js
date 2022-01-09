const { validateString, validateNumber, processInput } = require('./input');

describe('validateString', () => {
    it('should return true if string', () => {
        expect(validateString('123')).toEqual(true);
    });
    it('should return false if not a string', () => {
        expect(validateString(123)).toEqual(false);
        expect(validateString()).toEqual(false);
        expect(validateString({})).toEqual(false);
        expect(validateString(null)).toEqual(false);
        expect(validateString(undefined)).toEqual(false);
    });
});

describe('validateNumber', () => {
    it('should return true if number', () => {
        expect(validateNumber('1')).toEqual(true);
        expect(validateNumber('1435')).toEqual(true);
    });
    it('should return false if contains anything that is not a number', () => {
        expect(validateNumber('a123')).toEqual(false);
        expect(validateNumber('123a')).toEqual(false);
        expect(validateNumber('1a1')).toEqual(false);
        expect(validateNumber(undefined)).toEqual(false);
        expect(validateNumber({})).toEqual(false);
    });
});

//Note: can do before/afer each mock setup and resets
describe('processInput', () => {
    it('should call console log with help message and exit(0) on -h input', () => {
        //build mocks
        const realProcessExit = process.exit;
        const realConsoleLog = console.log;
        const mockExit = jest.fn();
        const mockLog = jest.fn();

        process.exit = mockExit;
        console.log = mockLog;

        //call
        const msg = 'msg';
        processInput('-h', undefined, msg);
        expect(mockLog).toHaveBeenCalledWith(msg);
        expect(mockExit).toHaveBeenCalledWith(0);

        //reset
        console.log = realConsoleLog;
        process.exit = realProcessExit;
    });
    it('should return input when valid input given', () => {
        const expected = '1';
        const result = processInput('1', () => true, undefined);

        expect(result).toEqual(expected);
    });
    it('should call console log and exit(1) when bad input given', () => {
        //build mocks
        const realProcessExit = process.exit;
        const realConsoleLog = console.log;
        const mockExit = jest.fn();
        const mockLog = jest.fn();

        process.exit = mockExit;
        console.log = mockLog;

        //call
        processInput('1', () => false, '');
        expect(mockLog).toHaveBeenCalled();
        expect(mockExit).toHaveBeenCalledWith(1);

        //reset
        console.log = realConsoleLog;
        process.exit = realProcessExit;
    });
});