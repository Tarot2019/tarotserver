//create all tables
const Models = require('./models.js');
const { sequelize } = require('./db');
const insertDebugData = true;
(async () => {
        try {
            if(insertDebugData) {
                await Models.order.drop();
                await Models.user.drop();
                await Models.divination.drop();
                console.log("-------- 全部表删除完成 --------");
            }


            console.log("-------- begin 创建关联 --------");
            Models.user.belongsToMany(Models.divination, {as: "Preorders", through: "userPreorder"});
            Models.divination.belongsToMany(Models.user, {as: "Collectors", through: "userPreorder"});

            Models.user.belongsToMany(Models.divination, {as: "Orders", through: Models.order});
            Models.divination.belongsToMany(Models.user, {as: "Consumers", through: Models.order});
            // Models.user.belongsToMany(Models.divination, {through: Models.order});
            // Models.divination.belongsToMany(Models.user, {through: Models.order});

            // Models.divination.hasMany(Models.preorder);
            // Models.divination.hasMany(Models.order);
            // Models.preorder.hasOne(Models.divination);
            // Models.order.hasOne(Models.divination);
            console.log("-------- end 创建关联 --------");


            await sequelize.sync();
            // await Models.divination.sync();
            // console.log("创建表成功：divination");
            // await Models.user.sync();
            // console.log("创建表成功：user");
            // await Models.preorder.sync();
            // console.log("创建表成功：preorder");
            // await Models.order.sync();
            // console.log("创建表成功：order");
            console.log("++++++++ 全部表创建完成 ++++++++");

            //插入测试数据
            if (insertDebugData) {
                let divinationData = {
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
                };
                await Models.divination.create(divinationData);
                divinationData.title = "title2";
                divinationData.isBanner = false;
                await Models.divination.create(divinationData);
                divinationData.title = "title3";
                divinationData.isBanner = false;
                await Models.divination.create(divinationData);
                divinationData.title = "title4";
                divinationData.isBanner = false;
                await Models.divination.create(divinationData);
                console.log("插入数据成功：divination");

                let userData = {
                    openid: "1",
                    unionid: "unionid1",
                    wechatName: "name1",
                    avatar: "avatar1"
                };
                await  Models.user.create(userData);
                userData.openid = "2";
                userData.unionid = "unionid2";
                userData.wechatName = "name2";
                userData.avatar = "avatar2";
                await  Models.user.create(userData);
                console.log("插入数据成功：user");
            }

            await sequelize.close();
            console.log("关闭数据库连接成功");
            console.log("bye!");
        } catch (err) {
            console.log("出错了：", err);
        }
    })();