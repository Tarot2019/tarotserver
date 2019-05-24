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

    'GET /api/tarot1/preorder': async (ctx, next) => {
        let preorders = await tarot1.preorders(ctx.headers.openid);
        ctx.rest(preorders.map(preorder => ({
            id: preorder.id,
            img: preorder.picSquare,
            title: preorder.title,
            subTitle: preorder.subTitle,
            priceNew: preorder.priceNew,
            priceOld: preorder.priceOld,
            sales: preorder.sales
        })));

    },
    'GET /api/tarot1/addPreorder/:id': async (ctx, next) => {
        let result = await tarot1.addPreorder(ctx.headers.openid, ctx.params.id);
        ctx.rest(result);
    },
    'GET /api/tarot1/order': async (ctx, next) => {
        let orders = await tarot1.orders(ctx.headers.openid);
        ctx.rest(orders.map(order => ({
            id: order.id,
            img: order.picSquare,
            title: order.title,
            subTitle: order.subTitle,
            priceNew: order.priceNew,
            priceOld: order.priceOld,
            sales: order.sales,
            time: getFormattedDate(order.orders.paidTime)
        })));

    },
    // 'GET /api/tarot1/addOrder/:id': async (ctx, next) => {
    //     let result = await tarot1.addOrder(ctx.headers.openid, ctx.params.id, 500);
    //     ctx.rest(result);
    // },
    'GET /api/tarot1/getPayInfo/:id': async (ctx, next) => {
        console.log("[getPayInfo] ctx.request.ip = " + ctx.request.ip);
        let payInfo = await tarot1.getPayInfo(ctx.headers.openid, ctx.params.id, ctx.request.ip);
        ctx.rest(payInfo);
    },
    'POST /api/tarot1/payResult': async (ctx, next) => {
        console.log("############# wechat callback #############");
        console.log(JSON.stringify(ctx.request));
        const content = ctx.request.body.xml;
        console.log('ctx.request.body.xml', JSON.stringify(content));
        let result = tarot1.wechatCallback(content);
        if(result) {
            // 开始回传微信
            ctx.type = 'application/xml' // 指定发送的请求类型是xml
            // 回传微信，告诉已经收到
            return ctx.body = `<xml>
            <return_code><![CDATA[SUCCESS]]></return_code>
            <return_msg><![CDATA[OK]]></return_msg>
            </xml>`
        }
    },
    // 'GET /api/public/articles': async (ctx, next) => {
    //     let allArticles = await articles.getArticles(ctx.request.headers.openid);
    //     ctx.rest({
    //         pageSize: 20,
    //         totalPage: 1,
    //         curPage: 0,
    //         pageData: allArticles
    //     });
    // },
    // 'GET /api/public/articles/:id': async (ctx, next) => {
    //     ctx.rest(await articles.articleDetail(ctx.params.id));
    // },
    //
    // 'POST /api/articles/favorite': async (ctx, next) => {
    //     let openid = ctx.request.headers.openid || '';
    //     let articleId = ctx.request.body.articleId || '';
    //     if (!openid) {
    //         throw new APIError("not_login", "请先登录");
    //     }
    //     if (!articleId) {
    //         throw new APIError("params_required", "参数不能为空：articleId");
    //     }
    //     let favoriteResult = await tableFavoriteArticles.create({
    //         userId: openid,
    //         articleId: articleId
    //     });
    //     if (favoriteResult) {
    //         ctx.rest();
    //     } else {
    //         throw new APIError("error", "收藏文章失败");
    //     }
    // }
};
