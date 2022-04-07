# TOC
   - [Installation](#installation)
   - [Convert to SQL string](#convert-to-sql-string)
<a name=""></a>

<a name="installation"></a>
# Installation
`npm i js-date-to-sql-datetime`
 
<a name="convert-to-sql-string"></a>
# Convert to SQL string

returns a sql-friendly string from a JS Date object or POSIX timestamp.

```js
const expect = require('chai').expect;
const toSQLDate = require('js-date-to-sql-datetime');

toSQLDate(new Date(1604940393706)); // '2020-11-09 11:46:33'
toSQLDate(1604940393706);           // '2020-11-09 11:46:33'
```
