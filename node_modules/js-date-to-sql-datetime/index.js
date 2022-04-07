var zeroFill = require('zero-fill');
module.exports = function toSQLDatetime(dt) {
    if (isSQLDatetimeString(dt))
        return dt;
    switch (typeof dt) {
        case 'number':
            dt = new Date(dt);
            break;
        default:
            break;
    }
    var YYYY = dt.getFullYear();
    var MM = zeroFill(2, dt.getMonth() + 1);
    ;
    var DD = zeroFill(2, dt.getDate());
    var hh = zeroFill(2, dt.getHours());
    var mm = zeroFill(2, dt.getMinutes());
    var ss = zeroFill(2, dt.getSeconds());
    return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
};
function isSQLDatetimeString(dt) {
    if (typeof dt !== 'string') {
        return false;
    }
    else {
        return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dt);
    }
}
