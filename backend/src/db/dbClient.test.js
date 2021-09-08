const {mapArray} = require("./dbClient");

describe('mongo db', function () {
    it('should map an array to correct document format', function () {
        const arr = ['http://google.com', 'http://facebook.com'];
        const response = mapArray(arr);
        expect(response).toEqual([
            {
                url: 'http://google.com'
            },
            {
                url: 'http://facebook.com'
            }
        ])
    });
});
