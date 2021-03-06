const assert = require('assert');
const fs = require('fs');
const raml2md = require('../libs/index.js');

describe('Parsing', () =>
{
    it('parse() #1', (done) =>
    {
        raml2md.parse({ input : { paths : [ './test/input' ] } })
            .then(results => assert.equal(JSON.stringify(results), fs.readFileSync('./test/data/parsed.txt', 'utf8')))
            .then(() => done());
    });

    it('parse() error #1', (done) =>
    {
        var error;

        raml2md.parse({ input : { paths : [ './test/InVaLiD' ] } })
            .catch(e => error = e).finally(() => { assert.notEqual(error, undefined); done() });
    });
});
