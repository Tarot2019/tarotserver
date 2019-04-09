let { defineModel } = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('divination', {
    picTop: Sequelize.DataTypes.STRING, //顶部的头图
    picSquare: Sequelize.DataTypes.STRING, //在列表中展示的方形图
    isBanner: Sequelize.DataTypes.BOOLEAN, //是否在首页Banner
    isHome: Sequelize.DataTypes.BOOLEAN, //是否展示在首页
    title: Sequelize.DataTypes.STRING,
    subTitle: Sequelize.DataTypes.STRING,
    priceOld: Sequelize.DataTypes.INTEGER,
    priceNew: Sequelize.DataTypes.INTEGER,
    sales: Sequelize.DataTypes.INTEGER,
    introduction: Sequelize.DataTypes.TEXT,
    notice: Sequelize.DataTypes.TEXT,
    cardImg1: Sequelize.DataTypes.STRING,
    cardDescription1: Sequelize.DataTypes.TEXT,
    cardImg2: Sequelize.DataTypes.STRING,
    cardDescription2: Sequelize.DataTypes.TEXT,
    cardImg3: Sequelize.DataTypes.STRING,
    cardDescription3: Sequelize.DataTypes.TEXT,
    cardImg4: Sequelize.DataTypes.STRING,
    cardDescription4: Sequelize.DataTypes.TEXT
});