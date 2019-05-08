const APIError = require('../rest').ApiError;

const weixinPay = require('./weixin_pay');

let models = require('../database/models.js');
let divination = models.divination;
let user = models.user;
let order = models.order;

user.belongsToMany(divination, {as: "Preorders", through: "userPreorder"});
divination.belongsToMany(user, {as: "Collectors", through: "userPreorder"});

user.belongsToMany(divination, {as: "Orders", through: order});
divination.belongsToMany(user, {as: "Consumers", through: order});

const utils = require('./utils/utils');

const recommendationLimits = 3;
let count = 0;
module.exports = {
    homeDivinations: async () => {
        console.log("homeDivinations");
        let result = await divination.findAndCountAll({
            where: {isHome: true, invalid: false},
            attributes: ['id', 'picTop', 'picSquare', 'isBanner', 'title', 'subTitle', 'priceOld', 'priceNew', 'sales']
        });
        count = result.count;
        console.log("count = " + count);
        console.log("rows", JSON.stringify(result.rows));
        return result.rows.map(divination => {
            let newDivination = divination.toJSON();
            newDivination.sales += utils.getSales();
            return newDivination;
        });
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
        let results = await Promise.all(tasks);
        let paid = false;
        if(openid) {
            let divinationInstance = results[0];
            paid = await divinationInstance.getConsumers().then(consumers => {
                console.log(`divinationDetail-购买过的用户列表：${JSON.stringify(consumers)}`);
                if(consumers) {
                    return consumers.some(consumer => consumer.openid === openid);
                } else {
                    return false;
                }
            });
            //tasks.push(order.findOne({where: {openid: openid, divinationId: divinationID}}));
        }

        let detail = results[0].toJSON();
        let recommendations = results[1];
        console.log("recommendations.length=" + recommendations.length);
        detail.paid = paid;
        if(paid) {
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
        let result = await user.findOne({
            where: {openid: openid},
            include: [{model: divination, as: "Preorders"}]
        });
        console.log("user信息：", JSON.stringify(result));
        return result.Preorders;
    },
    addPreorder: async (openid, divinationId) => {
        let userInstance = await user.findOne({where: {openid: openid}});
        let divinationInstance = await divination.findById(divinationId);
        let result = await userInstance.addPreorder(divinationInstance);
        return result;
    },
    orders: async (openid) => {
        let result = await user.findOne({
            where: {openid: openid},
            include: [{model: divination, as: "Orders"}]
        });
        console.log("[orders]user信息：", JSON.stringify(result.Orders));
        return result.Orders.filter(order => order.orders.status == 'paid');
    },
    // addOrder: async (openid, divinationId, orderid, price) => {
    //     let userInstance = await user.findOne({where: {openid: openid}});
    //     let divinationInstance = await divination.findById(divinationId);
    //     await userInstance.removePreorder(divinationInstance); //删除preorder中的记录
    //     let status = 'unpaid';
    //     let result = await userInstance.addOrder(divinationInstance, {through: {time: Date.now(), price: price, orderid: orderid, status: status}});
    //     return result;
    // },
    getPayInfo: async (openid, divinationId, ip) => {
        let divinationInstance = await divination.findById(divinationId);
        if(!divinationInstance) {
            throw new APIError('id_err', 'divination id error');
        }
        let orderid = Date.now().toString(36) + openid.slice(-2);
        let price = divinationInstance.priceNew;
        let payInfo = await weixinPay.prePay(openid, orderid, divinationInstance.title, price, ip)
        console.log("微信支付信息：", JSON.stringify(payInfo));
        if(payInfo) {
            let userInstance = await user.findOne({where: {openid: openid}});
            await userInstance.removePreorder(divinationInstance); //删除preorder中的记录
            let status = 'unpaid';
            await userInstance.addOrder(divinationInstance, {through: {createTime: Date.now(), price: price, orderid: orderid, status: status}});
            return payInfo;
        } else {
            throw new APIError('prepay_err', 'get wechat prepay info failed');
        }

    },
    wechatCallback: async (cbContent) => {
        if(cbContent && cbContent.return_code && cbContent.return_code[0] == 'SUCCESS'
            && cbContent.result_code && cbContent.result_code[0] == 'SUCCESS') {
            let orderInstance = await order.findOne({where: {orderid: cbContent.out_trade_no[0]}});
            console.log("wechatCallback， cbContent.total_fee[0] = " + cbContent.total_fee[0] +  ",  orderInstance = " + JSON.stringify(orderInstance));
            if(orderInstance && orderInstance.price === parseInt(cbContent.total_fee[0])) {
                await orderInstance.update({status: 'paid', paidTime: Date.now()});
                return true;
            } else {
                console.log(`价格校验失败: ${JSON.stringify(orderInstance)}`);
            }
        }
        console.log("处理微信回调失败了：", JSON.stringify(cbContent));
        return false;
    }
}