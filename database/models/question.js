let {defineModel} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('questions', {
    name: {
        type: Sequelize.DataTypes.STRING
    },
    tips: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    priceOld: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 9800
    },
    priceNew: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 990
    },
    count: {
        type: Sequelize.DataTypes.BIGINT,
        defaultValue: 121
    }
});