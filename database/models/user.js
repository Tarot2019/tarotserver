let {defineModel} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('users', {
    openid: {
        type: Sequelize.DataTypes.STRING(100),
        primaryKey: true
    },
    unionid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    wechatName: Sequelize.DataTypes.STRING,
    avatar: Sequelize.DataTypes.STRING
}, {
    addId: false
});