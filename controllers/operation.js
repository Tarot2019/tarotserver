const operation = require('../business/operation');
const kefu = {
    normal: {wechatid: "xmqianming01", qrCode: "/tarot1/kefu_normal.png"},
    yuyin: {wechatid: "ch13769762694", qrCode: "/tarot1/kefu_yuyin.png"}
};
getFormattedDate = timestamp => {
    let date = new Date(timestamp);
    return date.getFullYear() + '-' +
        ("0" + (date.getMonth() + 1)).slice(-2) + '-' +
        ("0" + (date.getDate())).slice(-2) + ' ' +
        ("0" + date.getHours()).slice(-2) + ':' +
        ("0" + date.getMinutes()).slice(-2) + ':' +
        ("0" + date.getSeconds()).slice(-2)
};
module.exports = {
    'GET /api/operation/channels': async (ctx, next) => {
        ctx.rest(await operation.channels());

    },

    'GET /api/operation/detail/:channelId': async (ctx, next) => {
        let detail = await operation.detail(ctx.params.channelId);
        ctx.rest(detail);

    },
    'GET /api/operation/allChannelDetail': async (ctx, next) => {
        let detail = await operation.detailAll();
        ctx.rest(detail);
    },
};
