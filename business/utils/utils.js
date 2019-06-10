const timeStamp = 1554976818008;
const getSales = () => {
    let time = Date.now() - timeStamp;
    return Math.floor(time / (1000 * 60 * 60)) + 111;
};
const getFormattedDate = timestamp => {
    let date = new Date(timestamp);
    return date.getFullYear() + '-' +
        ("0" + (date.getMonth() + 1)).slice(-2) + '-' +
        ("0" + (date.getDate())).slice(-2) + ' ' +
        ("0" + date.getHours()).slice(-2) + ':' +
        ("0" + date.getMinutes()).slice(-2) + ':' +
        ("0" + date.getSeconds()).slice(-2)
};
const getTimeStamp = () => {
    let res = {
        yesterday:{},
        curMonth:{},
        lastMonth:{}//本月的时间跨度，从本月1号到昨天的日期
    };
    let now = new Date();

    res.yesterday.start = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()).getTime() - 24*3600*1000;
    res.yesterday.end   = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()).getTime() - 1;

    res.lastMonth.end   = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + '1').getTime() - 1;
    let lastMonthD  = new Date(res.lastMonth.end);
    res.lastMonth.start = new Date(lastMonthD.getFullYear() + '/' + (lastMonthD.getMonth() + 1) + '/' + 1).getTime();

    res.curMonth.start = new Date(now.getFullYear() + '/' +  (now.getMonth() + 1) + '/' + 1).getTime();
    res.curMonth.end   = Date.now();

    return res;
};
module.exports = {
    getSales,
    getFormattedDate,
    getTimeStamp
};