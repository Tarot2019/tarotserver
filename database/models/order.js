let {defineModel, ID_NAME} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('orders', {
    price: Sequelize.DataTypes.INTEGER,
    createTime: Sequelize.DataTypes.BIGINT,
    paidTime: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true
    },
    orderid: {
        unique: true,
        type: Sequelize.DataTypes.STRING(100)
    },
    status: {
        type: Sequelize.DataTypes.ENUM,
        values: ['pre', 'unpaid', 'paid'] //pre：点了立即测试，unpaid生成了支付信息，paid完成支付
    }
});