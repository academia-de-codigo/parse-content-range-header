var assert = require('assert');
var parse = require('./index');

describe('Content-range header parser', () => {
    it('should parse header with type, range and size', () => {
        assert.deepEqual(parse('items 0-19/30'), {
            unit: 'items',
            first: 0,
            last: 19,
            length: 30
        });
    });

    it('should parse header with range and size but no type', () => {
        assert.deepEqual(parse('0-19/30'), {
            unit: null,
            first: 0,
            last: 19,
            length: 30
        });
    });

    it('should parse header with type and range but unknown size', () => {
        assert.deepEqual(parse('items 0-19/*'), {
            unit: 'items',
            first: 0,
            last: 19,
            length: null
        });
    });

    it('should parse header with range but unknown size and no type', () => {
        assert.deepEqual(parse('0-19/*'), {
            unit: null,
            first: 0,
            last: 19,
            length: null
        });
    });

    it('should parse header with type and size', () => {
        assert.deepEqual(parse('items 30'), {
            unit: 'items',
            first: null,
            last: null,
            length: 30
        });
    });

    it('should parse header with size but no type', () => {
        assert.deepEqual(parse('30'), {
            unit: null,
            first: null,
            last: null,
            length: 30
        });
    });

    it('should parse header with zero size', () => {
        assert.deepEqual(parse('0'), {
            unit: null,
            first: null,
            last: null,
            length: 0
        });
    });

    it('should parse header with type but unknown size', () => {
        assert.deepEqual(parse('items *'), {
            unit: 'items',
            first: null,
            last: null,
            length: null
        });
    });

    it('should parse header with no type and unknown size', () => {
        assert.deepEqual(parse('*'), {
            unit: null,
            first: null,
            last: null,
            length: null
        });
    });

    it('should return null if parse fail', function() {
        assert.equal(parse('foooooo'), null);
    });

    it('should return null if no argument is passed', function() {
        assert.equal(parse(null), null);
        assert.equal(parse(undefined), null);
    });

    it('should throw if argument is not a string', function() {
        assert.throws(() => parse({}), Error);
    });
});
