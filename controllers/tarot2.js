const tarot2 = require('../business/tarot2');
const utils = require('../business/utils/utils');

const kefu = {
    normal: {wechatid: "xmqianming01", qrCode: "/tarot1/kefu_normal.png"},
    yuyin: {wechatid: "ch13769762694", qrCode: "/tarot1/kefu_yuyin.png"}
};

module.exports = {
    'GET /api/tarot2/home': async (ctx, next) => {
        let questionGroups = await tarot2.home();
        let count = questionGroups.reduce((pre, cur) => pre + cur.questions.reduce((pre, cur) => pre + cur.count + utils.getSales(), 0), 0);
        const comments = [{mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},];
        let homeData = {
            count,
            kefu: kefu,
            questionGroups,
            comments
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
    'GET /api/tarot2/orderWithMobile/:mobile': async (ctx, next) => {
        let orders = await tarot2.ordersWithMobile(ctx.params.mobile);
        ctx.rest(orders);

    },
    'GET /api/tarot2/orderDetail/:orderId': async (ctx, next) => {
        let detail = await tarot2.orderDetail(ctx.params.orderId);
        detail.kefu = kefu;
        ctx.rest(detail);

    },
    'POST /api/tarot2/getPayInfo': async (ctx, next) => {
        let payInfo = await tarot2.getPayInfo(ctx.headers.openid, ctx.request.body.questionId, ctx.request.body.cardId, ctx.request.ip);
        ctx.rest(payInfo);
    },
    'POST /api/tarot2/bindMobile': async (ctx, next) => {
        let result = await tarot2.bindMobile(ctx.request.body.orderId, ctx.request.body.mobile);
        ctx.rest(result);
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
