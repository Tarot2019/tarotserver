let {defineModel, ID_NAME} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('orders', {
    price: Sequelize.DataTypes.INTEGER,
    time: Sequelize.DataTypes.BIGINT,
    orderid: {
        unique: true,
        type: Sequelize.DataTypes.STRING(100)
    },
    status: {
        type: Sequelize.DataTypes.ENUM,
        values: ['unpaid', 'paid']
    }
});