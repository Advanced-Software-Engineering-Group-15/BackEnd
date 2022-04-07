const zeroFill = require('zero-fill');

module.exports = function toSQLDatetime(dt: any) {
    if (isSQLDatetimeString(dt))
        return dt;
        
    switch (typeof dt) {
        case 'number':
            dt = new Date(dt);
            break;
        
        default:
            break;
    }
    const YYYY = dt.getFullYear();
    const MM = zeroFill(2, dt.getMonth() + 1);;
    const DD = zeroFill(2, dt.getDate());
    const hh = zeroFill(2, dt.getHours());
    const mm = zeroFill(2, dt.getMinutes());
    const ss = zeroFill(2, dt.getSeconds());
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
}

function isSQLDatetimeString(dt:any) {
    if (typeof dt !== 'string') {
        return false
    } else {
        return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dt)
    }
}