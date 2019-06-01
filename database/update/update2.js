const Models = require('../models.js');
const { sequelize } = require('../db');

//增加产品1(四张牌产品)的测试
(async () => {


    console.log("插入数据成功：divination");
    await sequelize.close();
})();