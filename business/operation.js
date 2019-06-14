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
let divination = models.divination;
let question = models.question;


let tarot1history = models.tarot1history;
let tarot2history = models.tarot2history;

order.belongsTo(user);
order.belongsTo(divination);
tarot2record.belongsTo(question);
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
    let ordersAllTime = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid'
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    let ordersAllTimeAll = await orderOrRecord.findAll({
        where: {
            channelId: channelId
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    let ordersLastMonth = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            createTime: {
                [Op.gte]: utils.getTimeStamp().lastMonth.start,
                [Op.lte]: utils.getTimeStamp().lastMonth.end,
            }
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    let ordersLastMonthAll = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            createTime: {
                [Op.gte]: utils.getTimeStamp().lastMonth.start,
                [Op.lte]: utils.getTimeStamp().lastMonth.end,
            }
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    let ordersCurMonth = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            createTime: {
                [Op.gte]: utils.getTimeStamp().curMonth.start,
                [Op.lte]: utils.getTimeStamp().curMonth.end,
            }
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    let ordersCurMonthAll = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            createTime: {
                [Op.gte]: utils.getTimeStamp().curMonth.start,
                [Op.lte]: utils.getTimeStamp().curMonth.end,
            }
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    // let orders30Days = await orderOrRecord.findAll({
    //     where: {
    //         channelId: channelId,
    //         status: 'paid',
    //         paidTime: {[Op.gte]: Date.now() - 30 * 24 * 60 * 60 * 1000}
    //     },
    //     attributes: [
    //         [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
    //         [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
    //         [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    // });
    // let orders7Days = await orderOrRecord.findAll({
    //     where: {
    //         channelId: channelId,
    //         status: 'paid',
    //         paidTime: {[Op.gte]: Date.now() - 7 * 24 * 60 * 60 * 1000}
    //     },
    //     attributes: [
    //         [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
    //         [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
    //         [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    // });
    // let orders24Hours = await orderOrRecord.findAll({
    //     where: {
    //         channelId: channelId,
    //         status: 'paid',
    //         paidTime: {[Op.gte]: Date.now() - 1 * 24 * 60 * 60 * 1000}
    //     },
    //     attributes: [
    //         [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
    //         [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
    //         [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    // });
    let ordersDay = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            createTime: {[Op.gte]: new Date(new Date().toLocaleDateString()).getTime()}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    let ordersDayAll = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            createTime: {[Op.gte]: new Date(new Date().toLocaleDateString()).getTime()}
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    let ordersYesterday = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            status: 'paid',
            createTime: {
                [Op.gte]: utils.getTimeStamp().yesterday.start,
                [Op.lte]: utils.getTimeStamp().yesterday.end,
            }
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });
    let ordersYesterdayAll = await orderOrRecord.findAll({
        where: {
            channelId: channelId,
            createTime: {
                [Op.gte]: utils.getTimeStamp().yesterday.start,
                [Op.lte]: utils.getTimeStamp().yesterday.end,
            }
        },
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sumPrice'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'order'],
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col(product == 'tarot2' ? 'openid' : 'userOpenid'))), 'orderDistinct']]
    });


    return [
        {
            title: "今日付款合计",
            order: ordersDay[0].toJSON().order,
            orderDistinct: ordersDay[0].toJSON().orderDistinct,
            sum: parseInt(ordersDay[0].toJSON().sumPrice || 0),
            orderAll: ordersDayAll[0].toJSON().order
        },
        // {
        //     title: "24小时付款合计",
        //     order: orders24Hours[0].toJSON().order,
        //     orderDistinct: orders24Hours[0].toJSON().orderDistinct,
        //     sum: parseInt(orders24Hours[0].toJSON().sumPrice || 0)
        // },
        {
            title: "昨日付款合计",
            order: ordersYesterday[0].toJSON().order,
            orderDistinct: ordersYesterday[0].toJSON().orderDistinct,
            sum: parseInt(ordersYesterday[0].toJSON().sumPrice || 0),
            orderAll: ordersYesterdayAll[0].toJSON().order
        },
        // {
        //     title: "7日付款合计",
        //     order: orders7Days[0].toJSON().order,
        //     orderDistinct: orders7Days[0].toJSON().orderDistinct,
        //     sum: parseInt(orders7Days[0].toJSON().sumPrice || 0)
        // },
        // {
        //     title: "30日付款合计",
        //     order: orders30Days[0].toJSON().order,
        //     orderDistinct: orders30Days[0].toJSON().orderDistinct,
        //     sum: parseInt(orders30Days[0].toJSON().sumPrice || 0)
        // },
        {
            title: "本月付款合计",
            order: ordersCurMonth[0].toJSON().order,
            orderDistinct: ordersCurMonth[0].toJSON().orderDistinct,
            sum: parseInt(ordersCurMonth[0].toJSON().sumPrice || 0),
            orderAll: ordersCurMonthAll[0].toJSON().order
        },
        {
            title: "上月付款合计",
            order: ordersLastMonth[0].toJSON().order,
            orderDistinct: ordersLastMonth[0].toJSON().orderDistinct,
            sum: parseInt(ordersLastMonth[0].toJSON().sumPrice || 0),
            orderAll: ordersLastMonthAll[0].toJSON().order
        },
        {
            title: "历史付款合计",
            order: ordersAllTime[0].toJSON().order,
            orderDistinct: ordersAllTime[0].toJSON().orderDistinct,
            sum: parseInt(ordersAllTime[0].toJSON().sumPrice || 0),
            orderAll: ordersAllTimeAll[0].toJSON().order
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
            order: [['paidTime', 'DESC']],
            offset: pageSize * page,
            limit: pageSize,
            attributes: ['orderid', 'userOpenid', 'paidTime', 'price', 'divinationId']
        });
        return {
            total: orderCount,
            pageSize,
            page: parseInt(page),
            data: await Promise.all(ordersAll.map(async order => {
                const userInstance = await order.getUser();
                const divinationInstance = await order.getDivination();
                console.log("[orders]user = " + JSON.stringify(userInstance));
                console.log("[orders]divination = " + JSON.stringify(divinationInstance));
                let orderJson = order.toJSON();
                orderJson.paidTime = utils.getFormattedDate(orderJson.paidTime);
                orderJson.userName = userInstance.wechatName || "浏览器用户";
                orderJson.title = divinationInstance.subTitle;
                delete orderJson.userOpenid;
                delete orderJson.divinationId;
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
            order: [['paidTime', 'DESC']],
            offset: page * pageSize,
            limit: pageSize,
            attributes: ['orderId', 'openid', 'phoneNumber', 'paidTime', 'price', 'questionId']
        });
        return {
            total: orderCount,
            pageSize,
            page: parseInt(page),
            data: await Promise.all(ordersAll.map(async order => {
                const question = await order.getQuestion();
                console.log("[orders]question = " + JSON.stringify(question));
                let orderJson = order.toJSON();
                orderJson.orderid = orderJson.orderId;
                delete orderJson.orderId;
                orderJson.paidTime = utils.getFormattedDate(orderJson.paidTime);
                orderJson.userName = orderJson.phoneNumber || "未绑定用户";
                orderJson.title = question.name;
                delete orderJson.openid;
                delete orderJson.phoneNumber;
                delete orderJson.questionId;
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
            let channelDetail = result.toJSON();
            channelDetail.link1_1 = `https://taluoyuce.com/#/home?channel=${channelDetail.id}&show=false`;
            channelDetail.link1_2 = `https://taluoyuce.cn/#/home?channel=${channelDetail.id}&show=false`;
            channelDetail.link1_3 = `https://taluoyixia.top/#/home?channel=${channelDetail.id}&show=false`;
            channelDetail.link1_1Kefu = `https://taluoyuce.com/#/home?channel=${channelDetail.id}`;
            channelDetail.link1_2Kefu = `https://taluoyuce.cn/#/home?channel=${channelDetail.id}`;
            channelDetail.link1_3Kefu = `https://taluoyixia.top/#/home?channel=${channelDetail.id}`;
            channelDetail.link1_Detail = `https://qian10.net/api/static/tarot_manager/index.html#/channel/tarot1/${channelDetail.id}`;
            channelDetail.link2_1 = `https://taluoyuce.com/?channel=${channelDetail.id}&show=false`;
            channelDetail.link2_2 = `https://taluoyuce.cn/?channel=${channelDetail.id}&show=false`;
            channelDetail.link2_3 = `https://taluoyixia.top/?channel=${channelDetail.id}&show=false`;
            channelDetail.link2_1Kefu = `https://taluoyuce.com/?channel=${channelDetail.id}`;
            channelDetail.link2_2Kefu = `https://taluoyuce.cn/?channel=${channelDetail.id}`;
            channelDetail.link2_3Kefu = `https://taluoyixia.top/?channel=${channelDetail.id}`;
            channelDetail.link2_Detail = `https://qian10.net/api/static/tarot_manager/index.html#/channel/tarot2/${channelDetail.id}`;
            return channelDetail;
        } catch (err) {
            throw new APIError('db_err', JSON.stringify(err));
        }
    },

    detail: detail,
    detailAll: async (product, time = 'today') => {
        let channelDetailIndex;
        switch (time) {
            case 'today':
            default:
                channelDetailIndex = 0;
                break;
            case 'yesterday':
                channelDetailIndex = 1;
                break;
            case 'curMonth':
                channelDetailIndex = 2;
                break;
            case 'lastMonth':
                channelDetailIndex = 3;
                break;
            case 'allTime':
                channelDetailIndex = 4;
                break;
        }
        console.log(`[detailAll] channelDetailIndex = ${channelDetailIndex}`);
        let channels = await getAllChannels();
        let channelsDetail = await Promise.all(channels.map(async channel => {
            let channelTemp = channel.toJSON();
            delete channelTemp.disabled;
            delete channelTemp.description;
            let channelDetail = await detail(channel.id, product);

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
            channelTemp.orderCount = channelDetail[channelDetailIndex].orderAll;
            channelTemp.orderPeopleCount = channelDetail[channelDetailIndex].orderDistinct;
            channelTemp.orderRate = toPercent(channelTemp.orderCount, channelTemp.uv);
            channelTemp.validOrderCount = channelDetail[channelDetailIndex].order;
            channelTemp.validOrderRate = toPercent(channelTemp.validOrderCount, channelTemp.uv);
            channelTemp.validOrderPerPeople = toPercent(channelTemp.validOrderCount, channelTemp.orderPeopleCount);
            channelTemp.income = channelDetail[channelDetailIndex].sum;
            channelTemp.incomePerUv = (channelTemp.income / channelTemp.uv / 100).toFixed(2);
            channelTemp.orderDetail = channelDetail;
            return channelTemp;
        }));
        return {
            dayOrder: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[0].order, 0),
            dayIncome: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[0].sum, 0),
            yesterdayOrder: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[1].order, 0),
            yesterdayIncome: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[1].sum, 0),
            monthOrder: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[2].order, 0),
            monthIncome: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[2].sum, 0),
            lastMonthOrder: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[3].order, 0),
            lastMonthIncome: channelsDetail.reduce((pre, cur) => pre + cur.orderDetail[3].sum, 0),
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