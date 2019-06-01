let {defineModel} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('tarot1history', {
    time: {
        type: Sequelize.DataTypes.BIGINT
    },
    userId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    page: {
        type: Sequelize.DataTypes.STRING
    },
    os: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    device: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    ua: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }

});