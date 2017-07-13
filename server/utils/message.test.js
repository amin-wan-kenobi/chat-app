const expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate the correct message object', () => {
        var from = 'test user';
        var text = 'welcome to the test message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
        
    });
});