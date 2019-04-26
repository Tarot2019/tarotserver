const tarot1 = require('../business/tarot1');
module.exports = {
    'GET /api/tarot1/home': async (ctx, next) => {
        let homeDivinations = await tarot1.homeDivinations();
        let homeData = {kefu: {wechatid: "wechatid", qrCode: "http://www.baidu.com"}};
        homeData.banner = [];
        homeData.list = [];
        console.log("homeDivinations", JSON.stringify(homeDivinations));
        homeDivinations.forEach(divination => {
            if(divination.isBanner) {
                homeData.banner.push({
                    id: divination.id,
                    img: divination.picTop
                });
            } else {
                homeData.list.push({
                    id: divination.id,
                    img: divination.picSquare,
                    title: divination.title,
                    subTitle: divination.subTitle,
                    priceNew: divination.priceNew,
                    priceOld: divination.priceOld,
                    sales: divination.sales
                });
            }
        });
        ctx.rest(homeData);

    },

    'GET /api/tarot1/detail/:id': async (ctx, next) => {
        let divinationDetail = await tarot1.divinationDetail(ctx.params.id, ctx.headers.openid);
        ctx.rest(divinationDetail);

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
            sales: order.sales
        })));

    },
    // 'GET /api/tarot1/addOrder/:id': async (ctx, next) => {
    //     let result = await tarot1.addOrder(ctx.headers.openid, ctx.params.id, 500);
    //     ctx.rest(result);
    // },
    'GET /api/tarot1/getPayInfo/:id': async (ctx, next) => {
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
