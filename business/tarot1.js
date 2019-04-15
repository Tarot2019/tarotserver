let models = require('../database/models.js');
let divination = models.divination;
const utils = require('./utils/utils');
let preorder = models.preorder;
let order = models.order;

const recommendationLimits = 3;
let count = 0;
module.exports = {
    homeDivinations: async () => {
        let result = await divination.findAndCountAll({
            where: {isHome: true, invalid: false},
            attributes: ['id', 'picTop', 'picSquare', 'isBanner', 'title', 'subTitle', 'priceOld', 'priceNew', 'sales']
        });
        count = result.count;
        return result.rows.map(divination => divination.sales += utils.getSales());
    },

    divinationDetail: async (divinationID, openid) => {
        console.log("####divinationDetail:", {divinationID, openid, count});
        let tasks = [];
        tasks.push(divination.findById(divinationID));
        let offset = Math.floor(Math.random() * (count > recommendationLimits ? (count - recommendationLimits) : 0));
        tasks.push(divination.findAll({
            offset: offset,
            limit: recommendationLimits,
            where: {invalid: false},
            attributes: ['id', 'picSquare', 'title', 'subTitle', 'priceOld', 'priceNew', 'sales']
        }));
        if(openid) {
            tasks.push(order.findOne({where: {openid: openid, divinationId: divinationID}}));
        }
        let results = await Promise.all(tasks);
        let detail = results[0].toJSON();
        let recommendations = results[1];
        console.log("recommendations.length=" + recommendations.length);
        if(openid && results[2]) {
            detail.paid = true;
        } else {
            //用户未购买过，则删除结果
            detail.paid = false;
            [1,2,3,4].forEach(i => {
                // detail['cardDescription' + i] = null;
                // detail['rateName' + i] = null;
                // detail['rate' + i] = null;
                delete detail['cardDescription' + i];
                delete detail['rateName' + i];
                delete detail['rate' + i];
            });
        }
        if(recommendations) {
            detail.recommendations = recommendations.filter(divination => divination.id != divinationID);
        }
        return detail;
    },
    preorders: async (openid) => {
        let result = await preorder.findAll({
            where: {openid: openid},
            include: {model: divination}}
            );
        return result;
    },
    orders: async (openid) => {

    },
    preTestDivination: async (divinationId, openid) => {

    }
}