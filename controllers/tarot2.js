const tarot2 = require('../business/tarot2');
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
    'GET /api/tarot2/home': async (ctx, next) => {
        let questionGroups = await tarot2.home();
        let homeData = {
            kefu: kefu,
            questionGroups
        };
        ctx.rest(homeData);

    },

    'GET /api/tarot2/answer/:questionId': async (ctx, next) => {
        let answer = await tarot2.questionAnswer(ctx.params.questionId);
        delete answer.description;
        answer.interpretations.map(interpretation => delete interpretation.content);
        answer.kefu = kefu;
        ctx.rest(answer);

    },

    'GET /api/tarot2/order': async (ctx, next) => {
        let orders = await tarot2.orders(ctx.headers.openid);
        ctx.rest(orders);

    },
    'GET /api/tarot2/orderDetail/:orderId': async (ctx, next) => {
        let detail = await tarot2.orderDetail(ctx.params.orderId);
        ctx.rest(detail);

    },
    'POST /api/tarot2/getPayInfo': async (ctx, next) => {
        let payInfo = await tarot2.getPayInfo(ctx.headers.openid, ctx.request.body.questionId, ctx.request.body.cardId, ctx.request.ip);
        ctx.rest(payInfo);
    },
    'POST /api/tarot2/payResult': async (ctx, next) => {
        console.log("############# wechat callback #############");
        console.log(JSON.stringify(ctx.request));
        const content = ctx.request.body.xml;
        console.log('ctx.request.body.xml', JSON.stringify(content));
        let result = tarot2.wechatCallback(content);
        if(result) {
            // 开始回传微信
            ctx.type = 'application/xml' // 指定发送的请求类型是xml
            // 回传微信，告诉已经收到
            return ctx.body = `<xml>
            <return_code><![CDATA[SUCCESS]]></return_code>
            <return_msg><![CDATA[OK]]></return_msg>
            </xml>`
        }
    }
};
