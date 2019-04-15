let {defineModel, ID_NAME} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('orders', {
    openid: {
        type: Sequelize.DataTypes.STRING,
        references: {
            model: 'users',
            key: 'openid'
        }
    },
    divinationId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: 'divinations',
            key: ID_NAME
        }
    },
    price: Sequelize.DataTypes.INTEGER,
    time: Sequelize.DataTypes.INTEGER
});