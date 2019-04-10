let {defineModel} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('user', {
    openid: Sequelize.DataTypes.STRING,
    unionid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    wechatName: Sequelize.DataTypes.STRING,
    avatar: Sequelize.DataTypes.STRING
});