const tarot1 = require('../business/tarot1');

module.exports = {
    'GET /api/tarot1/home': async (ctx, next) => {
        let homeDivinations = await tarot1.homeDivinations();
        let homeData = {};
        homeData.banner = [];
        homeData.list = [];
        homeDivinations.forEach((divination) => {
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
                    subTitle: divination.subTitle
                });
            }
        });
        ctx.rest(homeData);

    },

    'GET /api/tarot1/detail/:id': async (ctx, next) => {
        let divinationDetail = await tarot1.divinationDetail(ctx.params.id);
        let homeData = {};
        homeData.banner = [];
        homeData.list = [];
        homeDivinations.forEach((divination) => {
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
                    subTitle: divination.subTitle
                });
            }
        });
        ctx.rest(homeData);

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
