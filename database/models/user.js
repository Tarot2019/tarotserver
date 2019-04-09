let { defineModel } = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('user', {
    openid: Sequelize.DataTypes.STRING,
    unionid: Sequelize.DataTypes.STRING,
    wechatName: Sequelize.DataTypes.STRING,
    avatar: Sequelize.DataTypes.STRING
});