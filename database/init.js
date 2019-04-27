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
                    picTop: "/tarot1/fenshoufuhe.jpg",
                    picSquare: "/tarot1/fenshoufuhe_small.jpg", //在列表中展示的方形图
                    isBanner: true, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "测测你和ta分手后还会复合吗？",
                    priceOld: 4000,
                    priceNew: 2000,
                    sales: 432,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "宝剑四逆位",
                    cardImg1: "/tarot1/card/baojian4.jpg",
                    cardDescription1: "选到这张牌的朋友，你们复合的概率大约是75%。这张牌给你的启示是希望你能给彼此一些冷静思考的时间，同时反思自己不足的地方，切忌因急躁而做出伤害感情的举措。你和TA的缘分还没到尽头，复合的机率还是比较大的。",
                    rateName1: "意思是休息、沉思及自省。",
                    rate1: 5,
                    cardName2: "权杖四正位",
                    cardImg2: "/tarot1/card/baojian5.jpg",
                    cardDescription2: "选到这张牌的朋友，你们复合的概率大约是90%。现在你与恋人的恋情已经日趋稳固了，生活中的小吵小闹总是无法避免，但这些小风浪并不会真正伤害到你们的感情。如果你和爱人之前闹矛盾分手了，极有可能会复合。",
                    rateName2: "意思是和谐、繁荣、融洽。",
                    rate2: 5,
                    cardName3: "节制正位",
                    cardImg3: "/tarot1/card/baojian6.jpg",
                    cardDescription3: "选到这张牌的朋友，你们复合的概率大约是60%。你与恋人在交往中或许关系有些失衡，导致关系失衡可能是因为一方对另一方的付出感觉理所当然，习惯性索取却不懂得付出。只要你们找机会进行一次深度的谈话，打开心结，复合还是比较有望的。",
                    rateName3: "意思是协调、平衡及沟通。",
                    rate3: 5,
                    cardName4: "宝剑二正位",
                    cardImg4: "/tarot1/card/baojian7.jpg",
                    cardDescription4: "选到这张牌的朋友，你们复合的概率大约是40%。建议要诚实面对自己的想法，切勿因为逃避而彻底断送了这段感情。可以主动打破沉默，结束这场冷战，你们才能有复合的转机。",
                    rateName4: "代表逃避、对立及僵局。",
                    rate4: 5
                };
                await Models.divination.create(divinationData);
                divinationData.subTitle = "测测2019年你的爱情磁场有多强？";
                divinationData.isBanner = false;
                await Models.divination.create(divinationData);
                divinationData.subTitle = "你现在的工作还值不值得坚持？";
                divinationData.isBanner = false;
                await Models.divination.create(divinationData);
                divinationData.subTitle = "塔罗测试：你会遇见什么样的爱情?";
                divinationData.isBanner = false;
                await Models.divination.create(divinationData);
                console.log("插入数据成功：divination");

                let userData = {
                    openid: "ofPbp1XuYIMpD1CUUTWsqmMcB63c",
                    unionid: "orLCIt7g80RkTeq3STM850vAaJ4Q",
                    wechatName: "wangpan🐆",
                    avatar: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJGLmN0Fooy9wTnHrhiaQJSiayueGhlUQnI36ibNsGFdicLbC9PXUrOTnH3NQbx58I46cAeJU7mAwQVkQ/132"
                };
                await  Models.user.create(userData);
                // userData.openid = "2";
                // userData.unionid = "unionid2";
                // userData.wechatName = "name2";
                // userData.avatar = "avatar2";
                // await  Models.user.create(userData);
                console.log("插入数据成功：user");
            }

            await sequelize.close();
            console.log("关闭数据库连接成功");
            console.log("bye!");
        } catch (err) {
            console.log("出错了：", err);
        }
    })();