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
module.exports = {
    getSales,
    getFormattedDate
}