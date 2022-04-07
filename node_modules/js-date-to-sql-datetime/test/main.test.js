const expect = require('chai').expect;
const toSQLDate = require(__dirname + '/../index');

describe('Convert to SQL string', function() {

    // After: I put in a SQL datetime string
    // Then:
    it('Just returns the string if it\'s a SQL datetime string', function () {
        expect(toSQLDate('2020-11-09 11:46:33')).to.equal('2020-11-09 11:46:33')
    })
    
    // After: I put in a Date object
    // Then:
    it('returns a sql-friendly string from a JS Date object', function () {
        // Put a known timestamp into it and compare the result
        expect(toSQLDate(new Date(1604940393706))).to.equal('2020-11-09 11:46:33')
    })

    // After: I put in a POSIX timestamp
    // Then:
    it('returns a sql-friendly string from POSIX timestamp', function () {
        // Put a known timestamp into it and compare the result
        expect(toSQLDate(1604940393706)).to.equal('2020-11-09 11:46:33')
    })
    
});