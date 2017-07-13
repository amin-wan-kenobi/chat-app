const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {
        var from = 'test user';
        var latitude = '111';
        var longitude = '222';
        var url = 'https://www.google.com/maps?q=111,222';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });
    });
});