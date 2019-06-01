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

    'POST /api/operation/addChannel': async (ctx, next) => {
        ctx.rest(await operation.addChannel(ctx.request.body.name, ctx.request.body.description));
    },

    'GET /api/operation/detail/:product/:channelId': async (ctx, next) => {
        let detail = await operation.detail(ctx.params.channelId, ctx.params.product);
        ctx.rest(detail);

    },
    'GET /api/operation/allChannelDetail/:product': async (ctx, next) => {
        let detail = await operation.detailAll(ctx.params.product);
        ctx.rest(detail);
    },
    'GET /api/operation/orders/:product/:channelId/:page': async (ctx, next) => {
        console.log("orders: " + ctx.params.product + ctx.params.channelId + ctx.params.page);
        let orders = await operation.orders(ctx.params.channelId, ctx.params.page, ctx.params.product);
        ctx.rest(orders);
    },
};
