/**
 * @typedef {Object} ParseResult
 * @property {string} unit The unit in which ranges are specified
 * @property {number} first An integer indicating the beginning of the requested range
 * @property {number} last An integer in the given unit indicating the end of the requested range
 * @property {number} length The total size of the document or null if unknown
 */

/**
 *    @param  {string} headerValue - the value of a `Content-Range` header
 *    	The supported forms of this header are specified in this [RFC](https://tools.ietf.org/html/rfc7233#section-4.2)
 *    	and on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range#Syntax)
 *    @return {ParseResult}
 */
module.exports = function(headerValue) {
    if (typeof headerValue !== 'string') {
        throw new Error('invalid argument');
    }

    const parseInt = number => Number.parseInt(number, 10);

    // Check for presence of unit
    let matches = headerValue.match(/^(\w*) /);
    const unit = matches && matches[1];

    // check for start-end/size header format
    matches = headerValue.match(/(\d+)-(\d+)\/(\d+|\*)/);
    if (matches) {
        return {
            unit,
            first: parseInt(matches[1]),
            last: parseInt(matches[2]),
            length: matches[3] === '*' ? null : parseInt(matches[3])
        };
    }

    // check for size header format
    matches = headerValue.match(/(\d+|\*)/);
    if (matches) {
        return {
            unit,
            first: null,
            last: null,
            length: matches[1] === '*' ? null : parseInt(matches[1])
        };
    }

    return null;
};
