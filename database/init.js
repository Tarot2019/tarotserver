//create all tables
const Models = require('./models.js');
const { sequelize } = require('./db');
const insertDebugData = true;
(async () => {
        try {
            await Models.order.drop();
            await Models.preorder.drop();
            await Models.user.drop();
            await Models.divination.drop();
            console.log("-------- 全部表删除完成 --------");


            console.log("-------- begin 创建关联 --------");
            Models.user.hasMany(Models.preorder);
            Models.user.hasMany(Models.order);
            Models.divination.hasMany(Models.preorder);
            Models.divination.hasMany(Models.order);
            // Models.preorder.hasOne(Models.divination);
            // Models.order.hasOne(Models.divination);
            console.log("-------- end 创建关联 --------");


            await Models.divination.sync();
            console.log("创建表成功：divination");
            await Models.user.sync();
            console.log("创建表成功：user");
            await Models.preorder.sync();
            console.log("创建表成功：preorder");
            await Models.order.sync();
            console.log("创建表成功：order");
            console.log("++++++++ 全部表创建完成 ++++++++");

            //插入测试数据
            if (insertDebugData) {
                await Models.divination.create({
                    picTop: "pictop",
                    picSquare: "square", //在列表中展示的方形图
                    isBanner: true, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "title1",
                    subTitle: "subtitle",
                    priceOld: 2000,
                    priceNew: 1000,
                    sales: 432,
                    introduction: "introduction",
                    notice: "notice",
                    cardImg1: "img1",
                    cardDescription1: "des1",
                    rateName1: "甜蜜指数:",
                    rate1: 5,
                    cardImg2: "img2",
                    cardDescription2: "des2",
                    rateName2: "甜蜜指数:",
                    rate2: 5,
                    cardImg3: "img3",
                    cardDescription3: "des3",
                    rateName3: "甜蜜指数:",
                    rate3: 5,
                    cardImg4: "img4",
                    cardDescription4: "des4",
                    rateName4: "甜蜜指数:",
                    rate4: 5
                });
                console.log("插入数据成功：divination");
            }

            await sequelize.close();
            console.log("关闭数据库连接成功");
            console.log("bye!");
        } catch (err) {
            console.log("出错了：", err);
        }
    })();