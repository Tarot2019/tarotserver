const timeStamp = 1554976818008;
const getSales = () => {
    let time = Date.now() - timeStamp;
    return Math.floor(time / (1000 * 60 * 60)) + 111;
};
module.exports = {
    getSales
}