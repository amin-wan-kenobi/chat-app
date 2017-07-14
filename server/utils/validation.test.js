const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {

    it('should reject non string values', () => {
        var result = isRealString(90);
        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var result = isRealString('       ');
        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var result = isRealString('    Hello World    ');
        expect(result).toBe(true);
    });
});