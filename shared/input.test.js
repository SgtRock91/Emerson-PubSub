const { validateString, validateNumber } = require('./input');

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