const APIError = require('../rest').ApiError;
const wechatPayNotifyUrl = "https://qian10.net/api/api/tarot1/payResult";

const weixinPay = require('./weixin_pay');
const crypto = require('crypto');

const utils = require('./utils/utils');

const db = require('../database/db');
const Op = (require('sequelize')).Op;

let models = require('../database/models.js');
let channel = models.channel;
let user = models.user;
let order = models.order;
let tarot2record = models.tarot2record;


let tarot1history = models.tarot1history;
let tarot2history = models.tarot2history;

order.belongsTo(user);
channel.hasMany(user);
channel.hasMany(order);

const getAllChannels = async () => {
    console.log("getAllChannels");
    let result = await channel.findAndCountAll({
        where: {disabled: false}
    });
    let count = result.count;
    console.log("count = " + count);
    return result.rows;
};
const detail = async (channelId, product) => {
    console.log("get channel detial: channelId = " + channelId + ", product = " + product);
    let orderOrRecord = product == 'tarot2' ? tarot2record : order;
    let ordersAll = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid'
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    let ordersMonth = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            paidTime: {[Op.gte]: Date.now() - 30 * 24 * 60 * 60 * 1000}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    let ordersWeek = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            paidTime: {[Op.gte]: Date.now() - 7 * 24 * 60 * 60 * 1000}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    let orders24Hours = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            paidTime: {[Op.gte]: Date.now() - 1 * 24 * 60 * 60 * 1000}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    let ordersDay = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            paidTime: {[Op.gte]: new Date(new Date().toLocaleDateString()).getTime()}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    // return [ordersDay[0], orders24Hours[0], ordersWeek[0], ordersMonth[0], ordersAll[0]];
    return [
        {
            title: "今日付款合计",
            order: ordersDay[0].toJSON().order,
            sum: parseInt(ordersDay[0].toJSON().sumPrice || 0)
        },
        {
            title: "24小时付款合计",
            order: orders24Hours[0].toJSON().order,
            sum: parseInt(orders24Hours[0].toJSON().sumPrice || 0)
        },
        {
            title: "7日付款合计",
            order: ordersWeek[0].toJSON().order,
            sum: parseInt(ordersWeek[0].toJSON().sumPrice || 0)
        },
        {
            title: "30日付款合计",
            order: ordersMonth[0].toJSON().order,
            sum: parseInt(ordersMonth[0].toJSON().sumPrice || 0)
        },
        {
            title: "历史付款合计",
            order: ordersAll[0].toJSON().order,
            sum: parseInt(ordersAll[0].toJSON().sumPrice || 0)
        },
    ];
};
const orders = async (channelId, page, product) => {
    if (product == 'tarot1') {
        let orderCount = await order.count({
            where: {
                channelId: channelId,
                status: 'paid'
            }
        });
        const pageSize = 20;
        let ordersAll = await order.findAll({
            where: {
                channelId: channelId,
                status: 'paid'
            },
            offset: pageSize * page,
            limit: pageSize,
            attributes: ['orderid', 'userOpenid', 'paidTime', 'price']
        });
        return {
            total: Math.ceil(orderCount / pageSize),
            pageSize,
            page: parseInt(page),
            data: await Promise.all(ordersAll.map(async order => {
                let userInstance = await order.getUser();
                console.log("[orders]user = " + JSON.stringify(userInstance));
                let orderJson = order.toJSON();
                orderJson.paidTime = utils.getFormattedDate(orderJson.paidTime);
                orderJson.userName = userInstance.wechatName || "浏览器用户";
                delete orderJson.userOpenid;
                return orderJson;
            }))
        }
    } else {
        let orderCount = await tarot2record.count({
            where: {
                channelId: channelId,
                status: 'paid'
            }
        });
        const pageSize = 20;
        let ordersAll = await tarot2record.findAll({
            where: {
                channelId: channelId,
                status: 'paid'
            },
            offset: page * pageSize,
            limit: pageSize,
            attributes: ['orderId', 'openid', 'phoneNumber', 'paidTime', 'price']
        });
        return {
            total: Math.ceil(orderCount / pageSize),
            pageSize,
            page: parseInt(page),
            data: await Promise.all(ordersAll.map(async order => {
                let orderJson = order.toJSON();
                orderJson.paidTime = utils.getFormattedDate(orderJson.paidTime);
                orderJson.userName = orderJson.phoneNumber || "未绑定用户";
                delete orderJson.openid;
                delete orderJson.phoneNumber;
                return orderJson;
            }))
        }
    }

};
const toPercent = (num, total) => {

    return (Math.round(num / total * 10000) / 100.00 + "%");// 小数点后两位百分比

}
module.exports = {
    channels: getAllChannels,
    addChannel: async (channelName, channelDescription) => {
        try {
            let result = await channel.create({
                id: crypto.createHash('md5').update(channelName + 'this_is_a_Lucky_$#%^_salt', 'utf8').digest('hex').toLowerCase().slice(-8),
                name: channelName,
                description: channelDescription
            });
            return result;
        } catch (err) {
            throw new APIError('db_err', JSON.stringify(err));
        }
    },

    detail: detail,
    detailAll: async (product) => {
        let channels = await getAllChannels();
        let channelsDetail = await Promise.all(channels.map(async channel => {
            let channelTemp = channel.toJSON();
            delete channelTemp.disabled;
            delete channelTemp.description;
            let orderDetail = await detail(channel.id, product);

            let historyModel = product == 'tarot1' ? tarot1history : tarot2history;
            let uv = await historyModel.count({
                where: {
                    page: 'home',
                    channelId: channel.id,
                    time: {[Op.gte]: new Date(new Date().toLocaleDateString()).getTime()}
                },
                distinct: true,
                col: 'userId'
            });
            let pv = await historyModel.count({
                where: {
                    page: 'home',
                    channelId: channel.id,
                    time: {[Op.gte]: new Date(new Date().toLocaleDateString()).getTime()}
                }
            });
            console.log('pv=' + pv + ', uv=' + uv);

            channelTemp.pv = pv;
            channelTemp.uv = uv;
            channelTemp.orderCount = orderDetail[0].order;
            channelTemp.orderPeopleCount = channelTemp.orderCount;
            channelTemp.orderRate = toPercent(channelTemp.orderCount, channelTemp.uv);
            channelTemp.validOrderCount = channelTemp.orderCount;
            channelTemp.validOrderRate = channelTemp.orderRate;
            channelTemp.validOrderPerPeople = toPercent(channelTemp.validOrderCount, channelTemp.orderPeopleCount);
            channelTemp.income = orderDetail[0].sum;
            channelTemp.incomePerUv = toPercent(channelTemp.income, channelTemp.uv);
            channelTemp.orderDetail = orderDetail;
            return channelTemp;
        }));
        return {
            dayOrder: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[0].order, 0),
            dayIncome: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[0].sum, 0),
            monthOrder: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[3].order, 0),
            monthIncome: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[3].sum, 0),
            allOrder: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[4].order, 0),
            allIncome: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[4].sum, 0),
            channelsDetail: channelsDetail.map(channelsDetailInstance => {
                delete channelsDetailInstance.orderDetail;
                return channelsDetailInstance;
            })
        }
    },
    orders
};