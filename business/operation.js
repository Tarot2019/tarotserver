const APIError = require('../rest').ApiError;
const wechatPayNotifyUrl = "https://qian10.net/api/api/tarot1/payResult";

const weixinPay = require('./weixin_pay');

const db = require('../database/db');
const Op = (require('sequelize')).Op;

let models = require('../database/models.js');
let channel = models.channel;
let user = models.user;
let order = models.order;

channel.hasMany(user);
channel.hasMany(order);

const utils = require('./utils/utils');


const getAllChannels = async () => {
    console.log("getAllChannels");
    let result = await channel.findAndCountAll({
        where: {disabled: false}
    });
    let count = result.count;
    console.log("count = " + count);
    return result.rows;
};
const detail = async (channelId) => {
    console.log("get channel detial: " + channelId);
    let ordersAll = await order.findAll({
        where: {
            channelId: channelId,
            status: 'paid'
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    let ordersMonth = await order.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            paidTime: {[Op.gte]: Date.now() - 30 * 24 * 60 * 60 * 1000}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    let ordersWeek = await order.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            paidTime: {[Op.gte]: Date.now() - 7 * 24 * 60 * 60 * 1000}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    let orders24Hours = await order.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            paidTime: {[Op.gte]: Date.now() - 1 * 24 * 60 * 60 * 1000}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order']]
    });
    let ordersDay = await order.findAll({
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
            sum: ordersDay[0].toJSON().sumPrice || 0
        },
        {
            title: "24小时付款合计",
            order: orders24Hours[0].toJSON().order,
            sum: orders24Hours[0].toJSON().sumPrice || 0
        },
        {
            title: "7日付款合计",
            order: ordersWeek[0].toJSON().order,
            sum: ordersWeek[0].toJSON().sumPrice || 0
        },
        {
            title: "30日付款合计",
            order: ordersMonth[0].toJSON().order,
            sum: ordersMonth[0].toJSON().sumPrice || 0
        },
        {
            title: "历史付款合计",
            order: ordersAll[0].toJSON().order,
            sum: ordersAll[0].toJSON().sumPrice || 0
        },
    ];
};
module.exports = {
    channels: getAllChannels,

    detail: detail,
    detailAll: async () => {
        let channels = await getAllChannels();
        return await Promise.all(channels.map(async channel => {
            let channelTemp = channel.toJSON();
            channelTemp.orderDetial = await detail(channel.id);
            return channelTemp;
        }));
    }
}