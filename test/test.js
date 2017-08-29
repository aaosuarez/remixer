var expect = require('chai').expect;

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 if element is not present', function() {
            var result = [1,2,3].indexOf(4);
            expect(result).to.equal(-1);
        });
    });
});