const APIError = require('../rest').ApiError;

const weixinPay = require('./weixin_pay');

const Cards_Count = 44;
const wechatPayNotifyUrl = "https://qian10.net/api/api/tarot2/payResult";

let models = require('../database/models.js');
let card = models.card;
let interpretation = models.interpretation;
let questionGroup = models.questionGroup;
let question = models.question;
let tarot2record = models.tarot2record;


question.belongsTo(questionGroup);
questionGroup.hasMany(question);
question.belongsToMany(card, {through: interpretation});
card.belongsToMany(question, {through: interpretation});

const utils = require('./utils/utils');

const questionAnswer = async (questionId, cardId) => {
    if(!cardId) {
        cardId = Math.ceil(Math.random() * Cards_Count);
        cardId = cardId < 0 ? 0 : (cardId > Cards_Count ? Cards_Count : cardId);
        console.log(`Random card id = ${cardId}`);
    }
    let questionInstance = await question.findById(questionId);
    let cardDetail = await questionInstance.getCards({where: {id: cardId}});
    cardDetail = cardDetail[0].toJSON();

    cardDetail.cardId = cardDetail.id;
    delete cardDetail.id;
    cardDetail.cardName = cardDetail.name + ('positive' == card.orientation ? "（正位）" : "（逆位）");
    delete cardDetail.name;
    delete cardDetail.orientation;
    cardDetail.cardElement = cardDetail.element;
    delete cardDetail.element;
    cardDetail.cardTag = cardDetail.tag;
    delete cardDetail.tag;
    cardDetail.cardDescription = cardDetail.description;
    delete cardDetail.description;
    cardDetail.cardImg = cardDetail.img;
    delete cardDetail.img;

    let interpretation = cardDetail.interpretations.interpretation;
    cardDetail.interpretations = JSON.parse(interpretation);
    cardDetail.quesionName = questionInstance.name;
    cardDetail.priceOld = questionInstance.priceOld;
    cardDetail.priceNew = questionInstance.priceNew;

    return cardDetail;
};
module.exports = {
    home: async () => {
        let questionGroups = await questionGroup.findAll({
            attributes: ['name', 'image'],
            include: [{model: question, attributes: ['id', 'name', 'tips', 'count']}]
        });
        console.log("All questions: ", JSON.stringify(questionGroups));
        return questionGroups;
    },

    questionAnswer,
    orders: async (openid) => {
        let records = await tarot2record.findAll({
            where: {openid: openid}
        });
        console.log("[tarot2 get orders]：", JSON.stringify(records));
        if(records) {
            return await Promise.all(records.filter(order => order.status == 'paid').map(async order => {
                let questionInstance = await question.findById(order.questionId);
                let cardDetail = await card.findById(order.cardId);
                console.log(JSON.stringify(cardDetail), JSON.stringify(questionInstance));
                return {
                    orderId: order.orderId,
                    questionName: questionInstance.name,
                    time: utils.getFormattedDate(order.createTime),
                    cardElement: cardDetail.element,
                    cardName: cardDetail.name + ('positive' == card.orientation ? "（正位）" : "（逆位）")
                };
            }));
        } else {
            return [];
        }
    },
    ordersWithMobile: async (mobile) => {
        let records = await tarot2record.findAll({
            where: {phoneNumber: mobile}
        });
        console.log("[tarot2 get ordersWithMobile]：", JSON.stringify(records));
        if(records) {
            return await Promise.all(records.filter(order => order.status == 'paid').map(async order => {
                let questionInstance = await question.findById(order.questionId);
                let cardDetail = await card.findById(order.cardId);
                console.log(JSON.stringify(cardDetail), JSON.stringify(questionInstance));
                return {
                    orderId: order.orderId,
                    questionName: questionInstance.name,
                    time: utils.getFormattedDate(order.createTime),
                    cardElement: cardDetail.element,
                    cardName: cardDetail.name + ('positive' == card.orientation ? "（正位）" : "（逆位）")
                };
            }));
        } else {
            return [];
        }
    },
    orderDetail: async (orderId) => {
        if(!orderId) {
            throw new APIError('orderId_err', '空的orderId');
        }
        let record = await tarot2record.findOne({
            where: {orderId: orderId, status: "paid"}
        });
        if(!record) {
            throw new APIError('orderId_err', '未找到对应的支付记录');
        }
        return await questionAnswer(record.questionId, record.cardId);
    },
    bindMobile: async (orderId, mobile) => {
        if(!orderId || !mobile) {
            throw new APIError('orderId_err', '参数不能为空');
        }
        let record = await tarot2record.findOne({
            where: {orderId: orderId, status: "paid"}
        });
        if(!record) {
            throw new APIError('orderId_err', '未找到对应的支付记录');
        }
        if(record.phoneNumber) {
            throw new APIError('bindMobile_err', '存在已绑定的手机号');
        }
        await record.update({phoneNumber: mobile});
        return true;
    },
    getPayInfo: async (openid, questionId, cardId, ip, channelId) => {
        if(!openid) {
            throw new APIError('openid_err', 'openid null!');
        }
        let questionInstance = await question.findById(questionId);
        if(!questionInstance) {
            throw new APIError('id_err', 'questionId id error');
        }
        let orderId = Date.now().toString(36) + openid.slice(-2);
        let price = questionInstance.priceNew;
        let payInfo = await weixinPay.prePay(openid, orderId, questionInstance.name, price, ip, wechatPayNotifyUrl);
        payInfo.orderId = orderId;
        console.log("微信支付信息：", JSON.stringify(payInfo));
        if(payInfo) {
            await questionInstance.update({count: questionInstance.count + 1});
            await tarot2record.upsert({
                orderId,
                price,
                createTime: Date.now(),
                status: 'unpaid',
                openid,
                questionId,
                cardId,
                channelId
            });
            return payInfo;
        } else {
            throw new APIError('prepay_err', 'get wechat prepay info failed');
        }

    },
    getPayInfoH5: async (udid, phoneNumber, questionId, cardId, ip) => {
        if(!udid && !phoneNumber) {
            throw new APIError('udid_err', 'udid and phoneNumber all null!');
        }
        let questionInstance = await question.findById(questionId);
        if(!questionInstance) {
            throw new APIError('id_err', 'questionId id error');
        }
        let cardDetail = await questionInstance.getCards({where: {id: cardId}});
        cardDetail = cardDetail[0].toJSON();

        let orderId = Date.now().toString(36) + (udid ? udid : phoneNumber).slice(-2);
        let price = questionInstance.priceNew;
        let payInfo = await weixinPay.prePay(openid, orderId, divinationInstance.title, price, ip)
        console.log("微信支付信息：", JSON.stringify(payInfo));
        if(payInfo) {
            let userInstance = await user.findOne({where: {openid: openid}});
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
            let orderInstance = await tarot2record.findOne({where: {orderId: cbContent.out_trade_no[0]}});
            console.log("wechatCallback tarot2， cbContent.total_fee[0] = " + cbContent.total_fee[0] +  ",  orderInstance = " + JSON.stringify(orderInstance));
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