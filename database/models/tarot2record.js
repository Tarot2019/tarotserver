let {defineModel, ID_NAME} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('tarot2record', {
    orderId: {
        primaryKey: true,
        type: Sequelize.DataTypes.STRING(100)
    },
    price: Sequelize.DataTypes.INTEGER,
    createTime: Sequelize.DataTypes.BIGINT,
    paidTime: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true
    },
    status: {
        type: Sequelize.DataTypes.ENUM,
        values: ['pre', 'unpaid', 'paid'] //pre：点了立即测试，unpaid生成了支付信息，paid完成支付
    },
    openid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    udid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    questionId: Sequelize.DataTypes.INTEGER,
    cardId: Sequelize.DataTypes.INTEGER
});